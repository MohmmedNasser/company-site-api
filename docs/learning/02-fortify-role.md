# Fortify's role: backend auth without a UI opinion

## What is it?

`laravel/fortify` (`composer.json:11`) is a headless auth backend — it
registers routes (`GET /login`, `POST /login`, `GET /register`, etc., see
the output of `php artisan route:list`), validates credentials, and calls
Laravel's `Auth` facade to log a session in or out. It ships **no views and
no frontend** of its own. `app/Providers/FortifyServiceProvider.php:49-74`
is where this app tells Fortify which Inertia page component to render for
each of those routes — e.g. line 51, `Fortify::loginView(fn ($request) =>
Inertia::render('auth/login', [...]))`, points the `/login` route at
`resources/js/pages/auth/login.tsx` instead of a Blade view.

## Why is it here, in this project specifically?

`docs/PROJECT-PLAN.md`'s Phase 12 explicitly names Fortify (via
`laravel/breeze`'s React+Inertia preset, later superseded by the official
`laravel/react-starter-kit`, which itself depends on Fortify) as the auth
backend for the Inertia admin panel — the same admin panel `routes/web.php`
protects with `Route::middleware(['auth', 'verified'])` around `dashboard`.
`config/fortify.php:145-149` is where this project turned specific pieces
on or off: `Features::registration()`, `Features::resetPasswords()`, and
`Features::emailVerification()` are enabled; `Features::twoFactorAuthentication()`
and `Features::passkeys()` — present in the stock starter kit's config —
were deleted outright (see `04-auth-simplification-decision.md`).

## What was the alternative, and why was it rejected?

The two realistic alternatives were (1) hand-writing an
`AuthenticatedSessionController` + `RegisteredUserController` from scratch,
and (2) Laravel Breeze's classic (non-Fortify) scaffolding, which generates
those controllers directly into `app/Http/Controllers/Auth/` for you to own
and edit. Both were rejected for the same reason: this project's Phase 12
goal is to learn the Inertia+React admin pattern, not to re-derive
password-hashing, rate-limiting, and email-verification-token logic that
Fortify already gets right (`app/Providers/FortifyServiceProvider.php:82-87`
configures the login rate limiter in four lines instead of hand-rolling
`RateLimiter::for()` wiring from scratch). Hand-written controllers would
also mean every future auth feature (password confirmation, email
verification) needs its own from-scratch controller and test, instead of a
`Features::` array entry.

## What breaks if it is removed?

Removing `laravel/fortify` from `composer.json:11` and
`FortifyServiceProvider::class` from `bootstrap/providers.php:8` would
delete every route Fortify registers — `/login`, `/register`,
`/forgot-password`, `/reset-password/{token}`, `/email/verify/{id}/{hash}`,
`/user/confirm-password` all disappear from `php artisan route:list`. The
`Login`, `Register`, etc. page components under `resources/js/pages/auth/`
would still exist as files but have nothing to `Route::inertia()` them or
handle their form submissions — visiting `/login` would 404, and
`app/Actions/Fortify/CreateNewUser.php` and `ResetUserPassword.php` (which
Fortify calls via `Fortify::createUsersUsing()` at
`FortifyServiceProvider.php:43`) would become dead code with no caller.

## What to read next

- `01-inertia-shared-props.md` — how the pages Fortify renders receive
  `auth.user` without each controller passing it explicitly
- `04-auth-simplification-decision.md` — which Fortify features this
  project turned off, and why
