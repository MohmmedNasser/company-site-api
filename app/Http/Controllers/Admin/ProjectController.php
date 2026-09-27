<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ProjectStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Category;
use App\Models\Client;
use App\Models\Project;
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

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());
        $query = Project::query()->orderBy('order')->orderBy('id');

        if ($search !== '') {
            $this->applySearch($query, 'title', $search);
        }

        $categories = $this->categoryNames();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'cover_image', 'label' => 'Cover', 'type' => 'image'],
                ['key' => 'title', 'label' => 'Title', 'type' => 'localized'],
                ['key' => 'category_label', 'label' => 'Category', 'type' => 'text'],
                ['key' => 'status', 'label' => 'Status', 'type' => 'text'],
            ],
            'records' => $query->get()->map(fn (Project $project) => $this->presentForList($project, $categories))->values(),
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

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $project = new Project;
        $project->id = $this->generateId($data['slug']);
        $project->order = (int) Project::query()->max('order') + 1;
        $this->fill($project, $data, $request);
        $project->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project created.']);

        return to_route('admin.projects.index');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($project),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $previousImage = $project->cover_image;

        $this->fill($project, $data, $request);
        $project->save();

        if ($request->hasFile('cover_image')) {
            Media::delete($previousImage);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project saved.']);

        return to_route('admin.projects.index');
    }

    public function move(Request $request, Project $project): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($project, $direction) {
            $ids = Project::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($project->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                Project::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();
        Media::delete($project->cover_image);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project deleted.']);

        return to_route('admin.projects.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'projects',
            'label' => 'Projects',
            'singular' => 'Project',
            'searchable' => true,
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
            ['name' => 'slug', 'type' => 'slug', 'label' => 'Slug'],
            ['name' => 'category_id', 'type' => 'select', 'label' => 'Category', 'options' => $this->options($this->categoryNames())],
            ['name' => 'client_id', 'type' => 'select', 'label' => 'Client', 'options' => $this->options($this->clientNames())],
            ['name' => 'status', 'type' => 'select', 'label' => 'Status', 'options' => [
                ['value' => ProjectStatus::Shipped->value, 'label' => 'Shipped'],
                ['value' => ProjectStatus::InDevelopment->value, 'label' => 'In development'],
            ]],
            ['name' => 'cover_image', 'type' => 'image', 'label' => 'Cover image'],
            ['name' => 'summary', 'type' => 'localized', 'label' => 'Summary', 'multiline' => true],
            ['name' => 'description', 'type' => 'localized', 'label' => 'Description', 'multiline' => true],
        ];
    }

    /**
     * Read fresh on every request rather than cached, since an admin
     * editing one list can add to the other in the same sitting.
     *
     * @return array<string, string> id => label
     */
    private function categoryNames(): array
    {
        return Category::query()->orderBy('order')->get()
            ->mapWithKeys(fn (Category $category) => [$category->id => $category->localized('name', 'en')])
            ->all();
    }

    /**
     * @return array<string, string> id => label
     */
    private function clientNames(): array
    {
        return Client::query()->orderBy('order')->get()
            ->mapWithKeys(fn (Client $client) => [$client->id => $client->localized('name', 'en')])
            ->all();
    }

    /**
     * @param  array<string, string>  $labels  id => label
     * @return list<array{value: string, label: string}>
     */
    private function options(array $labels): array
    {
        return collect($labels)
            ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function present(Project $project): array
    {
        return [
            'id' => $project->id,
            'order' => $project->order,
            'title' => $project->title,
            'slug' => $project->slug,
            'category_id' => $project->category_id,
            'client_id' => $project->client_id,
            'status' => $project->status->value,
            'cover_image' => $project->cover_image,
            'cover_image_url' => Media::url($project->cover_image),
            'summary' => $project->summary,
            'description' => $project->description,
        ];
    }

    /**
     * The index table only shows a cover image, title, category, and
     * status, so this leaves out the summary/description text that
     * present() sends the edit form — no point shipping every project's
     * full copy to a table that never renders it.
     *
     * @param  array<string, string>  $categories  id => label
     * @return array<string, mixed>
     */
    private function presentForList(Project $project, array $categories): array
    {
        return [
            'id' => $project->id,
            'order' => $project->order,
            'title' => $project->title,
            'category_label' => $categories[$project->category_id] ?? $project->category_id,
            'status' => $project->status->value,
            'cover_image_url' => Media::url($project->cover_image),
        ];
    }

    private function generateId(string $slug): string
    {
        $base = Str::of('proj-'.Str::slug($slug))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; Project::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(Project $project, array $data, Request $request): void
    {
        $project->title = $data['title'];
        $project->slug = $data['slug'];
        $project->category_id = $data['category_id'];
        $project->client_id = $data['client_id'];
        $project->status = $data['status'];
        $project->summary = $data['summary'];
        $project->description = $data['description'];

        if ($request->file('cover_image') instanceof UploadedFile) {
            $project->cover_image = Media::store($request->file('cover_image'), 'projects');
        }
    }

    /**
     * @param  Builder<Project>  $query
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
