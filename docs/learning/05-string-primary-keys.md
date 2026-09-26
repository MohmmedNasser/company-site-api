# String, non-incrementing primary keys on every content model

## What is it?

Every content model — `app/Models/Service.php:14-16`, and the same two
lines repeated on `Client`, `Project`, `Testimonial`, `ProcessStep`,
`FaqItem`, `Post`, `TeamMember`, `ValueItem`, `TimelineEntry` — sets:

```php
public $incrementing = false;

protected $keyType = 'string';
```

paired with a migration column of `$table->string('id')->primary()`
(`database/migrations/2026_08_18_100002_create_services_table.php:15`)
instead of Laravel's default `$table->id()` (an `AUTO_INCREMENT BIGINT`).
The `id` column holds a hand-picked slug-like string —
`"svc-backend-laravel"`, `"client-basma-retail"`, `"milestone-founded"` —
copied verbatim from `docs/content-reference/mock/*.json`, not a database-
generated number.

## Why is it here, in this project specifically?

The frontend mock data at `docs/content-reference/types.ts` already defines
`id: string` on every content interface, and every cross-reference in that
data — `Project.client`, `Testimonial.clientId` — points at those same
string IDs, not at a numeric row number. `ProjectSeeder`
(`database/seeders/ProjectSeeder.php:24`) inserts `client_id` directly from
the mock JSON's `"client": "client-ferry-logistics"` field with no lookup
step. If `clients.id` were an auto-increment integer instead, every seeder
that references a client would need a name-to-ID lookup table, and the
future Phase 11 API Resource layer would need to translate between "the
frontend's ID" and "the database's ID" on every response — an ID-remapping
step this project's data contract has no reason to carry, since PROJECT-
PLAN.md's whole content-repository design (`docs/PROJECT-PLAN.md` §0.3)
depends on the mock and future API implementations being interchangeable
behind one interface.

## What was the alternative, and why was it rejected?

The alternative is Laravel's default: `$table->id()` for an auto-increment
primary key, plus a separate `slug` column for the string identifier
already needed on some models (`services.slug`, `projects.slug`,
`posts.slug`). That's the more common Laravel pattern, and it was rejected
specifically because this project doesn't have one string identifier per
model — some rows need a URL slug (services, projects, posts) and *all* of
them need a stable content-repository ID that must equal the frontend's
`id`. Keeping both would mean two competing "identity" columns per table,
with the seeders having to keep them in sync and every relationship
(`Project::client()`) still resolving against whichever one is the real
foreign key. Making the frontend's `id` the actual database primary key
collapses that back to one column that means one thing.

## What breaks if it is removed?

Switching any content model back to `$table->id()` without also rewriting
every seeder and every foreign key breaks two things immediately.
`ProjectSeeder` and `TestimonialSeeder` would fail on
`'client_id' => $project['client']` — that value is a string like
`"client-ferry-logistics"`, and it would no longer match any row in a
`clients` table whose real primary key is now `1, 2, 3…`, so the foreign
key constraint added in
`database/migrations/2026_08_18_100003_create_projects_table.php` would
reject every insert. Second, and further out: Phase 11's API Resources
would have to expose a *different* ID than the one every mock consumer
already expects, which breaks the "the DB id IS the API id" property this
decision exists to guarantee, and every frontend integration test written
against the mock IDs would need rewriting to match whatever numbers MySQL
happened to assign on that particular seed run.

## What to read next

- `06-json-localization-columns.md` — the other JSON-shaped decision every
  one of these same models makes, right next to the primary key
- `08-settings-singleton.md` — the one table in this phase that deliberately
  does **not** follow this pattern, and why
