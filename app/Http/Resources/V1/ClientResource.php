<?php

namespace App\Http\Resources\V1;

use App\Models\Client;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `Client`.
 *
 * @mixin Client
 */
class ClientResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'logo' => Media::url($this->logo),
            'url' => $this->url,
            'order' => $this->order,
            'name' => $this->name,
        ];
    }
}
