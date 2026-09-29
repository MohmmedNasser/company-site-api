<?php

namespace Tests\Feature\Admin;

use App\Models\NewsletterSubscription;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\DataProvider;
use RuntimeException;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_routes_do_not_exist(): void
    {
        $this->get('/register')->assertNotFound();
        $this->post('/register', [
            'name' => 'Intruder',
            'email' => 'intruder@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertNotFound();

        $this->assertSame(0, User::count());
    }

    public function test_seeder_creates_exactly_one_verified_admin_and_is_idempotent(): void
    {
        $this->seed(AdminUserSeeder::class);
        $this->seed(AdminUserSeeder::class);

        $admin = User::sole();
        $this->assertSame(config('admin.email'), $admin->email);
        $this->assertNotNull($admin->email_verified_at);
        $this->assertTrue(Hash::check(config('admin.password'), $admin->password));
    }

    public function test_seeder_refuses_the_default_password_outside_local(): void
    {
        $this->app['env'] = 'production';

        $this->expectException(RuntimeException::class);

        // Run directly: `db:seed` would stop at its own "in production?"
        // confirmation prompt before reaching the seeder's guard.
        (new AdminUserSeeder)->run();
    }

    public function test_seeded_admin_can_log_in_and_reach_the_dashboard(): void
    {
        $this->seed(AdminUserSeeder::class);

        $this->post('/login', [
            'email' => config('admin.email'),
            'password' => config('admin.password'),
        ])->assertRedirect('/dashboard');

        $this->assertAuthenticated();
        $this->get('/dashboard')->assertOk();
    }

    public function test_the_root_url_forwards_to_the_dashboard(): void
    {
        $this->get('/')->assertRedirect('/dashboard');
    }

    /**
     * @return array<string, array{string}>
     */
    public static function adminUrls(): array
    {
        return [
            'dashboard' => ['/dashboard'],
            'content index' => ['/admin/services'],
            'content create' => ['/admin/projects/create'],
            'settings' => ['/admin/settings'],
            'messages' => ['/admin/messages'],
            'messages export' => ['/admin/messages/export'],
            'subscribers' => ['/admin/subscribers'],
        ];
    }

    #[DataProvider('adminUrls')]
    public function test_guests_are_sent_to_login(string $url): void
    {
        $this->get($url)->assertRedirect('/login');
    }

    public function test_guests_cannot_delete_subscribers(): void
    {
        $subscriber = NewsletterSubscription::factory()->create();

        $this->delete("/admin/subscribers/{$subscriber->id}")->assertRedirect('/login');

        $this->assertNotNull($subscriber->fresh());
    }

    public function test_the_admin_account_cannot_delete_itself(): void
    {
        $this->seed(AdminUserSeeder::class);

        // Only GET and PATCH remain on this URI; with registration off, a
        // deleted sole admin would lock everyone out.
        $this->actingAs(User::sole())
            ->delete('/settings/profile')
            ->assertMethodNotAllowed();

        $this->assertSame(1, User::count());
    }
}
