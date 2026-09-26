<?php

namespace Database\Factories;

use App\Models\Post;
use Database\Factories\Concerns\MakesLocalizedValues;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    use MakesLocalizedValues;

    public function definition(): array
    {
        $slug = fake()->unique()->slug(3);

        return [
            'id' => "post-{$slug}",
            'slug' => $slug,
            'cover_image' => "https://picsum.photos/seed/{$slug}/1600/900",
            'published_at' => fake()->dateTimeBetween('-2 years'),
            'order' => fake()->numberBetween(1, 20),
            'author' => $this->localizedName(),
            'title' => $this->localizedTitle(),
            'excerpt' => $this->localizedText(),
            'body' => $this->localizedText(4),
        ];
    }
}
