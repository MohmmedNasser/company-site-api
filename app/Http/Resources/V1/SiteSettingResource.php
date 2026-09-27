<?php

namespace App\Http\Resources\V1;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shape: types.ts `SiteSettings`. Each column already holds its whole
 * subtree with camelCase keys (seeded verbatim from settings.json), so
 * the columns pass through untouched; only id and timestamps are dropped.
 *
 * @mixin SiteSetting
 */
class SiteSettingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'hero' => $this->hero,
            'sections' => $this->sections,
            'pages' => $this->pages,
            'contact' => $this->contact,
            'newsletter' => $this->newsletter,
            'social' => $this->social,
        ];
    }
}
