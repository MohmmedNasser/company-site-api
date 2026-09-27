<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceRequest extends FormRequest
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
            // The route already resolved {service}, so its own row is
            // excluded from the uniqueness check.
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('services', 'slug')->ignore($this->route('service'))],
            'icon' => ['required', 'string', 'max:255'],
            // Absent on update means "keep the current image".
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'categories' => ['nullable', 'array', 'max:12'],
            'categories.*' => ['required', 'string', 'max:40', 'distinct'],
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
            'excerpt.en' => 'Excerpt (English)',
            'excerpt.ar' => 'Excerpt (Arabic)',
            'body.en' => 'Body (English)',
            'body.ar' => 'Body (Arabic)',
        ];
    }
}
