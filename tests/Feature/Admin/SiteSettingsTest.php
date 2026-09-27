<?php

namespace Tests\Feature\Admin;

use App\Http\Requests\Admin\SiteSettingRequest;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SiteSettingsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
        $this->actingAs(User::sole());
    }

    /**
     * @return array<string, mixed>
     */
    private function current(): array
    {
        return SiteSetting::current()->only(SiteSettingRequest::SECTIONS);
    }

    public function test_edit_page_receives_every_section(): void
    {
        $this->get('/admin/settings')->assertInertia(fn (Assert $page) => $page
            ->component('admin/settings/edit')
            ->has('settings', 6)
            ->has('settings.hero.title.ar'));
    }

    public function test_values_update_and_the_shape_is_preserved(): void
    {
        $settings = $this->current();
        $settings['hero']['title']['en'] = 'A new headline';
        $settings['social'][] = ['platform' => 'mastodon', 'url' => 'https://mastodon.social/@codexa'];

        $this->put('/admin/settings', $settings)->assertRedirect('/admin/settings');

        $saved = $this->current();
        $this->assertSame('A new headline', $saved['hero']['title']['en']);
        $this->assertSame('mastodon', end($saved['social'])['platform']);
        $this->assertSame(array_keys($settings['pages']['about']), array_keys($saved['pages']['about']));
    }

    public function test_a_missing_translation_is_rejected(): void
    {
        $settings = $this->current();
        $settings['sections']['faq']['heading']['ar'] = '';

        $this->put('/admin/settings', $settings)
            ->assertSessionHasErrors('sections.faq.heading.ar');
    }

    public function test_keys_cannot_be_added_to_the_stored_shape(): void
    {
        $settings = $this->current();
        $settings['hero']['bogus'] = 'x';

        $this->put('/admin/settings', $settings)->assertSessionHasErrors('hero');
    }
}
