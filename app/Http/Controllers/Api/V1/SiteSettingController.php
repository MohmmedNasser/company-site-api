<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SiteSettingResource;
use App\Models\SiteSetting;

class SiteSettingController extends Controller
{
    /**
     * GET /api/v1/settings — repository.ts: getSettings().
     * A single object, not a list: site_settings is a one-row table.
     */
    public function show(): SiteSettingResource
    {
        return new SiteSettingResource(SiteSetting::current());
    }
}
