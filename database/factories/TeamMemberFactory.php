<?php

namespace Database\Factories;

use App\Models\TeamMember;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TeamMember>
 */
class TeamMemberFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        $slug = fake()->unique()->slug(2);

        return [
            'id' => "team-{$slug}",
            'avatar' => "https://picsum.photos/seed/team-{$slug}/640/640",
            'order' => fake()->numberBetween(1, 20),
            'name' => $this->localizedName(),
            'role' => $this->localizedTitle(),
            'bio' => $this->localizedText(),
        ];
    }
}
