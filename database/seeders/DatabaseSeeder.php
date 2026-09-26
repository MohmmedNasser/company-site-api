<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Clients first: projects and testimonials both carry a client_id
        // foreign key.
        $this->call([
            ClientSeeder::class,
            ServiceSeeder::class,
            ProjectSeeder::class,
            TestimonialSeeder::class,
            ProcessStepSeeder::class,
            FaqItemSeeder::class,
            PostSeeder::class,
            TeamMemberSeeder::class,
            ValueSeeder::class,
            TimelineSeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
