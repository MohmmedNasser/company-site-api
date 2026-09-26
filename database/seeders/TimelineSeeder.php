<?php

namespace Database\Seeders;

use App\Models\TimelineEntry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TimelineSeeder extends Seeder
{
    /**
     * Seed the timeline table from the frontend's mock content.
     */
    public function run(): void
    {
        $entries = json_decode(
            File::get(base_path('docs/content-reference/mock/timeline.json')),
            true
        );

        foreach ($entries as $entry) {
            TimelineEntry::create([
                'id' => $entry['id'],
                'year' => $entry['year'],
                'status' => $entry['status'],
                'order' => $entry['order'],
                'title' => $entry['title'],
                'description' => $entry['description'],
            ]);
        }
    }
}
