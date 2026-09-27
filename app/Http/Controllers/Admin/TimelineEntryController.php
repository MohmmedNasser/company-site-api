<?php

namespace App\Http\Controllers\Admin;

use App\Enums\TimelineStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTimelineEntryRequest;
use App\Http\Requests\Admin\UpdateTimelineEntryRequest;
use App\Models\TimelineEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TimelineEntryController extends Controller
{
    public function index(): Response
    {
        $entries = TimelineEntry::query()->orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'year', 'label' => 'Year', 'type' => 'text'],
                ['key' => 'title', 'label' => 'Title', 'type' => 'localized'],
                ['key' => 'status', 'label' => 'Status', 'type' => 'text'],
            ],
            'records' => $entries->map(fn (TimelineEntry $entry) => $this->present($entry))->values(),
            'pagination' => null,
            'filters' => ['search' => ''],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => null,
        ]);
    }

    public function store(StoreTimelineEntryRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $entry = new TimelineEntry;
        $entry->id = $this->generateId($data['title']['en']);
        $entry->order = (int) TimelineEntry::query()->max('order') + 1;
        $this->fill($entry, $data);
        $entry->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Milestone created.']);

        return to_route('admin.timeline.index');
    }

    public function edit(TimelineEntry $timelineEntry): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($timelineEntry),
        ]);
    }

    public function update(UpdateTimelineEntryRequest $request, TimelineEntry $timelineEntry): RedirectResponse
    {
        $this->fill($timelineEntry, $request->validated());
        $timelineEntry->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Milestone saved.']);

        return to_route('admin.timeline.index');
    }

    public function move(Request $request, TimelineEntry $timelineEntry): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($timelineEntry, $direction) {
            $ids = TimelineEntry::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($timelineEntry->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                TimelineEntry::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(TimelineEntry $timelineEntry): RedirectResponse
    {
        $timelineEntry->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Milestone deleted.']);

        return to_route('admin.timeline.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'timeline',
            'label' => 'Timeline',
            'singular' => 'Milestone',
            'searchable' => false,
            'paginated' => false,
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function fieldsSchema(): array
    {
        return [
            ['name' => 'title', 'type' => 'localized', 'label' => 'Title'],
            ['name' => 'year', 'type' => 'text', 'label' => 'Year', 'help' => 'Western digits in both locales.'],
            ['name' => 'status', 'type' => 'select', 'label' => 'Status', 'options' => [
                ['value' => TimelineStatus::Done->value, 'label' => 'Done'],
                ['value' => TimelineStatus::InProgress->value, 'label' => 'In progress'],
                ['value' => TimelineStatus::Todo->value, 'label' => 'To do'],
            ]],
            ['name' => 'description', 'type' => 'localized', 'label' => 'Description', 'multiline' => true],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function present(TimelineEntry $entry): array
    {
        return [
            'id' => $entry->id,
            'order' => $entry->order,
            'title' => $entry->title,
            'year' => $entry->year,
            'status' => $entry->status->value,
            'description' => $entry->description,
        ];
    }

    private function generateId(string $title): string
    {
        $base = Str::of('milestone-'.Str::slug($title))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; TimelineEntry::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(TimelineEntry $entry, array $data): void
    {
        $entry->title = $data['title'];
        $entry->year = $data['year'];
        $entry->status = $data['status'];
        $entry->description = $data['description'];
    }
}
