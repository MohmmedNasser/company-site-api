<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates repository.ts `ContactPayload`:
 * { name: string; email: string; service?: string; budget?: string; message: string }
 *
 * Minimum lengths mirror the frontend's zod schema (contact-form.tsx), so
 * a payload the form accepts is never rejected here. service and budget
 * are optional because ContactPayload marks them optional, even though the
 * current form requires both. The honeypot field is not part of the
 * payload: the Server Action drops honeypot submissions before calling the
 * repository.
 */
class ContactRequest extends FormRequest
{
    /**
     * Public endpoint — anyone may submit; abuse is handled by the
     * "submissions" rate limiter, not by authorization.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'service' => ['nullable', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }
}
