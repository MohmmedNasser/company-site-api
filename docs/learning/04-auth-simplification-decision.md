# Why Two-Factor Auth and Passkeys were removed, not just disabled

## What is it?

The official `laravel/react-starter-kit` ships with five optional Fortify
auth features, toggled by an interactive installer prompt: registration,
email verification, two-factor authentication (2FA), passkeys (WebAuthn),
and password confirmation. This project kept three
(`config/fortify.php:145-149` — `Features::registration()`,
`Features::resetPasswords()`, `Features::emailVerification()`) and removed
two entirely: 2FA and passkeys. "Removed entirely" is the operative phrase —
this wasn't a matter of leaving `Features::twoFactorAuthentication()`
commented out in the array. Every file the feature touched was deleted or
edited:

- `app/Models/User.php` no longer implements `PasskeyUser` or uses
  `PasskeyAuthenticatable`/`TwoFactorAuthenticatable`
- `database/factories/UserFactory.php` no longer sets `two_factor_secret`
  etc., or has a `withTwoFactor()` state
- `app/Http/Requests/Settings/TwoFactorAuthenticationRequest.php`,
  `resources/js/components/manage-two-factor.tsx`,
  `manage-passkeys.tsx`, `passkey-verify.tsx`, `passkey-register.tsx`,
  `passkey-item.tsx`, `two-factor-setup-modal.tsx`,
  `two-factor-recovery-codes.tsx`, `resources/js/hooks/use-two-factor-auth.ts`,
  and `resources/js/pages/auth/two-factor-challenge.tsx` were never copied
  into this repo at all
- `routes/settings.php` has no `/.well-known/passkey-endpoints` route (the
  stock starter kit registers one at the bottom of that file — compare
  against `php artisan route:list`'s 29 routes, none of which are
  passkey- or two-factor-related)
- The two migrations that would have added `two_factor_secret`,
  `two_factor_recovery_codes`, `two_factor_confirmed_at` to `users`, and a
  standalone `passkeys` table, were never brought into
  `database/migrations/` — the `users` table here has exactly the four
  columns the base Laravel skeleton ships (see
  `database/migrations/0001_01_01_000000_create_users_table.php`)

## Why is it here, in this project specifically?

`docs/PROJECT-PLAN.md` describes the Inertia admin (Phase 12-13) as a
small internal tool with "roles and policies: admin / editor" — a handful
of known people, not a public-facing product with a broad, untrusted user
base. 2FA and WebAuthn passkeys exist to defend against credential-stuffing
and phishing at scale; that threat model doesn't apply the same way to a
single-agency admin panel with a handful of accounts the site owner
personally provisions. Carrying the code anyway — even "disabled" — means
every future reader of `User.php` has to understand `PasskeyAuthenticatable`
and `TwoFactorAuthenticatable` to know they're inert, every `security.tsx`
change has to route around dead `<ManageTwoFactor>`/`<ManagePasskeys>`
JSX, and every dependency-audit tool flags `web-auth/webauthn-lib` and
`pragmarx/google2fa` (both pulled in transitively by `laravel/fortify`
regardless of feature flags — see below) as attack surface for a feature
nobody can reach.

## What was the alternative, and why was it rejected?

The alternative — matching the original request literally — was leaving
the `Features::twoFactorAuthentication([...])` and `Features::passkeys([...])`
entries in `config/fortify.php`'s array but commented out, and leaving the
React components in `resources/js/components/` unreferenced. This was
explicitly rejected (per the task instruction: "do not keep them disabled
but present, strip them out cleanly"), and rejecting it is the more
defensible engineering choice independent of that instruction: a commented
config line and an orphaned component file both silently rot — nothing
breaks when someone edits `User.php` in a way that would have broken 2FA,
because nothing exercises that path, so the breakage is invisible until
someone re-enables the feature months later against a codebase that has
quietly drifted incompatible with it.

## What breaks if it is removed?

This section is unusual for this decision: nothing breaks by 2FA/passkeys
being absent — `php artisan route:list` shows all 29 remaining routes
resolve cleanly, `tsc --noEmit` and `eslint .` both pass against the
stripped component tree (no dangling imports), and `php artisan migrate`
would build the exact `users` table shape Fortify's registration/login
flow expects. The one thing worth flagging as a *non-removal*: `laravel/fortify`
hard-requires `laravel/passkeys` in its own `composer.json` (`"require":
{"laravel/passkeys": "^0.2.0", ...}`, not `"suggest"`), so that PHP package
still sits in `vendor/laravel/passkeys/` and its service provider is
auto-registered (visible in `bootstrap/cache/packages.php`, a build
artifact `composer install` regenerates, not a hand-edited file). It can't
be excluded without dropping Fortify entirely — but nothing in `app/`,
`routes/`, or `resources/js/` calls into it, so it's inert vendor weight,
not reachable application code. If a future phase needs to re-add 2FA or
passkeys, the cleanest path is re-running the starter kit's installer
against a scratch directory again (as this task did) and re-merging, not
un-commenting old markers, since the stock template's version will have
moved on by then anyway.

## What to read next

- `02-fortify-role.md` — what Fortify's feature-flag array
  (`config/fortify.php`) actually controls
- `docs/design-decisions.md` §8 — the same decision recorded from the
  design-system side, including the `HandleInertiaRequests` shared-props
  gap this task also surfaced
