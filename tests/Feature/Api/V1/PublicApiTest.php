<?php

namespace Tests\Feature\Api\V1;

use App\Mail\NewContactMessageReceived;
use App\Models\ContactMessage;
use App\Models\NewsletterSubscription;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use PHPUnit\Framework\Attributes\DataProvider;
use RuntimeException;
use Tests\TestCase;

/**
 * Guards docs/api-contract.md. The strongest check available is deep
 * equality with the frontend's mock JSON: those files are typed against
 * types.ts and are what the site renders today, so a response equal to
 * them has the right keys, the right value types, and the full {ar, en}
 * localized objects — a renamed key fails here instead of reaching the
 * frontend as a silent `undefined`.
 */
class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    /**
     * @return list<array<string, mixed>>
     */
    private static function mockContent(string $file): array
    {
        $items = json_decode(File::get(base_path("docs/content-reference/mock/{$file}")), true);

        usort($items, fn (array $a, array $b) => $a['order'] <=> $b['order']);

        return $items;
    }

    /**
     * Strict (===) comparison that ignores object key order only: JSON
     * objects are unordered, and the mock files list keys in a different
     * order than types.ts does.
     */
    private function assertJsonSame(mixed $expected, mixed $actual): void
    {
        $this->assertSame(self::canonical($expected), self::canonical($actual));
    }

    private static function canonical(mixed $value): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        if (! array_is_list($value)) {
            ksort($value);
        }

        return array_map(self::canonical(...), $value);
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function listEndpoints(): array
    {
        return [
            'services' => ['/api/v1/services', 'services.json'],
            'projects' => ['/api/v1/projects', 'projects.json'],
            'testimonials' => ['/api/v1/testimonials', 'testimonials.json'],
            'clients' => ['/api/v1/clients', 'clients.json'],
            'process steps' => ['/api/v1/process-steps', 'process-steps.json'],
            'faq items' => ['/api/v1/faq-items', 'faq.json'],
            'team members' => ['/api/v1/team-members', 'team.json'],
            'values' => ['/api/v1/values', 'values.json'],
            'timeline' => ['/api/v1/timeline', 'timeline.json'],
        ];
    }

    #[DataProvider('listEndpoints')]
    public function test_list_endpoint_matches_the_mock_content_exactly(string $uri, string $file): void
    {
        $this->assertJsonSame(['data' => self::mockContent($file)], $this->getJson($uri)->assertOk()->json());
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function slugEndpoints(): array
    {
        return [
            'service' => ['/api/v1/services', 'services.json'],
            'project' => ['/api/v1/projects', 'projects.json'],
            'post' => ['/api/v1/posts', 'posts.json'],
        ];
    }

    #[DataProvider('slugEndpoints')]
    public function test_show_endpoint_returns_the_record_and_404s_on_an_unknown_slug(string $uri, string $file): void
    {
        $record = self::mockContent($file)[0];

        $this->assertJsonSame(['data' => $record], $this->getJson("{$uri}/{$record['slug']}")->assertOk()->json());

        $this->getJson("{$uri}/does-not-exist")
            ->assertNotFound()
            ->assertExactJson(['error' => ['status' => 404, 'code' => 'not_found', 'message' => 'Not Found']]);
    }

    public function test_projects_filter_by_category(): void
    {
        $expected = array_values(array_filter(
            self::mockContent('projects.json'),
            fn (array $project) => $project['category'] === 'mobile',
        ));

        $this->assertJsonSame(['data' => $expected], $this->getJson('/api/v1/projects?category=mobile')->assertOk()->json());
        $this->getJson('/api/v1/projects?category=unknown')->assertOk()->assertExactJson(['data' => []]);
    }

    public function test_posts_are_paginated_with_camel_case_meta(): void
    {
        $posts = self::mockContent('posts.json');
        $meta = ['perPage' => 6, 'total' => count($posts), 'lastPage' => 2];

        $this->assertJsonSame(
            ['data' => array_slice($posts, 0, 6), 'meta' => ['currentPage' => 1, ...$meta]],
            $this->getJson('/api/v1/posts')->assertOk()->json(),
        );

        $this->assertJsonSame(
            ['data' => array_slice($posts, 6, 6), 'meta' => ['currentPage' => 2, ...$meta]],
            $this->getJson('/api/v1/posts?page=2')->assertOk()->json(),
        );

        $this->getJson('/api/v1/posts?page=0')->assertUnprocessable()->assertJsonPath('error.fields.page.0', fn ($m) => is_string($m));
    }

    public function test_settings_returns_the_singleton_object(): void
    {
        $expected = json_decode(File::get(base_path('docs/content-reference/mock/settings.json')), true);

        $this->assertJsonSame(['data' => $expected], $this->getJson('/api/v1/settings')->assertOk()->json());
    }

    public function test_contact_stores_a_valid_payload_and_ignores_unknown_keys(): void
    {
        $this->postJson('/api/v1/contact', [
            'name' => 'Sara',
            'email' => 'sara@example.com',
            'message' => 'We need a marketing site.',
            'read_at' => now()->toIso8601String(),
        ])->assertCreated()->assertExactJson(['data' => ['success' => true]]);

        $message = ContactMessage::sole();
        $this->assertSame('sara@example.com', $message->email);
        $this->assertNull($message->service);
        $this->assertNull($message->read_at);
    }

    public function test_contact_queues_a_notification_email_to_the_admin(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/contact', [
            'name' => 'Sara',
            'email' => 'sara@example.com',
            'service' => 'Web Development',
            'message' => 'We need a marketing site.',
        ])->assertCreated();

        $stored = ContactMessage::sole();

        Mail::assertQueued(
            NewContactMessageReceived::class,
            fn (NewContactMessageReceived $mail) => $mail->contactMessage->is($stored)
                && $mail->hasTo(config('admin.email'))
        );
    }

    public function test_contact_rejects_an_invalid_payload_with_the_error_envelope(): void
    {
        $this->postJson('/api/v1/contact', ['name' => 'A', 'email' => 'nope', 'message' => 'short'])
            ->assertUnprocessable()
            ->assertJsonPath('error.status', 422)
            ->assertJsonPath('error.code', 'validation_failed')
            ->assertJsonStructure(['error' => ['message', 'fields' => ['name', 'email', 'message']]]);

        $this->assertSame(0, ContactMessage::count());
    }

    public function test_newsletter_is_idempotent_and_case_insensitive(): void
    {
        $this->postJson('/api/v1/newsletter', ['email' => 'Sara@Example.com'])
            ->assertOk()->assertExactJson(['data' => ['success' => true]]);
        $this->postJson('/api/v1/newsletter', ['email' => 'sara@example.com'])
            ->assertOk()->assertExactJson(['data' => ['success' => true]]);

        $this->assertSame(['sara@example.com'], NewsletterSubscription::pluck('email')->all());

        $this->postJson('/api/v1/newsletter', ['email' => 'nope'])
            ->assertUnprocessable()
            ->assertJsonPath('error.fields.email.0', fn ($m) => is_string($m));
    }

    public function test_submissions_are_throttled_after_five_per_minute(): void
    {
        foreach (range(1, 5) as $i) {
            $this->postJson('/api/v1/newsletter', ['email' => "reader{$i}@example.com"])->assertOk();
        }

        $this->postJson('/api/v1/newsletter', ['email' => 'reader6@example.com'])
            ->assertTooManyRequests()
            ->assertHeader('Retry-After')
            ->assertJsonPath('error.code', 'too_many_requests');
    }

    public function test_unexpected_errors_use_the_envelope_without_leaking_the_exception_message(): void
    {
        Route::get('/api/v1/_boom', fn () => throw new RuntimeException('SQLSTATE secret detail'));

        $this->getJson('/api/v1/_boom')
            ->assertInternalServerError()
            ->assertExactJson(['error' => [
                'status' => 500,
                'code' => 'internal_server_error',
                'message' => 'Internal Server Error',
            ]]);
    }

    public function test_cors_allows_only_the_frontend_dev_origin(): void
    {
        $this->getJson('/api/v1/clients', ['Origin' => 'http://localhost:3000'])
            ->assertHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        $foreign = $this->getJson('/api/v1/clients', ['Origin' => 'https://evil.example']);
        $this->assertNotContains(
            $foreign->headers->get('Access-Control-Allow-Origin'),
            ['https://evil.example', '*'],
        );
    }
}
