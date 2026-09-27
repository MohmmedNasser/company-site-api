<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateValueItemRequest extends FormRequest
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
            'icon' => ['required', 'string', 'max:255'],
            'description' => ['required', 'array:ar,en'],
            'description.en' => ['required', 'string', 'max:20000'],
            'description.ar' => ['required', 'string', 'max:20000'],
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
            'description.en' => 'Description (English)',
            'description.ar' => 'Description (Arabic)',
        ];
    }
}
