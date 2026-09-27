<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
            'name' => ['required', 'array:ar,en'],
            'name.en' => ['required', 'string', 'max:255'],
            'name.ar' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:255'],
            // Logos are the one place a vector format is the norm, so SVG
            // is allowed here even though it can carry script.
            'logo' => ['required', 'image:allow_svg', 'mimes:jpg,jpeg,png,webp,avif,svg', 'max:4096'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name.en' => 'Name (English)',
            'name.ar' => 'Name (Arabic)',
        ];
    }
}
