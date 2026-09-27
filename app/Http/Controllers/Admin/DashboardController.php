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
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'content' => [
                ['slug' => 'services', 'label' => 'Services', 'count' => Service::query()->count()],
                ['slug' => 'projects', 'label' => 'Projects', 'count' => Project::query()->count()],
                ['slug' => 'testimonials', 'label' => 'Testimonials', 'count' => Testimonial::query()->count()],
                ['slug' => 'clients', 'label' => 'Clients', 'count' => Client::query()->count()],
                ['slug' => 'process-steps', 'label' => 'Process Steps', 'count' => ProcessStep::query()->count()],
                ['slug' => 'faq', 'label' => 'FAQ', 'count' => FaqItem::query()->count()],
                ['slug' => 'posts', 'label' => 'Posts', 'count' => Post::query()->count()],
                ['slug' => 'team-members', 'label' => 'Team Members', 'count' => TeamMember::query()->count()],
                ['slug' => 'values', 'label' => 'Values', 'count' => ValueItem::query()->count()],
                ['slug' => 'timeline', 'label' => 'Timeline', 'count' => TimelineEntry::query()->count()],
            ],
            'unreadMessages' => ContactMessage::query()->whereNull('read_at')->whereNull('archived_at')->count(),
            'subscribers' => NewsletterSubscription::query()->count(),
        ]);
    }
}
