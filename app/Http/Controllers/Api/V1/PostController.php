<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    /**
     * Must equal POSTS_PER_PAGE in the frontend's repository.ts — the blog
     * pager computes page counts from that constant, so a different size
     * here would make its page links point at the wrong posts.
     */
    public const PER_PAGE = 6;

    /**
     * GET /api/v1/posts?page= — repository.ts: getPosts(page) and
     * getPostCount().
     *
     * `data` is the page's Post[] (what getPosts returns); `meta.total` is
     * what getPostCount returns, so no separate count route is needed.
     * Built by hand instead of passing the paginator to the resource,
     * because Laravel's default paginated envelope uses snake_case meta
     * keys (current_page) plus a `links` block the frontend never reads.
     * A page past the end returns an empty `data` list, same as the mock.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
        ]);

        $posts = Post::query()->orderBy('order')->paginate(self::PER_PAGE);

        return PostResource::collection($posts->getCollection())->additional([
            'meta' => [
                'currentPage' => $posts->currentPage(),
                'perPage' => $posts->perPage(),
                'total' => $posts->total(),
                'lastPage' => $posts->lastPage(),
            ],
        ]);
    }

    /**
     * GET /api/v1/posts/{slug} — repository.ts: getPost(slug).
     */
    public function show(Post $post): PostResource
    {
        return new PostResource($post);
    }
}
