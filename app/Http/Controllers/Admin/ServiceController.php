<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Http\Requests\Admin\UpdateServiceRequest;
use App\Models\Service;
use App\Services\ImageUploadService;
use App\Support\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * CRUD + reorder for the Services collection. Each content type has its
 * own controller like this one, on purpose: it's more repetition across
 * the ten of them, but every single file reads top to bottom with nothing
 * to look up elsewhere.
 */
class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());
        $query = Service::query()->orderBy('order')->orderBy('id');

        if ($search !== '') {
            $this->applySearch($query, 'title', $search);
        }

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'image', 'label' => 'Image', 'type' => 'image'],
                ['key' => 'title', 'label' => 'Title', 'type' => 'localized'],
                ['key' => 'slug', 'label' => 'Slug', 'type' => 'text'],
            ],
            'records' => $query->get()->map(fn (Service $service) => $this->presentForList($service))->values(),
            'pagination' => null,
            'filters' => ['search' => $search],
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

    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $service = new Service;
        $service->id = $this->generateId($data['slug']);
        $service->order = (int) Service::query()->max('order') + 1;
        $this->fill($service, $data, $request);
        $service->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Service created.']);

        return to_route('admin.services.index');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($service),
        ]);
    }

    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->validated();
        $previousImage = $service->image;

        $this->fill($service, $data, $request);
        $service->save();

        // Only after the row points at the new file is the old one safe to
        // remove; ImageUploadService::delete() ignores legacy external URLs.
        if ($request->hasFile('image')) {
            ImageUploadService::delete($previousImage);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Service saved.']);

        return to_route('admin.services.index');
    }

    /**
     * Swap with the neighbour, then renumber the whole collection 1..n.
     * Renumbering (rather than swapping two `order` values) also repairs
     * gaps and duplicate orders left by earlier seeds or deletes, so "up"
     * always moves exactly one visible position.
     */
    public function move(Request $request, Service $service): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($service, $direction) {
            $ids = Service::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($service->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                Service::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();
        ImageUploadService::delete($service->image);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Service deleted.']);

        return to_route('admin.services.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'services',
            'label' => 'Services',
            'singular' => 'Service',
            'searchable' => true,
            'paginated' => false,
        ];
    }

    /**
     * What the create/edit form renders from — kept next to typeMeta()
     * rather than in the request classes, since the frontend needs it
     * regardless of whether the request is valid yet.
     *
     * @return list<array<string, mixed>>
     */
    private function fieldsSchema(): array
    {
        return [
            ['name' => 'title', 'type' => 'localized', 'label' => 'Title'],
            ['name' => 'slug', 'type' => 'slug', 'label' => 'Slug'],
            ['name' => 'icon', 'type' => 'text', 'label' => 'Icon', 'help' => 'A lucide-react icon name, e.g. Globe.'],
            ['name' => 'image', 'type' => 'image', 'label' => 'Image'],
            ['name' => 'categories', 'type' => 'tags', 'label' => 'Categories', 'help' => 'Practitioner terms, kept in English in both locales.'],
            ['name' => 'excerpt', 'type' => 'localized', 'label' => 'Excerpt', 'multiline' => true],
            ['name' => 'body', 'type' => 'localized', 'label' => 'Body', 'multiline' => true, 'help' => 'Separate paragraphs with a blank line.'],
        ];
    }

    /**
     * What the React pages receive for one record: the raw column values
     * plus `image_url` so the preview works for both legacy URLs and
     * uploaded disk paths.
     *
     * @return array<string, mixed>
     */
    private function present(Service $service): array
    {
        return [
            'id' => $service->id,
            'order' => $service->order,
            'title' => $service->title,
            'slug' => $service->slug,
            'icon' => $service->icon,
            'image' => $service->image,
            'image_url' => Media::url($service->image),
            'categories' => $service->categories,
            'excerpt' => $service->excerpt,
            'body' => $service->body,
        ];
    }

    /**
     * The index table only shows an image, title, and slug, so this
     * leaves out the excerpt/body text that present() sends the edit
     * form — no point shipping every service's full copy to a table
     * that never renders it. `image_url` is the thumbnail here (a row
     * preview doesn't need the full original); present() above sends the
     * full image for the edit form's own preview.
     *
     * @return array<string, mixed>
     */
    private function presentForList(Service $service): array
    {
        return [
            'id' => $service->id,
            'order' => $service->order,
            'title' => $service->title,
            'slug' => $service->slug,
            'image_url' => ImageUploadService::thumbnailUrl($service->image),
        ];
    }

    /**
     * Seeded ids follow a readable `svc-<slug>` convention; new records
     * keep it, with a numeric suffix if the slug is already taken.
     */
    private function generateId(string $slug): string
    {
        $base = Str::of('svc-'.Str::slug($slug))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; Service::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(Service $service, array $data, Request $request): void
    {
        $service->title = $data['title'];
        $service->slug = $data['slug'];
        $service->icon = $data['icon'];
        $service->categories = array_values($data['categories'] ?? []);
        $service->excerpt = $data['excerpt'];
        $service->body = $data['body'];

        if ($request->file('image') instanceof UploadedFile) {
            $service->image = ImageUploadService::store($request->file('image'), 'services');
        }
    }

    /**
     * Case-insensitive match against both languages of a localized JSON
     * column. The grammar compiles `title->en` to the driver's own JSON
     * extraction, and lower() is applied explicitly because MySQL compares
     * extracted JSON strings with a binary collation.
     *
     * @param  Builder<Service>  $query
     */
    private function applySearch(Builder $query, string $field, string $search): void
    {
        $grammar = $query->getQuery()->getGrammar();
        $needle = '%'.addcslashes(mb_strtolower($search), '%_\\').'%';

        $query->where(function (Builder $query) use ($grammar, $field, $needle) {
            foreach (['en', 'ar'] as $locale) {
                $query->orWhereRaw('lower('.$grammar->wrap("{$field}->{$locale}").') like ?', [$needle]);
            }
        });
    }
}
