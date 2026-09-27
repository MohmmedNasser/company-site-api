<?php

namespace App\Http\Resources\V1;

use App\Models\TimelineEntry;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `TimelineEntry`.
 *
 * @mixin TimelineEntry
 */
class TimelineEntryResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'status' => $this->status->value,
            'order' => $this->order,
            'title' => $this->title,
            'description' => $this->description,
        ];
    }
}
