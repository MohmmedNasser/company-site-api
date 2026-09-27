<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamMemberRequest extends FormRequest
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
            'role' => ['required', 'array:ar,en'],
            'role.en' => ['required', 'string', 'max:255'],
            'role.ar' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'bio' => ['required', 'array:ar,en'],
            'bio.en' => ['required', 'string', 'max:20000'],
            'bio.ar' => ['required', 'string', 'max:20000'],
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
            'role.en' => 'Role (English)',
            'role.ar' => 'Role (Arabic)',
            'bio.en' => 'Bio (English)',
            'bio.ar' => 'Bio (Arabic)',
        ];
    }
}
