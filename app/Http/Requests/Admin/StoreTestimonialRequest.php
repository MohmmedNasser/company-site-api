<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
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
            'author' => ['required', 'array:ar,en'],
            'author.en' => ['required', 'string', 'max:255'],
            'author.ar' => ['required', 'string', 'max:255'],
            'role' => ['required', 'array:ar,en'],
            'role.en' => ['required', 'string', 'max:255'],
            'role.ar' => ['required', 'string', 'max:255'],
            'client_id' => ['required', 'exists:clients,id'],
            'rating' => ['required', 'numeric', 'min:0', 'max:5'],
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'quote' => ['required', 'array:ar,en'],
            'quote.en' => ['required', 'string', 'max:20000'],
            'quote.ar' => ['required', 'string', 'max:20000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'author.en' => 'Author (English)',
            'author.ar' => 'Author (Arabic)',
            'role.en' => 'Role (English)',
            'role.ar' => 'Role (Arabic)',
            'quote.en' => 'Quote (English)',
            'quote.ar' => 'Quote (Arabic)',
        ];
    }
}
