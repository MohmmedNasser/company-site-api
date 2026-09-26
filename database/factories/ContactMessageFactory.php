<?php

namespace Database\Factories;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactMessage>
 */
class ContactMessageFactory extends Factory
{
    /**
     * Defaults to a fresh, unread inbox message — the state every real
     * submission starts in. read() and archived() move it through the
     * Phase 13 inbox workflow.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            // Same option values the frontend contact form submits
            // (company-site-web/src/components/sections/contact-form.tsx).
            'service' => fake()->randomElement(['web', 'mobile', 'ecommerce', 'saas', 'branding', 'other']),
            'budget' => fake()->randomElement(['under10k', '10to25k', '25to50k', 'over50k', 'notSure']),
            'message' => fake()->paragraph(),
        ];
    }

    public function read(): static
    {
        return $this->state(fn () => ['read_at' => now()]);
    }

    public function archived(): static
    {
        return $this->state(fn () => ['archived_at' => now()]);
    }
}
