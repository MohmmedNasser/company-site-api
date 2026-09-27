<?php

namespace App\Http\Resources\V1;

use App\Models\ValueItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `ValueItem`.
 *
 * @mixin ValueItem
 */
class ValueItemResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'icon' => $this->icon,
            'order' => $this->order,
            'title' => $this->title,
            'description' => $this->description,
        ];
    }
}
