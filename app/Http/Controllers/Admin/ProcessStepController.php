<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProcessStepRequest;
use App\Http\Requests\Admin\UpdateProcessStepRequest;
use App\Models\ProcessStep;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProcessStepController extends Controller
{
    public function index(): Response
    {
        $steps = ProcessStep::query()->orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'title', 'label' => 'Title', 'type' => 'localized'],
                ['key' => 'icon', 'label' => 'Icon', 'type' => 'text'],
            ],
            'records' => $steps->map(fn (ProcessStep $step) => $this->present($step))->values(),
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

    public function store(StoreProcessStepRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $step = new ProcessStep;
        $step->id = $this->generateId($data['title']['en']);
        $step->order = (int) ProcessStep::query()->max('order') + 1;
        $this->fill($step, $data);
        $step->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Process step created.']);

        return to_route('admin.process-steps.index');
    }

    public function edit(ProcessStep $processStep): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($processStep),
        ]);
    }

    public function update(UpdateProcessStepRequest $request, ProcessStep $processStep): RedirectResponse
    {
        $this->fill($processStep, $request->validated());
        $processStep->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Process step saved.']);

        return to_route('admin.process-steps.index');
    }

    public function move(Request $request, ProcessStep $processStep): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($processStep, $direction) {
            $ids = ProcessStep::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($processStep->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                ProcessStep::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(ProcessStep $processStep): RedirectResponse
    {
        $processStep->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Process step deleted.']);

        return to_route('admin.process-steps.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'process-steps',
            'label' => 'Process Steps',
            'singular' => 'Process step',
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
            ['name' => 'icon', 'type' => 'text', 'label' => 'Icon', 'help' => 'A lucide-react icon name.'],
            ['name' => 'description', 'type' => 'localized', 'label' => 'Description', 'multiline' => true],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function present(ProcessStep $step): array
    {
        return [
            'id' => $step->id,
            'order' => $step->order,
            'title' => $step->title,
            'icon' => $step->icon,
            'description' => $step->description,
        ];
    }

    private function generateId(string $title): string
    {
        $base = Str::of('step-'.Str::slug($title))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; ProcessStep::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(ProcessStep $step, array $data): void
    {
        $step->title = $data['title'];
        $step->icon = $data['icon'];
        $step->description = $data['description'];
    }
}
