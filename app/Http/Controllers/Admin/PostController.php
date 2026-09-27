<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Models\Post;
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

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());
        $query = Post::query()->orderBy('order')->orderBy('id');

        if ($search !== '') {
            $this->applySearch($query, 'title', $search);
        }

        // The only paginated content type — a growing list of posts would
        // otherwise make one index page arbitrarily long.
        $page = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'cover_image', 'label' => 'Cover', 'type' => 'image'],
                ['key' => 'title', 'label' => 'Title', 'type' => 'localized'],
                ['key' => 'published_at', 'label' => 'Published', 'type' => 'text'],
            ],
            'records' => collect($page->items())->map(fn (Post $post) => $this->presentForList($post))->values(),
            'pagination' => [
                'currentPage' => $page->currentPage(),
                'lastPage' => $page->lastPage(),
                'total' => $page->total(),
                'prevUrl' => $page->previousPageUrl(),
                'nextUrl' => $page->nextPageUrl(),
            ],
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

    public function store(StorePostRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $post = new Post;
        $post->id = $this->generateId($data['slug']);
        $post->order = (int) Post::query()->max('order') + 1;
        $this->fill($post, $data, $request);
        $post->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Post created.']);

        return to_route('admin.posts.index');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($post),
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $data = $request->validated();
        $previousImage = $post->cover_image;

        $this->fill($post, $data, $request);
        $post->save();

        if ($request->hasFile('cover_image')) {
            ImageUploadService::delete($previousImage);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Post saved.']);

        return to_route('admin.posts.index');
    }

    public function move(Request $request, Post $post): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($post, $direction) {
            $ids = Post::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($post->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                Post::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();
        ImageUploadService::delete($post->cover_image);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Post deleted.']);

        return to_route('admin.posts.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'posts',
            'label' => 'Posts',
            'singular' => 'Post',
            'searchable' => true,
            'paginated' => true,
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
            ['name' => 'published_at', 'type' => 'date', 'label' => 'Published on'],
            ['name' => 'author', 'type' => 'localized', 'label' => 'Author'],
            ['name' => 'cover_image', 'type' => 'image', 'label' => 'Cover image'],
            ['name' => 'excerpt', 'type' => 'localized', 'label' => 'Excerpt', 'multiline' => true],
            ['name' => 'body', 'type' => 'localized', 'label' => 'Body', 'multiline' => true, 'help' => 'Separate paragraphs with a blank line.'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function present(Post $post): array
    {
        return [
            'id' => $post->id,
            'order' => $post->order,
            'title' => $post->title,
            'slug' => $post->slug,
            'published_at' => $post->published_at?->format('Y-m-d'),
            'author' => $post->author,
            'cover_image' => $post->cover_image,
            'cover_image_url' => Media::url($post->cover_image),
            'excerpt' => $post->excerpt,
            'body' => $post->body,
        ];
    }

    /**
     * The index table only shows a cover image, title, and published date,
     * so this is a subset of present() — kept as its own method (matching
     * the other five image-bearing controllers) because `cover_image_url`
     * is the thumbnail here, not the full image present() sends the edit
     * form.
     *
     * @return array<string, mixed>
     */
    private function presentForList(Post $post): array
    {
        return [
            'id' => $post->id,
            'order' => $post->order,
            'title' => $post->title,
            'published_at' => $post->published_at?->format('Y-m-d'),
            'cover_image_url' => ImageUploadService::thumbnailUrl($post->cover_image),
        ];
    }

    private function generateId(string $slug): string
    {
        $base = Str::of('post-'.Str::slug($slug))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; Post::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(Post $post, array $data, Request $request): void
    {
        $post->title = $data['title'];
        $post->slug = $data['slug'];
        $post->published_at = $data['published_at'];
        $post->author = $data['author'];
        $post->excerpt = $data['excerpt'];
        $post->body = $data['body'];

        if ($request->file('cover_image') instanceof UploadedFile) {
            $post->cover_image = ImageUploadService::store($request->file('cover_image'), 'posts');
        }
    }

    /**
     * @param  Builder<Post>  $query
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
