<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TestimonialSeeder extends Seeder
{
    /**
     * Seed the testimonials table from the frontend's mock content.
     * Depends on ClientSeeder having already run — client_id is a foreign
     * key.
     */
    public function run(): void
    {
        $testimonials = json_decode(
            File::get(base_path('docs/content-reference/mock/testimonials.json')),
            true
        );

        foreach ($testimonials as $testimonial) {
            Testimonial::create([
                'id' => $testimonial['id'],
                'client_id' => $testimonial['clientId'],
                'avatar' => $testimonial['avatar'],
                'rating' => $testimonial['rating'],
                'order' => $testimonial['order'],
                'author' => $testimonial['author'],
                'role' => $testimonial['role'],
                'quote' => $testimonial['quote'],
            ]);
        }
    }
}
