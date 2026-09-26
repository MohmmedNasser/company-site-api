<?php

namespace Database\Factories\Concerns;

/**
 * Fake values for the { "ar": ..., "en": ... } JSON columns every content
 * model shares (see App\Concerns\HasLocalizedFields). The Arabic half comes
 * from Faker's ar_SA locale so RTL rendering is exercised with real Arabic
 * script, not Latin placeholder text in both keys.
 */
trait MakesLocalizedValues
{
    /**
     * A short label or title.
     *
     * @return array{ar: string, en: string}
     */
    protected function localizedTitle(): array
    {
        return [
            'ar' => fake('ar_SA')->realText(30),
            'en' => rtrim(fake()->sentence(3), '.'),
        ];
    }

    /**
     * A person's name.
     *
     * @return array{ar: string, en: string}
     */
    protected function localizedName(): array
    {
        return [
            'ar' => fake('ar_SA')->name(),
            'en' => fake()->name(),
        ];
    }

    /**
     * One or more paragraphs, separated by a blank line — the same
     * convention the frontend's paragraphs.ts splits on.
     *
     * @return array{ar: string, en: string}
     */
    protected function localizedText(int $paragraphs = 1): array
    {
        return [
            'ar' => implode("\n\n", array_map(
                fn () => fake('ar_SA')->realText(200),
                range(1, $paragraphs),
            )),
            'en' => implode("\n\n", fake()->paragraphs($paragraphs)),
        ];
    }
}
