# JSON columns for localized fields, and the shared `HasLocalizedFields` trait

## What is it?

`app/Concerns/HasLocalizedFields.php:5-23` is a trait with one method:

```php
public function localized(string $field, ?string $locale = null): string
{
    $locale ??= app()->getLocale();
    $value = $this->{$field} ?? [];
    return $value[$locale]
        ?? $value[config('app.fallback_locale')]
        ?? '';
}
```

Every content model that has translatable text uses it —
`Service.php:12`, `Project.php:14`, `Testimonial.php:12`, `Client.php:9`,
and the rest — alongside a `casts()` method that marks each translatable
column `'array'` (`Service.php:18-27`). In the database, a field like
`services.title` is one JSON column holding `{"ar": "...", "en": "..."}`;
Eloquent's `array` cast turns that JSON string into a PHP array on read
(`$service->title['en']`), and `->localized('title')` wraps that with
locale resolution and a fallback.

## Why is it here, in this project specifically?

`docs/content-reference/mock/services.json:9` already stores translations
exactly this way — `"title": { "en": "Web Development", "ar": "تطوير
الويب" }` — because `docs/content-reference/types.ts:3` defines
`Localized = { ar: string; en: string }` as the frontend's own contract.
`ServiceSeeder::run()` (`database/seeders/ServiceSeeder.php:24-26`) copies
`$service['title']` straight into the `title` column with no
transformation — the JSON shape in the file and the JSON shape in the
column are identical, so the seeder is a pass-through rather than a
translator. This matters specifically because Task 3's requirement was to
seed the *exact* bilingual copy already written, not placeholder text —
JSON columns make that a direct copy; any other translation strategy would
require reshaping the data on the way in.

## What was the alternative, and why was it rejected?

The textbook alternative is a separate `translations` table —
`(translatable_type, translatable_id, locale, field, value)` — the
approach `docs/PROJECT-PLAN.md`'s original Phase 10 sketch (§4, "Topics to
write up") explicitly names and asks to be compared against JSON. That
table design was rejected for the same reason
`docs/content-reference/mock/posts.json:38` (the project's own blog post on
this exact tradeoff, seeded verbatim by `PostSeeder`) argues: every read of
a service's title would become a join (or a second query per locale),
every write would become two `INSERT`s instead of one, and the model layer
would need a set of accessors whose only job is hiding that join from the
rest of the app — which is precisely what `HasLocalizedFields::localized()`
does today, minus the join. The translations-table design only pays for
itself once something needs to filter or sort *by* the translated value
(`WHERE title->>'en' LIKE ...`) — nothing in this project's `/api/v1`
routes does that yet, so JSON is the cheaper design until that changes.

## What breaks if it is removed?

If `services.title` were split into a separate `translations` table
instead, `ServiceSeeder::run()` would break immediately — its single
`Service::create([...'title' => $service['title']...])` call
(`ServiceSeeder.php:24-31`) assumes one row holds the whole `{ar, en}`
pair; a translations table would need two `INSERT`s per field per record,
multiplying every seeder's row count roughly eight-fold. If instead the
`'array'` cast were simply dropped from a model's `casts()` while the
column stayed JSON, `$service->title` would return a raw JSON *string*
(`'{"ar":"...","en":"..."}'`), `HasLocalizedFields::localized()`'s
`$value[$locale]` lookup (`HasLocalizedFields.php:19`) would silently
index into a string by character offset instead of by array key, and
`$service->localized('title', 'ar')` would return an empty string instead
of throwing — a fallback that hides the bug rather than surfacing it.

## What to read next

- `05-string-primary-keys.md` — the sibling decision that keeps every
  content model's identity matching the frontend's, the same way this one
  keeps the translated text matching
- `07-backed-enums.md` — how `Project.status` and `TimelineEntry.status`
  are typed instead of being loose strings, on models that also use this
  trait
