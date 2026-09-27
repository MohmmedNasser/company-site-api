<?php

namespace App\Http\Resources\V1;

use App\Models\TeamMember;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `TeamMember`.
 *
 * @mixin TeamMember
 */
class TeamMemberResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'avatar' => Media::url($this->avatar),
            'order' => $this->order,
            'name' => $this->name,
            'role' => $this->role,
            'bio' => $this->bio,
        ];
    }
}
