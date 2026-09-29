<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;
use App\Support\Csv;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SubscriberController extends Controller
{
    public function index(): Response
    {
        $subscribers = NewsletterSubscription::query()->latest()->paginate(50);

        return Inertia::render('admin/subscribers/index', [
            'subscribers' => collect($subscribers->items())->map(fn (NewsletterSubscription $subscriber) => [
                'id' => $subscriber->id,
                'email' => $subscriber->email,
                'createdAt' => $subscriber->created_at->toIso8601String(),
            ]),
            'pagination' => [
                'currentPage' => $subscribers->currentPage(),
                'lastPage' => $subscribers->lastPage(),
                'total' => $subscribers->total(),
                'prevUrl' => $subscribers->previousPageUrl(),
                'nextUrl' => $subscribers->nextPageUrl(),
            ],
        ]);
    }

    public function destroy(NewsletterSubscription $subscriber): RedirectResponse
    {
        $subscriber->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Subscriber deleted.']);

        return back();
    }

    public function export(): StreamedResponse
    {
        $rows = NewsletterSubscription::query()->latest()->lazy()->map(fn (NewsletterSubscription $subscriber) => [
            $subscriber->email,
            $subscriber->created_at->toDateTimeString(),
        ]);

        return Csv::download(
            'newsletter-subscribers-'.Date::now()->format('Y-m-d').'.csv',
            ['Email', 'Subscribed'],
            $rows,
        );
    }
}
