<?php

return [

    /*
    |--------------------------------------------------------------------------
    | The single admin account
    |--------------------------------------------------------------------------
    |
    | Read by AdminUserSeeder — registration is disabled, so seeding is the
    | only way the account comes to exist. The seeder refuses to run with
    | the default password outside local/testing. Change the password from
    | Settings → Security right after the first login.
    |
    */

    'name' => env('ADMIN_NAME', 'Admin'),

    'email' => env('ADMIN_EMAIL', 'admin@example.com'),

    'password' => env('ADMIN_PASSWORD', 'password'),

];
