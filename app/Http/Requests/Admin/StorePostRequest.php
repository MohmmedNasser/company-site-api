<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'array:ar,en'],
            'title.en' => ['required', 'string', 'max:255'],
            'title.ar' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', 'unique:posts,slug'],
            'published_at' => ['required', 'date_format:Y-m-d'],
            'author' => ['required', 'array:ar,en'],
            'author.en' => ['required', 'string', 'max:255'],
            'author.ar' => ['required', 'string', 'max:255'],
            'cover_image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'excerpt' => ['required', 'array:ar,en'],
            'excerpt.en' => ['required', 'string', 'max:20000'],
            'excerpt.ar' => ['required', 'string', 'max:20000'],
            'body' => ['required', 'array:ar,en'],
            'body.en' => ['required', 'string', 'max:20000'],
            'body.ar' => ['required', 'string', 'max:20000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title.en' => 'Title (English)',
            'title.ar' => 'Title (Arabic)',
            'author.en' => 'Author (English)',
            'author.ar' => 'Author (Arabic)',
            'excerpt.en' => 'Excerpt (English)',
            'excerpt.ar' => 'Excerpt (Arabic)',
            'body.en' => 'Body (English)',
            'body.ar' => 'Body (Arabic)',
        ];
    }
}
