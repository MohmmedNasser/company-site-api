<?php

namespace Tests\Feature\Admin;

use App\Models\ContactMessage;
use App\Models\NewsletterSubscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InboxTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_inbox_hides_archived_messages_and_counts_unread(): void
    {
        ContactMessage::factory()->count(2)->create();
        ContactMessage::factory()->create(['archived_at' => now()]);

        $this->get('/admin/messages')->assertInertia(fn (Assert $page) => $page
            ->component('admin/messages/index')
            ->has('messages', 2)
            ->where('unreadCount', 2));

        $this->get('/admin/messages?filter=archived')->assertInertia(fn (Assert $page) => $page
            ->has('messages', 1));
    }

    public function test_read_and_archive_toggle_both_ways(): void
    {
        $message = ContactMessage::factory()->create();

        $this->patch("/admin/messages/{$message->id}/read");
        $this->assertNotNull($message->refresh()->read_at);
        $this->patch("/admin/messages/{$message->id}/read");
        $this->assertNull($message->refresh()->read_at);

        $this->patch("/admin/messages/{$message->id}/archive");
        $this->assertNotNull($message->refresh()->archived_at);
        $this->patch("/admin/messages/{$message->id}/archive");
        $this->assertNull($message->refresh()->archived_at);
    }

    public function test_messages_can_be_deleted(): void
    {
        $message = ContactMessage::factory()->create();

        $this->delete("/admin/messages/{$message->id}")->assertRedirect();

        $this->assertNull($message->fresh());
    }

    public function test_message_export_is_excel_safe_csv(): void
    {
        ContactMessage::factory()->create([
            'name' => 'نور',
            'message' => '=HYPERLINK("http://evil.test")',
        ]);

        $response = $this->get('/admin/messages/export')->assertOk();
        $csv = $response->streamedContent();

        $this->assertStringStartsWith("\u{FEFF}Received,Name,Email", $csv);
        $this->assertStringContainsString('نور', $csv);
        // Formula neutralised with a leading apostrophe.
        $this->assertStringContainsString("\"'=HYPERLINK(\"\"http://evil.test\"\")\"", $csv);
    }

    public function test_subscribers_list_and_export(): void
    {
        NewsletterSubscription::factory()->count(3)->create();

        $this->get('/admin/subscribers')->assertInertia(fn (Assert $page) => $page
            ->component('admin/subscribers/index')
            ->has('subscribers', 3)
            ->where('pagination.total', 3));

        $csv = $this->get('/admin/subscribers/export')->assertOk()->streamedContent();
        $this->assertSame(4, substr_count(trim($csv), "\n") + 1);
    }

    public function test_subscribers_can_be_deleted_one_at_a_time(): void
    {
        $subscribers = NewsletterSubscription::factory()->count(2)->create();

        $this->delete("/admin/subscribers/{$subscribers[0]->id}")->assertRedirect();

        $this->assertNull($subscribers[0]->fresh());
        $this->assertNotNull($subscribers[1]->fresh());
    }
}
