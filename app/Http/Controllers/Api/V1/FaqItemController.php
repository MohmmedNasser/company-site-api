<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\FaqItemResource;
use App\Models\FaqItem;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FaqItemController extends Controller
{
    /**
     * GET /api/v1/faq-items — repository.ts: getFaqItems().
     */
    public function index(): AnonymousResourceCollection
    {
        return FaqItemResource::collection(FaqItem::query()->orderBy('order')->get());
    }
}
