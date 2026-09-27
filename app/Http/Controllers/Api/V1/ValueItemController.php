<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ValueItemResource;
use App\Models\ValueItem;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ValueItemController extends Controller
{
    /**
     * GET /api/v1/values — repository.ts: getValues().
     */
    public function index(): AnonymousResourceCollection
    {
        return ValueItemResource::collection(ValueItem::query()->orderBy('order')->get());
    }
}
