<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the project categories. Unlike the other seeders there is no
     * mock JSON file to read: the frontend keeps these labels in its UI
     * dictionaries (company-site-web/messages/{ar,en}.json, key
     * "projectCategories"), so they are copied here verbatim. The ids are
     * the same slugs projects.json uses in its "category" field.
     */
    public function run(): void
    {
        $categories = [
            ['id' => 'web', 'name' => ['en' => 'Web', 'ar' => 'ويب']],
            ['id' => 'mobile', 'name' => ['en' => 'Mobile', 'ar' => 'جوال']],
            ['id' => 'ecommerce', 'name' => ['en' => 'E-commerce', 'ar' => 'تجارة إلكترونية']],
            ['id' => 'saas', 'name' => ['en' => 'SaaS', 'ar' => 'SaaS']],
        ];

        foreach ($categories as $index => $category) {
            Category::create([...$category, 'order' => $index + 1]);
        }
    }
}
