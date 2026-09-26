<?php

namespace Database\Factories;

use App\Models\Client;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        $slug = fake()->unique()->slug(2);

        return [
            'id' => "client-{$slug}",
            'logo' => "/clients/{$slug}.svg",
            'url' => fake()->url(),
            'order' => fake()->numberBetween(1, 20),
            'name' => [
                'ar' => fake('ar_SA')->company(),
                'en' => fake()->company(),
            ],
        ];
    }
}
