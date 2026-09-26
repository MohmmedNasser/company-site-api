<?php

namespace Database\Factories;

use App\Models\NewsletterSubscription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsletterSubscription>
 */
class NewsletterSubscriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            // unique(): the email column has a UNIQUE index.
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
