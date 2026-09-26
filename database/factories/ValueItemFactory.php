<?php

namespace Database\Factories;

use App\Models\ValueItem;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ValueItem>
 */
class ValueItemFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        return [
            'id' => 'value-'.fake()->unique()->slug(2),
            'icon' => fake()->randomElement(['Target', 'Handshake', 'Gauge']),
            'order' => fake()->numberBetween(1, 20),
            'title' => $this->localizedTitle(),
            'description' => $this->localizedText(),
        ];
    }
}
