<?php

namespace Database\Seeders;

use App\Models\ValueItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ValueSeeder extends Seeder
{
    /**
     * Seed the values table from the frontend's mock content.
     */
    public function run(): void
    {
        $values = json_decode(
            File::get(base_path('docs/content-reference/mock/values.json')),
            true
        );

        foreach ($values as $value) {
            ValueItem::create([
                'id' => $value['id'],
                'icon' => $value['icon'],
                'order' => $value['order'],
                'title' => $value['title'],
                'description' => $value['description'],
            ]);
        }
    }
}
