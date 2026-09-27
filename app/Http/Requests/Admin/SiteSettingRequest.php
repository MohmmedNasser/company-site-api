<?php

namespace App\Http\Requests\Admin;

use App\Models\SiteSetting;
use Illuminate\Foundation\Http\FormRequest;

/**
 * SiteSettings is a deep tree (types.ts `SiteSettings`): about sixty
 * localized strings across hero/sections/pages, a few plain strings, and
 * the social list. Rather than hand-write sixty rule lines that would
 * drift from the data, the rules are derived by walking the stored row:
 * every `{ ar, en }` leaf must stay a complete `{ ar, en }` pair, every
 * plain string stays a string, and every object keeps its keys. The
 * admin can edit values but can't add, drop, or reshape keys — the shape
 * belongs to the frontend's types.ts, not to this form.
 */
class SiteSettingRequest extends FormRequest
{
    public const SECTIONS = ['hero', 'sections', 'pages', 'contact', 'newsletter', 'social'];

    /** Leaf paths that need more than "a string". */
    private const OVERRIDES = [
        'contact.email' => ['required', 'email', 'max:255'],
    ];

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        $current = SiteSetting::current()->only(self::SECTIONS);

        return [
            ...$this->rulesFor(array_diff_key($current, ['social' => true])),
            // The one list in the tree, and the one place the admin adds
            // or removes entries — so its rules can't be read off the
            // current row (an empty list has no item shape to copy).
            'social' => ['present', 'array', 'max:20'],
            'social.*' => ['array:platform,url'],
            'social.*.platform' => ['required', 'string', 'max:40'],
            'social.*.url' => ['required', 'url', 'max:255'],
        ];
    }

    /**
     * "The hero.title.ar field is required" → "The hero › title (Arabic)
     * field is required", matching ContentRequest's wording.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return collect(array_keys($this->rules()))
            ->mapWithKeys(function (string $path) {
                $label = str_replace('.', ' › ', (string) preg_replace('/\.(en|ar)$/', '', $path));
                $suffix = match (true) {
                    str_ends_with($path, '.en') => ' (English)',
                    str_ends_with($path, '.ar') => ' (Arabic)',
                    default => '',
                };

                return [$path => $label.$suffix];
            })
            ->all();
    }

    /**
     * @param  array<string, mixed>  $node
     * @return array<string, list<string>>
     */
    private function rulesFor(array $node, string $prefix = ''): array
    {
        $rules = [];

        foreach ($node as $key => $value) {
            $path = $prefix === '' ? (string) $key : "{$prefix}.{$key}";

            if (isset(self::OVERRIDES[$path])) {
                $rules[$path] = self::OVERRIDES[$path];
            } elseif (is_array($value) && self::isLocalized($value)) {
                $rules[$path] = ['required', 'array:ar,en'];
                $rules["{$path}.en"] = ['required', 'string', 'max:5000'];
                $rules["{$path}.ar"] = ['required', 'string', 'max:5000'];
            } elseif (is_array($value)) {
                $rules[$path] = ['required', 'array:'.implode(',', array_keys($value))];
                $rules = [...$rules, ...$this->rulesFor($value, $path)];
            } else {
                $rules[$path] = ['required', 'string', 'max:255'];
            }
        }

        return $rules;
    }

    /**
     * @param  array<mixed>  $value
     */
    private static function isLocalized(array $value): bool
    {
        $keys = array_keys($value);
        sort($keys);

        return $keys === ['ar', 'en'];
    }
}
