<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    /**
     * GET /api/v1/services — repository.ts: getServices().
     */
    public function index(): AnonymousResourceCollection
    {
        return ServiceResource::collection(Service::query()->orderBy('order')->get());
    }

    /**
     * GET /api/v1/services/{slug} — repository.ts: getService(slug).
     * The route binds {service:slug}, so an unknown slug never reaches
     * this method: it becomes a 404 in the uniform error envelope, which
     * the Phase 14 API repository maps to `null`.
     */
    public function show(Service $service): ServiceResource
    {
        return new ServiceResource($service);
    }
}
