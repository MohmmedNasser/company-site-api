<?php

namespace Database\Seeders;

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
        // The single admin account (config/admin.php). Registration is
        // disabled, so this is how it comes to exist.
        $this->call(AdminUserSeeder::class);

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

        // Sample inbox data for local development only — not in tests,
        // which assert on exact contact/newsletter row counts.
        if (app()->environment('local')) {
            $this->call(InboxSeeder::class);
        }
    }
}
