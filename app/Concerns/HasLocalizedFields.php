<?php

namespace App\Concerns;

trait HasLocalizedFields
{
    /**
     * Resolve one locale's string out of a { "ar": ..., "en": ... } JSON
     * column. Falls back to the app's configured fallback locale, then to
     * an empty string, so a missing translation renders blank instead of
     * throwing.
     */
    public function localized(string $field, ?string $locale = null): string
    {
        $locale ??= app()->getLocale();

        $value = $this->{$field} ?? [];

        return $value[$locale]
            ?? $value[config('app.fallback_locale')]
            ?? '';
    }
}
