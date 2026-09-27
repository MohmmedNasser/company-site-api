<?php

namespace Tests\Feature\Admin;

use App\Models\Client;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContentCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
        Storage::fake('public');
        $this->actingAs(User::sole());
    }

    /**
     * @return array<string, mixed>
     */
    private function servicePayload(array $overrides = []): array
    {
        return [
            'title' => ['en' => 'Test Service', 'ar' => 'خدمة تجريبية'],
            'slug' => 'test-service',
            'icon' => 'Globe',
            'image' => UploadedFile::fake()->image('first.jpg', 1600, 900),
            'categories' => ['Laravel', 'Inertia'],
            'excerpt' => ['en' => 'Short.', 'ar' => 'قصير.'],
            'body' => ['en' => "One.\n\nTwo.", 'ar' => "واحد.\n\nاثنان."],
            ...$overrides,
        ];
    }

    public function test_full_cycle_create_edit_reorder_delete(): void
    {
        // Create: appended after the six seeded services, id follows the
        // seeded svc-<slug> convention, image stored on the public disk.
        $this->post('/admin/services', $this->servicePayload())
            ->assertRedirect('/admin/services')
            ->assertInertiaFlash('toast.message', 'Service created.');

        $service = Service::findOrFail('svc-test-service');
        $this->assertSame(7, $service->order);
        $this->assertSame(['Laravel', 'Inertia'], $service->categories);
        $this->assertStringStartsWith('services/', $service->image);
        Storage::disk('public')->assertExists($service->image);
        $firstImage = $service->image;

        // Edit with a new image: sent as POST + _method=PUT, exactly as the
        // React form does it. The replaced file is removed from disk.
        $this->post('/admin/services/svc-test-service', $this->servicePayload([
            '_method' => 'put',
            'title' => ['en' => 'Renamed Service', 'ar' => 'خدمة معدلة'],
            'image' => UploadedFile::fake()->image('second.jpg'),
        ]))->assertRedirect('/admin/services');

        $service->refresh();
        $this->assertSame('Renamed Service', $service->title['en']);
        $this->assertNotSame($firstImage, $service->image);
        Storage::disk('public')->assertMissing($firstImage);
        Storage::disk('public')->assertExists($service->image);

        // Reorder: up one step swaps it with the service that was 6th.
        $sixth = Service::query()->where('order', 6)->sole();
        $this->post('/admin/services/svc-test-service/move', ['direction' => 'up'])->assertRedirect();
        $this->assertSame(6, $service->refresh()->order);
        $this->assertSame(7, $sixth->refresh()->order);

        // Delete: row and uploaded file both gone.
        $this->delete('/admin/services/svc-test-service')->assertRedirect('/admin/services');
        $this->assertNull(Service::find('svc-test-service'));
        Storage::disk('public')->assertMissing($service->image);
    }

    public function test_editing_without_a_file_keeps_the_legacy_image_url(): void
    {
        $service = Service::query()->orderBy('order')->firstOrFail();
        $legacy = $service->image;
        $this->assertStringStartsWith('https://picsum.photos/', $legacy);

        $this->put("/admin/services/{$service->id}", $this->servicePayload([
            'slug' => $service->slug,
            'image' => null,
        ]))->assertSessionHasNoErrors();

        $this->assertSame($legacy, $service->refresh()->image);
    }

    public function test_the_api_resolves_uploaded_paths_and_passes_legacy_urls_through(): void
    {
        $this->post('/admin/services', $this->servicePayload())->assertSessionHasNoErrors();

        $services = collect($this->getJson('/api/v1/services')->json('data'))->keyBy('id');

        $this->assertSame(
            Storage::disk('public')->url(Service::findOrFail('svc-test-service')->image),
            $services['svc-test-service']['image'],
        );
        $this->assertStringStartsWith('https://picsum.photos/', $services['svc-web-development']['image']);
    }

    public function test_each_language_of_a_localized_field_is_validated(): void
    {
        $this->post('/admin/services', $this->servicePayload([
            'title' => ['en' => 'Only English', 'ar' => ''],
            'slug' => 'svc-web-development-copy',
        ]))->assertSessionHasErrors(['title.ar' => 'The Title (Arabic) field is required.']);

        $this->assertNull(Service::find('svc-only-english'));
    }

    public function test_slugs_must_be_unique(): void
    {
        $this->post('/admin/services', $this->servicePayload(['slug' => 'web-development']))
            ->assertSessionHasErrors('slug');
    }

    public function test_search_matches_either_language_case_insensitively(): void
    {
        $this->get('/admin/services?search=WEB')->assertInertia(fn (Assert $page) => $page
            ->component('admin/content/index')
            ->has('records', 1)
            ->where('records.0.id', 'svc-web-development'));

        $this->get('/admin/services?search=الويب')->assertInertia(fn (Assert $page) => $page
            ->where('records.0.id', 'svc-web-development'));
    }

    public function test_index_lists_records_in_public_order(): void
    {
        $this->get('/admin/process-steps')->assertInertia(fn (Assert $page) => $page
            ->component('admin/content/index')
            ->where('type.slug', 'process-steps')
            ->where('records.0.id', 'step-discover-define')
            ->where('records.2.id', 'step-launch-grow'));
    }

    public function test_a_client_still_referenced_by_projects_cannot_be_deleted(): void
    {
        $client = Client::query()->has('projects')->firstOrFail();

        $this->delete("/admin/clients/{$client->id}")
            ->assertRedirect()
            ->assertInertiaFlash('toast.type', 'error');

        $this->assertNotNull($client->fresh());
    }

    public function test_unknown_types_and_records_are_404(): void
    {
        $this->get('/admin/widgets')->assertNotFound();
        $this->get('/admin/services/no-such-service/edit')->assertNotFound();
    }

    public function test_the_same_form_page_serves_every_content_type(): void
    {
        foreach (['services', 'projects', 'team-members', 'faq', 'timeline'] as $slug) {
            $this->get("/admin/{$slug}/create")->assertInertia(fn (Assert $page) => $page
                ->component('admin/content/form')
                ->where('type.slug', $slug)
                ->where('fields', fn ($fields) => collect($fields)->contains('type', 'localized')));
        }
    }
}
