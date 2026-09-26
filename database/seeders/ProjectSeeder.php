<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProjectSeeder extends Seeder
{
    /**
     * Seed the projects table from the frontend's mock content. Depends on
     * CategorySeeder and ClientSeeder having already run — category_id and
     * client_id are both foreign keys.
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
                // Same key-rename as client below: mock "category" becomes
                // the category_id foreign key.
                'category_id' => $project['category'],
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
