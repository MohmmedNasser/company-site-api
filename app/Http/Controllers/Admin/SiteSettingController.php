<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The site_settings singleton has no index, create, or delete — only this
 * one edit page, sectioned by the row's six JSON columns.
 */
class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/settings/edit', [
            'settings' => SiteSetting::current()->only(SiteSettingRequest::SECTIONS),
        ]);
    }

    public function update(SiteSettingRequest $request): RedirectResponse
    {
        SiteSetting::current()->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Settings saved.']);

        return to_route('admin.settings.edit');
    }
}
