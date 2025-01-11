<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create multiple tenants with Kenyan names and companies
        $tenants = [
            [
                'ulid' => \Str::ulid(),
                'name' => 'Mambo Technologies Ltd.',
                'email' => 'mambo_tech@example.com',
                'domain' => 'mambo.technologies.local',
                'logo' => null,
            ],
            [
                'ulid' => \Str::ulid(),
                'name' => 'Kenya Green Energy Solutions',
                'email' => 'kenya_green@example.com',
                'domain' => 'greenenergy.kenya.local',
                'logo' => null,
            ],
            [
                'ulid' => \Str::ulid(),
                'name' => 'Safari Enterprises Ltd.',
                'email' => 'safari_enterprises@example.com',
                'domain' => 'safari.enterprises.local',
                'logo' => null,
            ],
            [
                'ulid' => \Str::ulid(),
                'name' => 'Jambo Foods Kenya',
                'email' => 'jambo_foods@example.com',
                'domain' => 'jambo.foods.local',
                'logo' => null,
            ],
            [
                'ulid' => \Str::ulid(),
                'name' => 'Boma Construction Co.',
                'email' => 'boma_construction@example.com',
                'domain' => 'boma.construction.local',
                'logo' => null,
            ],
        ];

        // Insert all tenants into the database
        foreach ($tenants as $tenant) {
            Tenant::create($tenant);
        }
    }
}
