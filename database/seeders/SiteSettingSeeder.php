<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SiteSettingSeeder extends Seeder
{
    /**
     * Seed the site_settings singleton row from the frontend's mock
     * content. settings.json's top-level keys (hero, sections, pages,
     * contact, newsletter, social) map directly onto the table's columns —
     * no per-field transformation, since each column stores that whole
     * subtree as-is.
     */
    public function run(): void
    {
        $settings = json_decode(
            File::get(base_path('docs/content-reference/mock/settings.json')),
            true
        );

        SiteSetting::create([
            'id' => 1,
            'hero' => $settings['hero'],
            'sections' => $settings['sections'],
            'pages' => $settings['pages'],
            'contact' => $settings['contact'],
            'newsletter' => $settings['newsletter'],
            'social' => $settings['social'],
        ]);
    }
}
