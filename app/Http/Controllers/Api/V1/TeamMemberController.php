<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TeamMemberController extends Controller
{
    /**
     * GET /api/v1/team-members — repository.ts: getTeamMembers().
     */
    public function index(): AnonymousResourceCollection
    {
        return TeamMemberResource::collection(TeamMember::query()->orderBy('order')->get());
    }
}
