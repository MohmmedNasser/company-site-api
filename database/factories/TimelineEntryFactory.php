<?php

namespace Database\Factories;

use App\Enums\TimelineStatus;
use App\Models\TimelineEntry;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TimelineEntry>
 */
class TimelineEntryFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        return [
            'id' => 'milestone-'.fake()->unique()->slug(2),
            'year' => fake()->year(),
            'status' => fake()->randomElement(TimelineStatus::cases()),
            'order' => fake()->numberBetween(1, 20),
            'title' => $this->localizedTitle(),
            'description' => $this->localizedText(),
        ];
    }
}
