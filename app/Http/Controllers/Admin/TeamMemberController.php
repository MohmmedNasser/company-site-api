<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeamMemberRequest;
use App\Http\Requests\Admin\UpdateTeamMemberRequest;
use App\Models\TeamMember;
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

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        $members = TeamMember::query()->orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/content/index', [
            'type' => $this->typeMeta(),
            'columns' => [
                ['key' => 'avatar', 'label' => 'Avatar', 'type' => 'image'],
                ['key' => 'name', 'label' => 'Name', 'type' => 'localized'],
                ['key' => 'role', 'label' => 'Role', 'type' => 'localized'],
            ],
            'records' => $members->map(fn (TeamMember $member) => $this->presentForList($member))->values(),
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

    public function store(StoreTeamMemberRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $member = new TeamMember;
        $member->id = $this->generateId($data['name']['en']);
        $member->order = (int) TeamMember::query()->max('order') + 1;
        $this->fill($member, $data, $request);
        $member->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Team member created.']);

        return to_route('admin.team-members.index');
    }

    public function edit(TeamMember $teamMember): Response
    {
        return Inertia::render('admin/content/form', [
            'type' => $this->typeMeta(),
            'fields' => $this->fieldsSchema(),
            'record' => $this->present($teamMember),
        ]);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember): RedirectResponse
    {
        $data = $request->validated();
        $previousAvatar = $teamMember->avatar;

        $this->fill($teamMember, $data, $request);
        $teamMember->save();

        if ($request->hasFile('avatar')) {
            ImageUploadService::delete($previousAvatar);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Team member saved.']);

        return to_route('admin.team-members.index');
    }

    public function move(Request $request, TeamMember $teamMember): RedirectResponse
    {
        $direction = $request->validate([
            'direction' => ['required', Rule::in(['up', 'down'])],
        ])['direction'];

        DB::transaction(function () use ($teamMember, $direction) {
            $ids = TeamMember::query()->lockForUpdate()->orderBy('order')->orderBy('id')->pluck('id')->all();
            $from = array_search($teamMember->id, $ids, true);
            $to = $direction === 'up' ? $from - 1 : $from + 1;

            if ($from === false || ! array_key_exists($to, $ids)) {
                return;
            }

            [$ids[$from], $ids[$to]] = [$ids[$to], $ids[$from]];

            foreach ($ids as $position => $id) {
                TeamMember::query()->whereKey($id)->where('order', '!=', $position + 1)->update(['order' => $position + 1]);
            }
        });

        return back();
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();
        ImageUploadService::delete($teamMember->avatar);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Team member deleted.']);

        return to_route('admin.team-members.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function typeMeta(): array
    {
        return [
            'slug' => 'team-members',
            'label' => 'Team Members',
            'singular' => 'Team member',
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
            ['name' => 'role', 'type' => 'localized', 'label' => 'Role'],
            ['name' => 'avatar', 'type' => 'image', 'label' => 'Avatar'],
            ['name' => 'bio', 'type' => 'localized', 'label' => 'Bio', 'multiline' => true],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function present(TeamMember $member): array
    {
        return [
            'id' => $member->id,
            'order' => $member->order,
            'name' => $member->name,
            'role' => $member->role,
            'avatar' => $member->avatar,
            'avatar_url' => Media::url($member->avatar),
            'bio' => $member->bio,
        ];
    }

    /**
     * The index table only shows an avatar, name, and role, so this is a
     * subset of present() — kept as its own method (matching the other
     * five image-bearing controllers) because `avatar_url` is the
     * thumbnail here, not the full avatar present() sends the edit form.
     *
     * @return array<string, mixed>
     */
    private function presentForList(TeamMember $member): array
    {
        return [
            'id' => $member->id,
            'order' => $member->order,
            'name' => $member->name,
            'role' => $member->role,
            'avatar_url' => ImageUploadService::thumbnailUrl($member->avatar),
        ];
    }

    private function generateId(string $name): string
    {
        $base = Str::of('team-'.Str::slug($name))->limit(80, '')->rtrim('-')->toString();
        $id = $base;

        for ($suffix = 2; TeamMember::query()->whereKey($id)->exists(); $suffix++) {
            $id = "{$base}-{$suffix}";
        }

        return $id;
    }

    /**
     * @param  array<string, mixed>  $data  validated input
     */
    private function fill(TeamMember $member, array $data, Request $request): void
    {
        $member->name = $data['name'];
        $member->role = $data['role'];
        $member->bio = $data['bio'];

        if ($request->file('avatar') instanceof UploadedFile) {
            $member->avatar = ImageUploadService::store($request->file('avatar'), 'team-members');
        }
    }
}
