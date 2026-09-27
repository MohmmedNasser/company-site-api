<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use App\Models\NewsletterSubscription;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

/**
 * Sample contact messages and newsletter subscribers, so the inbox and
 * subscriber screens have something to show in development. These tables
 * are filled by real visitors in production — DatabaseSeeder only calls
 * this in the local environment.
 */
class InboxSeeder extends Seeder
{
    public function run(): void
    {
        // Spread over the last three weeks so "newest first" is visible.
        ContactMessage::factory()->count(14)->sequence(
            fn ($sequence) => ['created_at' => Date::now()->subHours($sequence->index * 30)],
        )->create();

        // A few already handled, so every inbox state has an example.
        ContactMessage::query()->oldest()->limit(5)->update(['read_at' => Date::now()]);
        ContactMessage::query()->oldest()->limit(2)->update(['archived_at' => Date::now()]);

        NewsletterSubscription::factory()->count(23)->sequence(
            fn ($sequence) => ['created_at' => Date::now()->subDays($sequence->index)],
        )->create();
    }
}
