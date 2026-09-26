# The `site_settings` singleton: a table enforced to hold exactly one row

## What is it?

`app/Models/SiteSetting.php:39-42` replaces every normal Eloquent query
method with one static accessor:

```php
public static function current(): self
{
    return static::findOrFail(1);
}
```

Nothing in this codebase is meant to call `SiteSetting::where(...)` or
`SiteSetting::all()` — there is exactly one row, id `1`, holding the whole
site's non-collection copy (hero text, section headings, contact details,
social links) as six JSON columns. The migration backs that guarantee at
the database level:
`database/migrations/2026_08_18_100011_create_site_settings_table.php:20`
makes `id` a plain `unsignedTinyInteger` primary key (not
`AUTO_INCREMENT`), and line 35 adds a raw SQL `CHECK` constraint —
`ALTER TABLE site_settings ADD CONSTRAINT site_settings_singleton_check
CHECK (id = 1)` — so MySQL itself refuses any row where `id` isn't `1`.

## Why is it here, in this project specifically?

`docs/content-reference/types.ts:175-234` defines `SiteSettings` as a
single interface — one object, not an array — covering `hero`, `sections`,
`pages`, `contact`, `newsletter`, and `social`. The frontend's
`getSettings(): Promise<SiteSettings>` (`docs/content-reference/repository.
ts:70`) returns one object, never a list, and
`docs/content-reference/mock/settings.json` is one JSON document, not an
array of documents. `SiteSettingSeeder::run()`
(`database/seeders/SiteSettingSeeder.php:18-29`) reflects that directly:
it calls `SiteSetting::create()` exactly once, with `'id' => 1` hardcoded,
because there is no second settings record to ever create — a Phase 13
admin "site settings" page will always be *editing* row 1, never choosing
among rows.

## What was the alternative, and why was it rejected?

The naive alternative is a `key`/`value` settings table — one row per
setting, e.g. `('hero.title.en', 'Shaping Digital Futures')` — the classic
Laravel "settings package" shape. That was rejected because `SiteSettings`
isn't flat key-value pairs; it's deeply nested (`hero.trust.clientsLabel`
is itself a `Localized` object three levels down). Flattening that into
individual rows would mean either inventing a dotted-key naming scheme
that duplicates the TypeScript interface's structure in string form, or
storing each nested object as its own JSON blob anyway — at which point
the key-value table adds a layer of indirection over the six-JSON-column
design without removing any of its complexity. Six JSON columns, one per
top-level `SiteSettings` key, match the interface directly: `settings.json`
`Read`-in-full and mapped column-for-column
(`SiteSettingSeeder.php:22-28`) with zero reshaping.

## What breaks if it is removed?

Two different removals, two different failures. Dropping the `CHECK`
constraint (line 35 of the migration) but keeping `SiteSetting::current()`
doesn't break anything on a correctly-seeded database — the bug only
appears if something *else* later calls `SiteSetting::create([...])` with
a different `id`; without the constraint, that silently succeeds and
`SiteSetting::current()`'s `findOrFail(1)` keeps returning the *original*
row, so the admin panel would show one settings row while a second,
orphaned row sits invisibly in the table, edited by nothing and read by
nothing. Dropping `public $incrementing = false` (`SiteSetting.php:16`)
while keeping the non-`AUTO_INCREMENT` migration column is the other
failure direction: Eloquent would try to read back a database-generated
insert ID after `SiteSetting::create()`, get `0` (MySQL's non-answer for a
non-auto-increment column), and silently set the in-memory model's `id` to
`0` instead of the `1` that was actually inserted — so the object
returned from `create()` would then fail its own next `save()` call,
looking for a row `id = 0` that doesn't exist.

## What to read next

- `05-string-primary-keys.md` — the primary-key pattern every *other*
  model in this phase uses instead, and why `site_settings` is the one
  deliberate exception
- `06-json-localization-columns.md` — the same JSON-column technique this
  table uses for `hero`/`sections`/`pages`/etc., minus the localization
  angle (these columns hold whole subtrees, not single `{ar, en}` pairs)
