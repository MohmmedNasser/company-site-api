<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFaqItemRequest extends FormRequest
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
            'question' => ['required', 'array:ar,en'],
            'question.en' => ['required', 'string', 'max:255'],
            'question.ar' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'array:ar,en'],
            'answer.en' => ['required', 'string', 'max:20000'],
            'answer.ar' => ['required', 'string', 'max:20000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'question.en' => 'Question (English)',
            'question.ar' => 'Question (Arabic)',
            'answer.en' => 'Answer (English)',
            'answer.ar' => 'Answer (Arabic)',
        ];
    }
}
