<?php

namespace Database\Factories;

use App\Models\Service;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        $slug = fake()->unique()->slug(2);

        return [
            'id' => "svc-{$slug}",
            'slug' => $slug,
            'icon' => fake()->randomElement(['Globe', 'Smartphone', 'Palette', 'Server']),
            'image' => "https://picsum.photos/seed/{$slug}/1200/800",
            // Practitioner tags stay English in both locales (types.ts).
            'categories' => fake()->words(3),
            'order' => fake()->numberBetween(1, 20),
            'title' => $this->localizedTitle(),
            'excerpt' => $this->localizedText(),
            'body' => $this->localizedText(3),
        ];
    }
}
