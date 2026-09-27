<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Support\Csv;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * The contact inbox. Messages arrive only through POST /api/v1/contact;
 * the admin never edits one, only changes its read/archived state.
 */
class ContactMessageController extends Controller
{
    private const FILTERS = ['inbox', 'archived', 'all'];

    public function index(Request $request): Response
    {
        $filter = in_array($request->query('filter'), self::FILTERS, true) ? $request->query('filter') : 'inbox';

        $messages = ContactMessage::query()
            ->when($filter === 'inbox', fn ($query) => $query->whereNull('archived_at'))
            ->when($filter === 'archived', fn ($query) => $query->whereNotNull('archived_at'))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/messages/index', [
            'messages' => collect($messages->items())->map(fn (ContactMessage $message) => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'service' => $message->service,
                'budget' => $message->budget,
                'message' => $message->message,
                'read' => $message->read_at !== null,
                'archived' => $message->archived_at !== null,
                'createdAt' => $message->created_at->toIso8601String(),
            ]),
            'pagination' => [
                'currentPage' => $messages->currentPage(),
                'lastPage' => $messages->lastPage(),
                'total' => $messages->total(),
                'prevUrl' => $messages->previousPageUrl(),
                'nextUrl' => $messages->nextPageUrl(),
            ],
            'filter' => $filter,
            'unreadCount' => ContactMessage::query()->whereNull('read_at')->whereNull('archived_at')->count(),
        ]);
    }

    public function toggleRead(ContactMessage $message): RedirectResponse
    {
        $message->read_at = $message->read_at === null ? Date::now() : null;
        $message->save();

        return back();
    }

    public function toggleArchive(ContactMessage $message): RedirectResponse
    {
        $archiving = $message->archived_at === null;
        $message->archived_at = $archiving ? Date::now() : null;
        $message->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => $archiving ? 'Message archived.' : 'Message moved to inbox.']);

        return back();
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Message deleted.']);

        return back();
    }

    public function export(): StreamedResponse
    {
        $rows = ContactMessage::query()->latest()->lazy()->map(fn (ContactMessage $message) => [
            $message->created_at->toDateTimeString(),
            $message->name,
            $message->email,
            $message->service,
            $message->budget,
            $message->message,
            $message->read_at !== null ? 'yes' : 'no',
            $message->archived_at !== null ? 'yes' : 'no',
        ]);

        return Csv::download(
            'contact-messages-'.Date::now()->format('Y-m-d').'.csv',
            ['Received', 'Name', 'Email', 'Service', 'Budget', 'Message', 'Read', 'Archived'],
            $rows,
        );
    }
}
