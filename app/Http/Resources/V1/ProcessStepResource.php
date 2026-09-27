<?php

namespace App\Http\Resources\V1;

use App\Models\ProcessStep;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `ProcessStep`.
 *
 * @mixin ProcessStep
 */
class ProcessStepResource extends JsonResource
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
