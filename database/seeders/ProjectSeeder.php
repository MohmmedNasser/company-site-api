<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProjectSeeder extends Seeder
{
    /**
     * Seed the projects table from the frontend's mock content. Depends on
     * ClientSeeder having already run — client_id is a foreign key.
     */
    public function run(): void
    {
        $projects = json_decode(
            File::get(base_path('docs/content-reference/mock/projects.json')),
            true
        );

        foreach ($projects as $project) {
            Project::create([
                'id' => $project['id'],
                'slug' => $project['slug'],
                'category' => $project['category'],
                'status' => $project['status'],
                // mock JSON key is "client" (types.ts: Project.client), DB
                // column is "client_id" per the snake_case-DB naming rule.
                'client_id' => $project['client'],
                'cover_image' => $project['coverImage'],
                'order' => $project['order'],
                'title' => $project['title'],
                'summary' => $project['summary'],
                'description' => $project['description'],
            ]);
        }
    }
}
