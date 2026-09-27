<?php

namespace App\Http\Requests\Admin;

use App\Enums\TimelineStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTimelineEntryRequest extends FormRequest
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
            'year' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in(array_column(TimelineStatus::cases(), 'value'))],
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
