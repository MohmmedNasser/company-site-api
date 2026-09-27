<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ContactMessage;
use App\Models\FaqItem;
use App\Models\NewsletterSubscription;
use App\Models\Post;
use App\Models\ProcessStep;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TimelineEntry;
use App\Models\ValueItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * slug => [Model class, dashboard label].
     *
     * @var array<string, array{0: class-string, 1: string}>
     */
    private const CONTENT_TYPES = [
        'services' => [Service::class, 'Services'],
        'projects' => [Project::class, 'Projects'],
        'testimonials' => [Testimonial::class, 'Testimonials'],
        'clients' => [Client::class, 'Clients'],
        'process-steps' => [ProcessStep::class, 'Process Steps'],
        'faq' => [FaqItem::class, 'FAQ'],
        'posts' => [Post::class, 'Posts'],
        'team-members' => [TeamMember::class, 'Team Members'],
        'values' => [ValueItem::class, 'Values'],
        'timeline' => [TimelineEntry::class, 'Timeline'],
    ];

    public function __invoke(): Response
    {
        $counts = $this->contentCounts();

        return Inertia::render('dashboard', [
            'content' => collect(self::CONTENT_TYPES)
                ->map(fn (array $type, string $slug) => [
                    'slug' => $slug,
                    'label' => $type[1],
                    'count' => $counts[$slug] ?? 0,
                ])
                ->values(),
            'unreadMessages' => ContactMessage::query()->whereNull('read_at')->whereNull('archived_at')->count(),
            'subscribers' => NewsletterSubscription::query()->count(),
        ]);
    }

    /**
     * The dashboard is the page every admin visit starts on, so its ten
     * content-type counts are fetched as one UNION ALL query instead of
     * ten separate COUNT(*) round trips.
     *
     * @return array<string, int>
     */
    private function contentCounts(): array
    {
        $query = null;

        foreach (self::CONTENT_TYPES as $slug => [$model]) {
            $table = (new $model)->getTable();
            $count = DB::table($table)->selectRaw('? as slug, count(*) as total', [$slug]);
            $query = $query === null ? $count : $query->unionAll($count);
        }

        return $query->pluck('total', 'slug')->all();
    }
}
