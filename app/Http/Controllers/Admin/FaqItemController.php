<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaqItemRequest;
use App\Http\Requests\Admin\UpdateFaqItemRequest;
use App\Models\FaqItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class FaqItemController extends Controller
{
    public function index(): Response
    {
        $items = FaqItem::query()->orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'question', 'label' => 'Question', 'type' => 'localized'],
            ],
            'records' => $items->map(fn (FaqItem $item) => $this->present($item))->values(),
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

    public function store(StoreFaqItemRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $item = new FaqItem;
        $item->id = $this->generateId($data['question']['en']);
        $item->order = (int) FaqItem::query()->max('order') + 1;
        $this->fill($item, $data);
        $item->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'FAQ item created.']);

        return to_route('admin.faq.index');
    }

    public function edit(FaqItem $faqItem): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($faqItem),
        ]);
    }

    public function update(UpdateFaqItemRequest $request, FaqItem $faqItem): RedirectResponse
    {
        $this->fill($faqItem, $request->validated());
        $faqItem->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'FAQ item saved.']);

        return to_route('admin.faq.index');
    }

    public function move(Request $request, FaqItem $faqItem): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($faqItem, $direction) {
            $ids = FaqItem::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($faqItem->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                FaqItem::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(FaqItem $faqItem): RedirectResponse
    {
        $faqItem->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'FAQ item deleted.']);

        return to_route('admin.faq.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'faq',
            'label' => 'FAQ',
            'singular' => 'FAQ item',
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
            ['name' => 'question', 'type' => 'localized', 'label' => 'Question'],
            ['name' => 'answer', 'type' => 'localized', 'label' => 'Answer', 'multiline' => true],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function present(FaqItem $item): array
    {
        return [
            'id' => $item->id,
            'order' => $item->order,
            'question' => $item->question,
            'answer' => $item->answer,
        ];
    }

    private function generateId(string $question): string
    {
        $base = Str::of('faq-'.Str::slug($question))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; FaqItem::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(FaqItem $item, array $data): void
    {
        $item->question = $data['question'];
        $item->answer = $data['answer'];
    }
}
