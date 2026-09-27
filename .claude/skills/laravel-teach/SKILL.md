---
name: laravel-teach
description: Use whenever creating or modifying any file in the company-site-api (Laravel) repository — migrations, models, controllers, routes, middleware, config, Inertia pages, anything. This project's second goal is learning Laravel; this skill makes sure every non-trivial change is explained in the chat response. It does NOT write any file.
---

## The rule

When you create or meaningfully modify a Laravel file, explain it **in your
chat response** — not in a committed file. `docs/learning/` is closed: notes
01–08 stay as a historical record, and no new note is written unless the
developer explicitly asks for one.

"Meaningfully modified" means a new concept or a non-obvious choice, not a
typo fix or a rename.

## What each explanation answers

For every non-trivial Laravel artifact in the change, answer these four
questions, briefly:

1. **What is it?** — one or two concrete sentences, not a paraphrase of the
   Laravel docs.
2. **Why is it here?** — tied to this project and the actual file/line
   (`app/Http/Controllers/Admin/ContentController.php:42`), not "Laravel apps
   typically use this."
3. **What was the alternative, and why was it rejected?** — every
   non-trivial choice has one (Form Request vs. inline validation, Policy
   vs. plain `auth` middleware, disk path vs. absolute URL, etc.).
4. **What breaks if it is removed?** — a concrete failure ("guests could
   reach `/admin/services`"), not "it wouldn't work."

Group related artifacts under one explanation rather than repeating the four
questions per file; a change of fifteen files may need five explanations.

## Audience calibration

The reader knows PHP and JavaScript well and knows nothing about Laravel
conventions. Do not explain what a class, an interface, or a closure is. Do
explain what the service container is doing, what a facade resolves to at
runtime, what Artisan does under the hood, how route-model binding finds a
record, why a migration exists instead of hand-editing the database — the
framework-specific "why", not general programming.

## Language

The explanation is written in English, like every other doc, comment, and
commit in this repository.

## Right / wrong

❌ Wrong — generic, no file reference, restates the docs:

> Form Requests are classes that encapsulate validation logic.

✅ Right — specific to this change, points at the file, covers the four
questions:

> `app/Http/Requests/Admin/ContentRequest.php` is a Form Request: Laravel
> resolves it from the container before the controller method runs and
> validates the request, redirecting back with errors on failure. It's here
> because one controller serves every content type, so the rules have to
> come from the resolved definition (its `rules()` method) rather than being
> hard-coded. The alternative was `$request->validate()` inline in each
> controller action — rejected because store and update would duplicate it.
> Remove it and the controller receives unvalidated input: `title.ar` could
> be missing and the JSON column would save without it.
