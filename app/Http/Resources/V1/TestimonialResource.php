<?php

namespace App\Http\Resources\V1;

use App\Models\Testimonial;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `Testimonial`. Note the asymmetry with Project:
 * types.ts names this key "clientId" here but "client" on Project, so
 * client_id maps to a different key in each resource.
 *
 * @mixin Testimonial
 */
class TestimonialResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'clientId' => $this->client_id,
            'avatar' => Media::url($this->avatar),
            // The decimal:1 cast yields a string ("4.9"); types.ts wants a number.
            'rating' => (float) $this->rating,
            'order' => $this->order,
            'author' => $this->author,
            'role' => $this->role,
            'quote' => $this->quote,
        ];
    }
}
