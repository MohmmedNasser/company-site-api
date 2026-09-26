<?php

namespace Database\Factories;

use App\Enums\ProjectStatus;
use App\Models\Category;
use App\Models\Client;
use App\Models\Project;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        $slug = fake()->unique()->slug(2);

        return [
            'id' => "project-{$slug}",
            'slug' => $slug,
            // A factory as the value of a foreign key: Laravel creates the
            // parent row first and fills in its id. Pass an explicit
            // ->for($category) to reuse an existing one instead.
            'category_id' => Category::factory(),
            'status' => ProjectStatus::Shipped,
            'client_id' => Client::factory(),
            'cover_image' => "https://picsum.photos/seed/{$slug}/1600/900",
            'order' => fake()->numberBetween(1, 20),
            'title' => $this->localizedTitle(),
            'summary' => $this->localizedText(),
            'description' => $this->localizedText(3),
        ];
    }

    public function inDevelopment(): static
    {
        return $this->state(fn () => ['status' => ProjectStatus::InDevelopment]);
    }
}
