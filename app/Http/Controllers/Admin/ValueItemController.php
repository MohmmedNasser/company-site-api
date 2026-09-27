<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreValueItemRequest;
use App\Http\Requests\Admin\UpdateValueItemRequest;
use App\Models\ValueItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ValueItemController extends Controller
{
    public function index(): Response
    {
        $values = ValueItem::query()->orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'title', 'label' => 'Title', 'type' => 'localized'],
                ['key' => 'icon', 'label' => 'Icon', 'type' => 'text'],
            ],
            'records' => $values->map(fn (ValueItem $value) => $this->present($value))->values(),
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

    public function store(StoreValueItemRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $value = new ValueItem;
        $value->id = $this->generateId($data['title']['en']);
        $value->order = (int) ValueItem::query()->max('order') + 1;
        $this->fill($value, $data);
        $value->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Value created.']);

        return to_route('admin.values.index');
    }

    public function edit(ValueItem $valueItem): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($valueItem),
        ]);
    }

    public function update(UpdateValueItemRequest $request, ValueItem $valueItem): RedirectResponse
    {
        $this->fill($valueItem, $request->validated());
        $valueItem->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Value saved.']);

        return to_route('admin.values.index');
    }

    public function move(Request $request, ValueItem $valueItem): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($valueItem, $direction) {
            $ids = ValueItem::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($valueItem->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                ValueItem::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(ValueItem $valueItem): RedirectResponse
    {
        $valueItem->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Value deleted.']);

        return to_route('admin.values.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'values',
            'label' => 'Values',
            'singular' => 'Value',
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
    private function present(ValueItem $value): array
    {
        return [
            'id' => $value->id,
            'order' => $value->order,
            'title' => $value->title,
            'icon' => $value->icon,
            'description' => $value->description,
        ];
    }

    private function generateId(string $title): string
    {
        $base = Str::of('value-'.Str::slug($title))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; ValueItem::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(ValueItem $value, array $data): void
    {
        $value->title = $data['title'];
        $value->icon = $data['icon'];
        $value->description = $data['description'];
    }
}
