<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Testimonial;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        $slug = fake()->unique()->slug(2);

        return [
            'id' => "testimonial-{$slug}",
            'client_id' => Client::factory(),
            'avatar' => "https://picsum.photos/seed/{$slug}/320/320",
            // Matches the decimal(2,1) column: 4.0 to 5.0 in 0.5 steps.
            'rating' => fake()->randomElement([4.0, 4.5, 5.0]),
            'order' => fake()->numberBetween(1, 20),
            'author' => $this->localizedName(),
            'role' => $this->localizedTitle(),
            'quote' => $this->localizedText(),
        ];
    }
}
