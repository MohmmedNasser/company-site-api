<?php

use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\FaqItemController;
use App\Http\Controllers\Api\V1\NewsletterController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\ProcessStepController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\SiteSettingController;
use App\Http\Controllers\Api\V1\TeamMemberController;
use App\Http\Controllers\Api\V1\TestimonialController;
use App\Http\Controllers\Api\V1\TimelineEntryController;
use App\Http\Controllers\Api\V1\ValueItemController;
use Illuminate\Support\Facades\Route;

/*
| Public JSON API, consumed by the Next.js frontend. bootstrap/app.php
| mounts this file under /api and applies the "api" rate limiter; the
| version segment lives here so a v2 group can later sit beside v1
| without breaking v1 clients. The contract every route below honours
| is docs/api-contract.md.
*/

Route::prefix('v1')->group(function () {
    Route::get('services', [ServiceController::class, 'index']);
    Route::get('services/{service:slug}', [ServiceController::class, 'show']);

    Route::get('projects', [ProjectController::class, 'index']);
    Route::get('projects/{project:slug}', [ProjectController::class, 'show']);

    Route::get('testimonials', [TestimonialController::class, 'index']);
    Route::get('clients', [ClientController::class, 'index']);
    Route::get('process-steps', [ProcessStepController::class, 'index']);
    Route::get('faq-items', [FaqItemController::class, 'index']);

    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{post:slug}', [PostController::class, 'show']);

    Route::get('team-members', [TeamMemberController::class, 'index']);
    Route::get('values', [ValueItemController::class, 'index']);
    Route::get('timeline', [TimelineEntryController::class, 'index']);

    Route::get('settings', [SiteSettingController::class, 'show']);

    // Stricter limit on top of the group-wide "api" limiter (600/min for
    // reads, see AppServiceProvider): these are the only endpoints that
    // write to the database. Still IP-keyed — see design-decisions.md §10.
    Route::middleware('throttle:submissions')->group(function () {
        Route::post('contact', [ContactController::class, 'store']);
        Route::post('newsletter', [NewsletterController::class, 'store']);
    });
});
