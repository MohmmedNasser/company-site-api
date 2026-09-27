<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProcessStepResource;
use App\Models\ProcessStep;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProcessStepController extends Controller
{
    /**
     * GET /api/v1/process-steps — repository.ts: getProcessSteps().
     */
    public function index(): AnonymousResourceCollection
    {
        return ProcessStepResource::collection(ProcessStep::query()->orderBy('order')->get());
    }
}
