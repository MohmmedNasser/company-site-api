<?php

namespace Database\Factories;

use App\Models\FaqItem;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FaqItem>
 */
class FaqItemFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        return [
            'id' => 'faq-'.fake()->unique()->slug(2),
            'order' => fake()->numberBetween(1, 20),
            'question' => $this->localizedTitle(),
            'answer' => $this->localizedText(),
        ];
    }
}
