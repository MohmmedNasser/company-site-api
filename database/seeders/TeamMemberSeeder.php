<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TeamMemberSeeder extends Seeder
{
    /**
     * Seed the team_members table from the frontend's mock content.
     */
    public function run(): void
    {
        $members = json_decode(
            File::get(base_path('docs/content-reference/mock/team.json')),
            true
        );

        foreach ($members as $member) {
            TeamMember::create([
                'id' => $member['id'],
                'avatar' => $member['avatar'],
                'order' => $member['order'],
                'name' => $member['name'],
                'role' => $member['role'],
                'bio' => $member['bio'],
            ]);
        }
    }
}
