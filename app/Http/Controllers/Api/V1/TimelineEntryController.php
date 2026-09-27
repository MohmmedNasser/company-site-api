<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TimelineEntryResource;
use App\Models\TimelineEntry;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TimelineEntryController extends Controller
{
    /**
     * GET /api/v1/timeline — repository.ts: getTimeline().
     */
    public function index(): AnonymousResourceCollection
    {
        return TimelineEntryResource::collection(TimelineEntry::query()->orderBy('order')->get());
    }
}
