<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate([
            'email' => strtolower('test@catholicmassmusicscorearchive.com'),
        ], [
            'name' => 'Test User',
            'password' => bcrypt('password'),
        ]);
        $this->call([
            TenantSeeder::class,
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
