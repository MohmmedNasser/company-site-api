<?php

namespace Database\Seeders;

use App\Models\FaqItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class FaqItemSeeder extends Seeder
{
    /**
     * Seed the faq_items table from the frontend's mock content.
     */
    public function run(): void
    {
        $items = json_decode(
            File::get(base_path('docs/content-reference/mock/faq.json')),
            true
        );

        foreach ($items as $item) {
            FaqItem::create([
                'id' => $item['id'],
                'order' => $item['order'],
                'question' => $item['question'],
                'answer' => $item['answer'],
            ]);
        }
    }
}
