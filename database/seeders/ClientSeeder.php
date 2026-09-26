<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ClientSeeder extends Seeder
{
    /**
     * Seed the clients table from the frontend's mock content.
     */
    public function run(): void
    {
        $clients = json_decode(
            File::get(base_path('docs/content-reference/mock/clients.json')),
            true
        );

        foreach ($clients as $client) {
            Client::create([
                'id' => $client['id'],
                'logo' => $client['logo'],
                'url' => $client['url'],
                'order' => $client['order'],
                'name' => $client['name'],
            ]);
        }
    }
}
