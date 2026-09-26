<?php

namespace Database\Factories;

use App\Models\Category;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        return [
            'id' => fake()->unique()->slug(1),
            'order' => fake()->numberBetween(1, 20),
            'name' => $this->localizedTitle(),
        ];
    }
}
