<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\NewsletterRequest;
use App\Models\NewsletterSubscription;
use Illuminate\Http\JsonResponse;

class NewsletterController extends Controller
{
    /**
     * POST /api/v1/newsletter — repository.ts: subscribeNewsletter(payload).
     *
     * Idempotent: subscribing an address that is already on the list
     * succeeds with the same 200 response. A "unique" validation rule
     * would instead answer "already subscribed", letting anyone probe
     * whether a given address is on the list. createOrFirst (not
     * firstOrCreate) also survives two identical requests racing each
     * other: the losing INSERT hits the unique index and falls back to a
     * SELECT instead of surfacing a 500.
     */
    public function store(NewsletterRequest $request): JsonResponse
    {
        NewsletterSubscription::createOrFirst(['email' => $request->validated('email')]);

        // Body is NewsletterResult, wrapped in `data` like every other success.
        return response()->json(['data' => ['success' => true]]);
    }
}
