<?php

namespace Database\Factories;

use App\Models\ProcessStep;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProcessStep>
 */
class ProcessStepFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        return [
            'id' => 'step-'.fake()->unique()->slug(2),
            'icon' => fake()->randomElement(['Sparkles', 'Wand2', 'Rocket']),
            'order' => fake()->numberBetween(1, 20),
            'title' => $this->localizedTitle(),
            'description' => $this->localizedText(),
        ];
    }
}
