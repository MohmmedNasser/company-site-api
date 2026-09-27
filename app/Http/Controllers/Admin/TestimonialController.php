<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Models\Client;
use App\Models\Testimonial;
use App\Services\ImageUploadService;
use App\Support\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimonial::query()->orderBy('order')->orderBy('id')->get();
        $clients = $this->clientNames();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'avatar', 'label' => 'Avatar', 'type' => 'image'],
                ['key' => 'author', 'label' => 'Author', 'type' => 'localized'],
                ['key' => 'client_label', 'label' => 'Client', 'type' => 'text'],
                ['key' => 'rating', 'label' => 'Rating', 'type' => 'text'],
            ],
            'records' => $testimonials->map(fn (Testimonial $testimonial) => $this->presentForList($testimonial, $clients))->values(),
            'pagination' => null,
            'filters' => ['search' => ''],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => null,
        ]);
    }

    public function store(StoreTestimonialRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $testimonial = new Testimonial;
        $testimonial->id = $this->generateId($data['author']['en']);
        $testimonial->order = (int) Testimonial::query()->max('order') + 1;
        $this->fill($testimonial, $data, $request);
        $testimonial->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Testimonial created.']);

        return to_route('admin.testimonials.index');
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($testimonial),
        ]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $data = $request->validated();
        $previousAvatar = $testimonial->avatar;

        $this->fill($testimonial, $data, $request);
        $testimonial->save();

        if ($request->hasFile('avatar')) {
            ImageUploadService::delete($previousAvatar);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Testimonial saved.']);

        return to_route('admin.testimonials.index');
    }

    public function move(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($testimonial, $direction) {
            $ids = Testimonial::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($testimonial->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                Testimonial::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();
        ImageUploadService::delete($testimonial->avatar);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Testimonial deleted.']);

        return to_route('admin.testimonials.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'testimonials',
            'label' => 'Testimonials',
            'singular' => 'Testimonial',
            'searchable' => false,
            'paginated' => false,
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function fieldsSchema(): array
    {
        return [
            ['name' => 'author', 'type' => 'localized', 'label' => 'Author'],
            ['name' => 'role', 'type' => 'localized', 'label' => 'Role'],
            ['name' => 'client_id', 'type' => 'select', 'label' => 'Client', 'options' => $this->options($this->clientNames())],
            ['name' => 'rating', 'type' => 'number', 'label' => 'Rating', 'min' => 0, 'max' => 5, 'step' => 0.5],
            ['name' => 'avatar', 'type' => 'image', 'label' => 'Avatar'],
            ['name' => 'quote', 'type' => 'localized', 'label' => 'Quote', 'multiline' => true],
        ];
    }

    /**
     * @return array<string, string> id => label
     */
    private function clientNames(): array
    {
        return Client::query()->orderBy('order')->get()
            ->mapWithKeys(fn (Client $client) => [$client->id => $client->localized('name', 'en')])
            ->all();
    }

    /**
     * @param  array<string, string>  $labels  id => label
     * @return list<array{value: string, label: string}>
     */
    private function options(array $labels): array
    {
        return collect($labels)
            ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function present(Testimonial $testimonial): array
    {
        return [
            'id' => $testimonial->id,
            'order' => $testimonial->order,
            'author' => $testimonial->author,
            'role' => $testimonial->role,
            'client_id' => $testimonial->client_id,
            'rating' => $testimonial->rating,
            'avatar' => $testimonial->avatar,
            'avatar_url' => Media::url($testimonial->avatar),
            'quote' => $testimonial->quote,
        ];
    }

    /**
     * The index table only shows an avatar, author, client, and rating,
     * so this leaves out the quote text that present() sends the edit
     * form — no point shipping every testimonial's full quote to a table
     * that never renders it. `avatar_url` is the thumbnail here; present()
     * sends the full image for the edit form.
     *
     * @param  array<string, string>  $clients  id => label
     * @return array<string, mixed>
     */
    private function presentForList(Testimonial $testimonial, array $clients): array
    {
        return [
            'id' => $testimonial->id,
            'order' => $testimonial->order,
            'author' => $testimonial->author,
            'client_label' => $clients[$testimonial->client_id] ?? $testimonial->client_id,
            'rating' => $testimonial->rating,
            'avatar_url' => ImageUploadService::thumbnailUrl($testimonial->avatar),
        ];
    }

    private function generateId(string $author): string
    {
        $base = Str::of('test-'.Str::slug($author))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; Testimonial::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(Testimonial $testimonial, array $data, Request $request): void
    {
        $testimonial->author = $data['author'];
        $testimonial->role = $data['role'];
        $testimonial->client_id = $data['client_id'];
        $testimonial->rating = $data['rating'];
        $testimonial->quote = $data['quote'];

        if ($request->file('avatar') instanceof UploadedFile) {
            $testimonial->avatar = ImageUploadService::store($request->file('avatar'), 'testimonials');
        }
    }
}
