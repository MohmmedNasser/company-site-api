<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    /**
     * Create the one admin account from config/admin.php. firstOrCreate
     * keyed on email makes re-seeding safe: an existing admin keeps the
     * password they already changed it to.
     */
    public function run(): void
    {
        $config = config('admin');

        if ($config['password'] === 'password' && ! app()->environment('local', 'testing')) {
            throw new RuntimeException('Set ADMIN_PASSWORD in .env before seeding the admin outside local development.');
        }

        User::query()->firstOrCreate(
            ['email' => $config['email']],
            [
                'name' => $config['name'],
                'password' => $config['password'],
                // Seeded, not self-registered: the address is ours, and the
                // admin routes require a verified email.
                'email_verified_at' => Date::now(),
            ],
        );
    }
}
