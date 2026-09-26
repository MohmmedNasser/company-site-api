<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class PostSeeder extends Seeder
{
    /**
     * Seed the posts table from the frontend's mock content.
     */
    public function run(): void
    {
        $posts = json_decode(
            File::get(base_path('docs/content-reference/mock/posts.json')),
            true
        );

        foreach ($posts as $post) {
            Post::create([
                'id' => $post['id'],
                'slug' => $post['slug'],
                'cover_image' => $post['coverImage'],
                'published_at' => $post['publishedAt'],
                'order' => $post['order'],
                'author' => $post['author'],
                'title' => $post['title'],
                'excerpt' => $post['excerpt'],
                'body' => $post['body'],
            ]);
        }
    }
}
