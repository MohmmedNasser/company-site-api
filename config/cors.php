<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Published from the framework default, which allows every origin ("*").
    | The public JSON API is only meant to be called by the Next.js frontend,
    | so origins are an explicit allow-list — never a wildcard.
    |
    | Only browser requests are subject to CORS. Next.js Server Components
    | and Server Actions call this API server-to-server, where CORS does not
    | apply; this list matters for any request the browser makes directly.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // No 'sanctum/csrf-cookie': Sanctum is not installed, and the admin
    // panel is same-origin Inertia, which never needs CORS.
    'paths' => ['api/*'],

    // The API surface is read-only GETs plus the two form POSTs.
    'allowed_methods' => ['GET', 'POST'],

    // Frontend dev server only. The production frontend origin is added
    // here at Phase 14 (integration), not before — see
    // docs/design-decisions.md §10.
    'allowed_origins' => [
        'http://localhost:3000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Accept', 'Content-Type'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
