<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TestimonialController extends Controller
{
    /**
     * GET /api/v1/testimonials — repository.ts: getTestimonials().
     */
    public function index(): AnonymousResourceCollection
    {
        return TestimonialResource::collection(Testimonial::query()->orderBy('order')->get());
    }
}
