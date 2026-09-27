<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{
    /**
     * POST /api/v1/contact — repository.ts: submitContact(payload).
     * By the time this runs, ContactRequest has already validated the
     * payload (or returned a 422); validated() holds only the ContactPayload
     * fields, so extra keys in the request body are never stored.
     */
    public function store(ContactRequest $request): JsonResponse
    {
        ContactMessage::create($request->validated());

        // Body is ContactResult, wrapped in `data` like every other success.
        return response()->json(['data' => ['success' => true]], Response::HTTP_CREATED);
    }
}
