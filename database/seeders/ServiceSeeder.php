<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ServiceSeeder extends Seeder
{
    /**
     * Seed the services table from the frontend's mock content.
     */
    public function run(): void
    {
        $services = json_decode(
            File::get(base_path('docs/content-reference/mock/services.json')),
            true
        );

        foreach ($services as $service) {
            Service::create([
                'id' => $service['id'],
                'slug' => $service['slug'],
                'icon' => $service['icon'],
                'image' => $service['image'],
                'categories' => $service['categories'],
                'order' => $service['order'],
                'title' => $service['title'],
                'excerpt' => $service['excerpt'],
                'body' => $service['body'],
            ]);
        }
    }
}
