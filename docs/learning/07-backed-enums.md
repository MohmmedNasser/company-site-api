# PHP 8.1 backed enums for `Project.status` and `TimelineEntry.status`

## What is it?

`app/Enums/ProjectStatus.php:5-9` and `app/Enums/TimelineStatus.php:5-10`
are PHP 8.1 **backed enums** — a native language construct (not a Laravel
feature) where every case is tied to a scalar value:

```php
enum ProjectStatus: string
{
    case Shipped = 'shipped';
    case InDevelopment = 'in-development';
}
```

`app/Models/Project.php:23` wires it into Eloquent by naming the enum class
as the cast target — `'status' => ProjectStatus::class` — inside
`casts()`. With that cast in place, `$project->status` is never a raw
string at runtime; it's an instance of `ProjectStatus`, so
`$project->status->value` gets back `'shipped'` and `$project->status ===
ProjectStatus::Shipped` is a real, type-checked comparison. `TimelineEntry`
(`app/Models/TimelineEntry.php:20`) does the same with `TimelineStatus`.

## Why is it here, in this project specifically?

`docs/content-reference/types.ts:27` types `Project.status` as the union
`"shipped" | "in-development"` — TypeScript can enforce that no other
string is ever assigned. PHP has no union-of-string-literals type, so
without a backed enum, `projects.status` would just be a `string` column
and nothing would stop `Project::create(['status' => 'shiped'])` (a typo)
from silently succeeding. The migration
(`database/migrations/2026_08_18_100003_create_projects_table.php`, the
`$table->enum('status', ['shipped', 'in-development'])` line) already
constrains the *column* to those two values at the MySQL level; the PHP
enum plus Eloquent cast extends that same constraint into application
code, so a typo is caught by PHP's type system (a fatal `ValueError` from
`ProjectStatus::from('shiped')`) instead of surfacing as a silent database
rejection or, worse, a MySQL `enum` column silently coercing an unmatched
value to `''`.

## What was the alternative, and why was it rejected?

The alternative is a plain `string` column with no PHP-side cast — just
validating the value in a Form Request before every write, the way Phase
11's API layer will do anyway for HTTP input. That was rejected for
*internal* code paths (seeders, future admin CRUD, any service class) that
never go through a Form Request: nothing would stop
`TimelineSeeder::run()` from silently accepting a bad `status` value out of
`docs/content-reference/mock/timeline.json` if the JSON ever drifted from
the two-value contract. A backed enum makes that failure loud and
immediate — `TimelineStatus::from('shipped')` (a value that isn't one of
`done`/`in-progress`/`todo`) throws a `ValueError` at seed time, not a
mystery months later when something queries for a status that was quietly
mis-seeded.

## What breaks if it is removed?

Removing `'status' => ProjectStatus::class` from `Project::casts()`
(`Project.php:23`) while leaving the migration's `enum()` column in place
doesn't break seeding — `ProjectSeeder.php:22` passes the raw string
`$project['status']` either way — but it silently downgrades every
consumer of `$project->status` back to comparing raw strings, so a future
`if ($project->status === ProjectStatus::Shipped)` check in a controller or
Blade/Inertia view would always evaluate false (comparing a string to an
enum instance is never `===`-equal) without throwing any error at all —
the kind of bug that only surfaces as "the shipped filter shows nothing"
in manual testing, not as an exception.

## What to read next

- `06-json-localization-columns.md` — the `casts()` method these enum casts
  live alongside on the same models
- `08-settings-singleton.md` — the last new pattern from this phase, on a
  model with no enum or localized fields at all
