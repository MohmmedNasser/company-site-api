<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreClientRequest;
use App\Http\Requests\Admin\UpdateClientRequest;
use App\Models\Client;
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

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()->orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'logo', 'label' => 'Logo', 'type' => 'image'],
                ['key' => 'name', 'label' => 'Name', 'type' => 'localized'],
                ['key' => 'url', 'label' => 'Website', 'type' => 'text'],
            ],
            'records' => $clients->map(fn (Client $client) => $this->presentForList($client))->values(),
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

    public function store(StoreClientRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $client = new Client;
        $client->id = $this->generateId($data['name']['en']);
        $client->order = (int) Client::query()->max('order') + 1;
        $this->fill($client, $data, $request);
        $client->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Client created.']);

        return to_route('admin.clients.index');
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($client),
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $data = $request->validated();
        $previousLogo = $client->logo;

        $this->fill($client, $data, $request);
        $client->save();

        if ($request->hasFile('logo')) {
            ImageUploadService::delete($previousLogo);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Client saved.']);

        return to_route('admin.clients.index');
    }

    public function move(Request $request, Client $client): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($client, $direction) {
            $ids = Client::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($client->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                Client::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(Client $client): RedirectResponse
    {
        // projects.client_id and testimonials.client_id are foreign keys
        // with no cascade, so the database would refuse this delete anyway
        // — this check just turns that into a readable message.
        $projects = $client->projects()->count();
        $testimonials = $client->testimonials()->count();

        if ($projects + $testimonials > 0) {
            Inertia::flash('toast', ['type' => 'error', 'message' => "This client is still referenced by {$projects} project(s) and {$testimonials} testimonial(s). Reassign or delete those first."]);

            return back();
        }

        $client->delete();
        ImageUploadService::delete($client->logo);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Client deleted.']);

        return to_route('admin.clients.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'clients',
            'label' => 'Clients',
            'singular' => 'Client',
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
            ['name' => 'name', 'type' => 'localized', 'label' => 'Name'],
            ['name' => 'url', 'type' => 'url', 'label' => 'Website'],
            ['name' => 'logo', 'type' => 'image', 'label' => 'Logo'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function present(Client $client): array
    {
        return [
            'id' => $client->id,
            'order' => $client->order,
            'name' => $client->name,
            'url' => $client->url,
            'logo' => $client->logo,
            'logo_url' => Media::url($client->logo),
        ];
    }

    /**
     * The index table only shows a logo, name, and website, so this is a
     * subset of present() — kept as its own method (matching the other
     * five image-bearing controllers) because `logo_url` is the thumbnail
     * here, not the full logo present() sends the edit form.
     *
     * @return array<string, mixed>
     */
    private function presentForList(Client $client): array
    {
        return [
            'id' => $client->id,
            'order' => $client->order,
            'name' => $client->name,
            'url' => $client->url,
            'logo_url' => ImageUploadService::thumbnailUrl($client->logo),
        ];
    }

    private function generateId(string $name): string
    {
        $base = Str::of('client-'.Str::slug($name))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; Client::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(Client $client, array $data, Request $request): void
    {
        $client->name = $data['name'];
        $client->url = $data['url'];

        if ($request->file('logo') instanceof UploadedFile) {
            $client->logo = ImageUploadService::store($request->file('logo'), 'clients');
        }
    }
}
