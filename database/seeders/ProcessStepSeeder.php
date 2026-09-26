<?php

namespace Database\Seeders;

use App\Models\ProcessStep;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProcessStepSeeder extends Seeder
{
    /**
     * Seed the process_steps table from the frontend's mock content.
     */
    public function run(): void
    {
        $steps = json_decode(
            File::get(base_path('docs/content-reference/mock/process-steps.json')),
            true
        );

        foreach ($steps as $step) {
            ProcessStep::create([
                'id' => $step['id'],
                'icon' => $step['icon'],
                'order' => $step['order'],
                'title' => $step['title'],
                'description' => $step['description'],
            ]);
        }
    }
}
