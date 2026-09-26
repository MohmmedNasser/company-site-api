<?php

namespace Tests\Feature;

use App\Enums\ProjectStatus;
use App\Models\Category;
use App\Models\Client;
use App\Models\ContactMessage;
use App\Models\FaqItem;
use App\Models\NewsletterSubscription;
use App\Models\Post;
use App\Models\ProcessStep;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TimelineEntry;
use App\Models\ValueItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class ContentModelsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{class-string, string}>
     */
    public static function mockBackedModels(): array
    {
        return [
            'clients' => [Client::class, 'clients.json'],
            'services' => [Service::class, 'services.json'],
            'projects' => [Project::class, 'projects.json'],
            'testimonials' => [Testimonial::class, 'testimonials.json'],
            'process steps' => [ProcessStep::class, 'process-steps.json'],
            'faq items' => [FaqItem::class, 'faq.json'],
            'posts' => [Post::class, 'posts.json'],
            'team members' => [TeamMember::class, 'team.json'],
            'values' => [ValueItem::class, 'values.json'],
            'timeline' => [TimelineEntry::class, 'timeline.json'],
        ];
    }

    #[DataProvider('mockBackedModels')]
    public function test_seeder_loads_every_record_from_the_mock_file(string $model, string $file): void
    {
        $this->seed();

        $expected = json_decode(
            File::get(base_path("docs/content-reference/mock/{$file}")),
            true
        );

        $this->assertSame(count($expected), $model::count());
    }

    public function test_every_project_resolves_its_category_and_client(): void
    {
        $this->seed();

        $projects = Project::with(['category', 'client'])->get();

        $this->assertNotEmpty($projects);
        foreach ($projects as $project) {
            $this->assertInstanceOf(Category::class, $project->category, $project->id);
            $this->assertInstanceOf(Client::class, $project->client, $project->id);
        }
    }

    public function test_category_lists_its_projects(): void
    {
        $category = Category::factory()->create();
        Project::factory()->count(2)->for($category)->create();
        Project::factory()->create();

        $this->assertCount(2, $category->projects);
    }

    public function test_client_lists_its_projects_and_testimonials(): void
    {
        $client = Client::factory()->create();
        Project::factory()->for($client)->create();
        Testimonial::factory()->count(2)->for($client)->create();

        $this->assertCount(1, $client->projects);
        $this->assertCount(2, $client->testimonials);
    }

    public function test_localized_resolves_the_requested_locale_and_falls_back(): void
    {
        $service = Service::factory()->create([
            'title' => ['en' => 'Web Development', 'ar' => 'تطوير الويب'],
        ]);
        $englishOnly = Service::factory()->create([
            'title' => ['en' => 'English only'],
        ]);

        app()->setLocale('ar');
        $this->assertSame('تطوير الويب', $service->localized('title'));
        $this->assertSame('Web Development', $service->localized('title', 'en'));
        $this->assertSame('English only', $englishOnly->localized('title', 'ar'));
    }

    public function test_project_status_is_cast_to_the_enum(): void
    {
        $project = Project::factory()->inDevelopment()->create();

        $this->assertSame(ProjectStatus::InDevelopment, $project->fresh()->status);
    }

    public function test_site_settings_resolve_to_the_single_seeded_row(): void
    {
        $this->seed();

        $settings = SiteSetting::current();

        $this->assertSame(1, $settings->id);
        $this->assertSame(1, SiteSetting::count());
        $this->assertIsArray($settings->hero);
    }

    public function test_contact_message_states_mark_the_inbox_workflow(): void
    {
        $unread = ContactMessage::factory()->create();
        $read = ContactMessage::factory()->read()->create();

        $this->assertNull($unread->read_at);
        $this->assertNotNull($read->read_at);
        $this->assertNull($read->archived_at);
    }

    public function test_newsletter_factory_produces_distinct_emails(): void
    {
        NewsletterSubscription::factory()->count(5)->create();

        $this->assertSame(5, NewsletterSubscription::distinct()->count('email'));
    }
}
