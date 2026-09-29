<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqItemController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProcessStepController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\SubscriberController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TimelineEntryController;
use App\Http\Controllers\Admin\ValueItemController;
use Illuminate\Support\Facades\Route;

// This app is the admin panel only — the public site is the Next.js
// frontend. The root just forwards to the dashboard, and the auth
// middleware sends guests on to /login from there.
Route::redirect('/', '/dashboard')->name('home');

// Single-admin panel: being logged in IS the permission. No policies or
// roles — see docs/design-decisions.md §11.
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('settings', [SiteSettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SiteSettingController::class, 'update'])->name('settings.update');

        Route::get('messages', [ContactMessageController::class, 'index'])->name('messages.index');
        Route::get('messages/export', [ContactMessageController::class, 'export'])->name('messages.export');
        Route::patch('messages/{message}/read', [ContactMessageController::class, 'toggleRead'])->name('messages.read');
        Route::patch('messages/{message}/archive', [ContactMessageController::class, 'toggleArchive'])->name('messages.archive');
        Route::delete('messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');

        Route::get('subscribers', [SubscriberController::class, 'index'])->name('subscribers.index');
        Route::get('subscribers/export', [SubscriberController::class, 'export'])->name('subscribers.export');
        Route::delete('subscribers/{subscriber}', [SubscriberController::class, 'destroy'])->name('subscribers.destroy');

        // One controller per content type — see app/Http/Controllers/Admin.
        Route::prefix('services')->name('services.')->controller(ServiceController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{service}/edit', 'edit')->name('edit');
            Route::put('{service}', 'update')->name('update');
            Route::post('{service}/move', 'move')->name('move');
            Route::delete('{service}', 'destroy')->name('destroy');
        });

        Route::prefix('projects')->name('projects.')->controller(ProjectController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{project}/edit', 'edit')->name('edit');
            Route::put('{project}', 'update')->name('update');
            Route::post('{project}/move', 'move')->name('move');
            Route::delete('{project}', 'destroy')->name('destroy');
        });

        Route::prefix('testimonials')->name('testimonials.')->controller(TestimonialController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{testimonial}/edit', 'edit')->name('edit');
            Route::put('{testimonial}', 'update')->name('update');
            Route::post('{testimonial}/move', 'move')->name('move');
            Route::delete('{testimonial}', 'destroy')->name('destroy');
        });

        Route::prefix('clients')->name('clients.')->controller(ClientController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{client}/edit', 'edit')->name('edit');
            Route::put('{client}', 'update')->name('update');
            Route::post('{client}/move', 'move')->name('move');
            Route::delete('{client}', 'destroy')->name('destroy');
        });

        Route::prefix('process-steps')->name('process-steps.')->controller(ProcessStepController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{process_step}/edit', 'edit')->name('edit');
            Route::put('{process_step}', 'update')->name('update');
            Route::post('{process_step}/move', 'move')->name('move');
            Route::delete('{process_step}', 'destroy')->name('destroy');
        });

        Route::prefix('faq')->name('faq.')->controller(FaqItemController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{faq_item}/edit', 'edit')->name('edit');
            Route::put('{faq_item}', 'update')->name('update');
            Route::post('{faq_item}/move', 'move')->name('move');
            Route::delete('{faq_item}', 'destroy')->name('destroy');
        });

        Route::prefix('posts')->name('posts.')->controller(PostController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{post}/edit', 'edit')->name('edit');
            Route::put('{post}', 'update')->name('update');
            Route::post('{post}/move', 'move')->name('move');
            Route::delete('{post}', 'destroy')->name('destroy');
        });

        Route::prefix('team-members')->name('team-members.')->controller(TeamMemberController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{team_member}/edit', 'edit')->name('edit');
            Route::put('{team_member}', 'update')->name('update');
            Route::post('{team_member}/move', 'move')->name('move');
            Route::delete('{team_member}', 'destroy')->name('destroy');
        });

        Route::prefix('values')->name('values.')->controller(ValueItemController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{value_item}/edit', 'edit')->name('edit');
            Route::put('{value_item}', 'update')->name('update');
            Route::post('{value_item}/move', 'move')->name('move');
            Route::delete('{value_item}', 'destroy')->name('destroy');
        });

        Route::prefix('timeline')->name('timeline.')->controller(TimelineEntryController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('{timeline_entry}/edit', 'edit')->name('edit');
            Route::put('{timeline_entry}', 'update')->name('update');
            Route::post('{timeline_entry}/move', 'move')->name('move');
            Route::delete('{timeline_entry}', 'destroy')->name('destroy');
        });
    });
});

require __DIR__.'/settings.php';
