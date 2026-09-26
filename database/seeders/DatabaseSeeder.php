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

        // Categories and clients first: projects carry category_id and
        // client_id foreign keys, testimonials carry client_id.
        $this->call([
            CategorySeeder::class,
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
