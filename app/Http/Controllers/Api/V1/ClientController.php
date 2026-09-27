<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ClientResource;
use App\Models\Client;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClientController extends Controller
{
    /**
     * GET /api/v1/clients — repository.ts: getClients().
     */
    public function index(): AnonymousResourceCollection
    {
        return ClientResource::collection(Client::query()->orderBy('order')->get());
    }
}
