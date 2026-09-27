<?php

namespace App\Http\Resources\V1;

use App\Models\FaqItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `FaqItem`.
 *
 * @mixin FaqItem
 */
class FaqItemResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order' => $this->order,
            'question' => $this->question,
            'answer' => $this->answer,
        ];
    }
}
