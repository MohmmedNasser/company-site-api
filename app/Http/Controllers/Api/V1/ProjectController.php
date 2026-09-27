<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    /**
     * GET /api/v1/projects?category= — repository.ts: getProjects(filter).
     *
     * Not paginated: ProjectFilter has no page field, and every frontend
     * caller (portfolio grid, sitemap, generateStaticParams) needs the
     * whole set — the /portfolio category filter runs client-side over it.
     * An unknown category returns an empty list, same as the mock.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'category' => ['sometimes', 'string', 'max:255'],
        ]);

        $projects = Project::query()
            ->when(
                $validated['category'] ?? null,
                fn ($query, string $category) => $query->where('category_id', $category),
            )
            ->orderBy('order')
            ->get();

        return ProjectResource::collection($projects);
    }

    /**
     * GET /api/v1/projects/{slug} — repository.ts: getProject(slug).
     */
    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }
}
