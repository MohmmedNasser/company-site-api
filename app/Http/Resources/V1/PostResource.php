<?php

namespace App\Http\Resources\V1;

use App\Models\Post;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `Post`.
 *
 * @mixin Post
 */
class PostResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'coverImage' => Media::url($this->cover_image),
            // The date cast yields a Carbon instance; types.ts wants the plain
            // ISO date the mock data uses ("2026-06-15"), not a timestamp.
            'publishedAt' => $this->published_at->toDateString(),
            'order' => $this->order,
            'author' => $this->author,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'body' => $this->body,
        ];
    }
}
