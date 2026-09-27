<?php

namespace App\Http\Resources\V1;

use App\Models\Project;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `Project`. Two DB→API renames resolve here:
 * category_id → "category" and client_id → "client" (an id string, not
 * an embedded Client — the frontend joins it against GET /clients).
 * cover_image → "coverImage" is the usual snake→camel rename.
 *
 * @mixin Project
 */
class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'category' => $this->category_id,
            'status' => $this->status->value,
            'client' => $this->client_id,
            'coverImage' => Media::url($this->cover_image),
            'order' => $this->order,
            'title' => $this->title,
            'summary' => $this->summary,
            'description' => $this->description,
        ];
    }
}
