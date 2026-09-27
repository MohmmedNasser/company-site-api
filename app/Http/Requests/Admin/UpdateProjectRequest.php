<?php

namespace App\Http\Requests\Admin;

use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('projects', 'slug')->ignore($this->route('project'))],
            'category_id' => ['required', 'exists:categories,id'],
            'client_id' => ['required', 'exists:clients,id'],
            'status' => ['required', Rule::in(array_column(ProjectStatus::cases(), 'value'))],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'summary' => ['required', 'array:ar,en'],
            'summary.en' => ['required', 'string', 'max:20000'],
            'summary.ar' => ['required', 'string', 'max:20000'],
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
            'summary.en' => 'Summary (English)',
            'summary.ar' => 'Summary (Arabic)',
            'description.en' => 'Description (English)',
            'description.ar' => 'Description (Arabic)',
        ];
    }
}
