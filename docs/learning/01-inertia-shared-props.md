# Inertia's shared-props pattern

## What is it?

`app/Http/Middleware/HandleInertiaRequests.php:36-46` is a `share()` method
that runs on every request and returns an array merged into the `props` of
every Inertia page response, on top of whatever props the controller itself
passes to `Inertia::render()`. Right now it shares three things:
`name` (the app name), `auth.user` (the logged-in user or `null`), and
`sidebarOpen` (a cookie-derived UI flag for the admin sidebar's collapsed
state).

## Why is it here, in this project specifically?

Every page component under `resources/js/pages/` — `welcome.tsx`,
`dashboard.tsx`, the `auth/*` and `settings/*` pages — needs to know who's
logged in to render a nav bar, a "Log in" vs "Dashboard" link
(`resources/js/pages/welcome.tsx:16-24`), or a settings sidebar. Without a
shared-props mechanism, every single controller (`ProfileController`,
`SecurityController`, Fortify's own login/register controllers) would have
to remember to pass `'auth' => ['user' => $request->user()]` by hand on
every `Inertia::render()` call. `HandleInertiaRequests` is registered once
in `bootstrap/app.php:20-24` as global `web` middleware, so it runs before
every controller and the merge happens automatically — no controller in
this codebase references `auth.user` explicitly, yet every page component
receives it.

## What was the alternative, and why was it rejected?

The alternative is what a plain (non-Inertia) Laravel app already does:
pass `$user` into every `view()` call, or rely on Blade's global `auth()`
helper inside templates. That doesn't work here because Inertia page
components are React, not Blade — there's no `auth()` helper available
client-side, and the whole point of Inertia (per `docs/PROJECT-PLAN.md`
§0.2/§12) is that the React admin never talks to a JSON API of its own. The
props have to arrive as data, and shared props are Inertia's mechanism for
"data every page needs" without prop-drilling it through every controller.

## What breaks if it is removed?

If `HandleInertiaRequests::class` were removed from `bootstrap/app.php:22`,
`Inertia::render()` calls made by Fortify's own controllers (login,
register — see `02-fortify-role.md`) would no longer inject `errors` either,
since the base `Inertia\Middleware::share()` (which our `share()` method
calls via `...parent::share($request)` at line 39) is what resolves
validation errors onto every page. More directly: `usePage().props.auth`
would be `undefined` in every component that reads it —
`resources/js/pages/welcome.tsx:5`, `resources/js/components/nav-user.tsx`,
`resources/js/components/app-header.tsx` — so the header would never know a
user is logged in, always rendering the logged-out nav.

## What to read next

- `02-fortify-role.md` — the package whose controllers call
  `Inertia::render()` with these shared props already merged in
- `04-auth-simplification-decision.md` — why the shared-props payload here
  is smaller than the stock starter kit's (no 2FA/passkey user fields)
