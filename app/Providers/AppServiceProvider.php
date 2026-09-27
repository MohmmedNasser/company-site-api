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
     * Named limiters referenced by the throttle middleware. Both are keyed
     * by client IP — see docs/design-decisions.md §10 for why that key has
     * to change once requests arrive through Next.js at Phase 14.
     */
    private function configureRateLimiting(): void
    {
        // Every /api/* route (attached via throttleApi() in bootstrap/app.php).
        RateLimiter::for('api', fn (Request $request) => Limit::perMinute(120)->by($request->ip()));

        // The two abuse-prone write endpoints, stacked on top of "api". The
        // path is part of the key so contact and newsletter each get their
        // own budget instead of sharing one.
        RateLimiter::for('submissions', fn (Request $request) => Limit::perMinute(5)
            ->by($request->path().'|'.$request->ip()));
    }
}
