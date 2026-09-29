<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    /**
     * Named limiters referenced by the throttle middleware. All are keyed
     * by client IP. That is a known limitation: once traffic arrives
     * through a shared origin (Vercel's edge, or the Next.js server as the
     * only caller) every visitor shares one IP, so these limits will need
     * revisiting again with real production traffic — see
     * docs/design-decisions.md §10.
     */
    private function configureRateLimiting(): void
    {
        // Every /api/* route (attached via throttleApi() in bootstrap/app.php).
        // Reads are cheap, public and side-effect free, and one Next.js
        // build fans out ~350 of them from a single IP in a few seconds, so
        // they get 600/min. Anything else keeps the old 120/min. The key
        // carries the bucket name because Laravel derives the counter from
        // limiter name + key: without it reads and writes would share one
        // counter under two different ceilings.
        RateLimiter::for('api', fn (Request $request) => $request->isMethodSafe()
            ? Limit::perMinute(600)->by('read|'.$request->ip())
            : Limit::perMinute(120)->by('write|'.$request->ip()));

        // The two abuse-prone write endpoints, stacked on top of "api". The
        // path is part of the key so contact and newsletter each get their
        // own budget instead of sharing one.
        RateLimiter::for('submissions', fn (Request $request) => Limit::perMinute(5)
            ->by($request->path().'|'.$request->ip()));
    }
}
