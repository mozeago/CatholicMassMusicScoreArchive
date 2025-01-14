<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Fetch all tenants
        $tenants = Tenant::all();
        // Permissions
        $permissions = [
            // Music Score
            'create music score',
            'view music score',
            'edit music score',
            'delete music score',
            'approve music score',

            // Categories
            'create category',
            'edit category',
            'delete category',
            'view category',

            // Users
            'create user',
            'edit user',
            'delete user',
            'assign role to user',

            // Reports
            'view analytics',
            'generate reports',
        ];

        foreach ($permissions as $permission) {
            // Loop through each tenant
            foreach ($tenants as $tenant) {
                // Create permission scoped to this tenant
                Permission::firstOrCreate(
                    ['name' => $permission, 'tenant_id' => $tenant->id]// Assign tenant_id
                );
            }
        }
        foreach ($tenants as $tenant) {
            // Roles
            $admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web', 'tenant_id' => $tenant->id]);
            $composer = Role::firstOrCreate(['name' => 'Composer', 'guard_name' => 'web', 'tenant_id' => $tenant->id]);
            $user = Role::firstOrCreate(['name' => 'User', 'guard_name' => 'web', 'tenant_id' => $tenant->id]);
            $guest = Role::firstOrCreate(['name' => 'Guest', 'guard_name' => 'web', 'tenant_id' => $tenant->id]);
            // Assign Permissions to Roles
            $admin->syncPermissions(Permission::all());

            // Assign specific permissions to other roles
            $composer->syncPermissions([
                'create music score',
                'view music score',
                'edit music score',
                'delete music score',
            ]);

            $user->syncPermissions([
                'view music score',
                'like music score',
                'download music score',
            ]);

            $guest->syncPermissions([
                'view music score',
            ]);
            // Optionally, assign the 'Admin' role to the test user
            $user = User::where('email', 'test@catholicmassmusicscorearchive.com')->first();
            if ($user) {
                $user->assignRole('Admin');
            }
        }
    }
}
