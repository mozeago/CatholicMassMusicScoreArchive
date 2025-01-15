<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function assignPermissionsToRole(Role $role, $permissions)
    {
        $roleHasPermissionsData = [];

        foreach ($permissions as $permission) {
            $roleHasPermissionsData[] = [
                'permission_id' => $permission->id,
                'role_id' => $role->id,
                'ulid' => Str::ulid(), // Conditionally add ULID
            ];
        }

        DB::table('role_has_permissions')->insert($roleHasPermissionsData);
    }

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

            // Additional Permissions for User and Guest roles
            'like music score',
            'download music score',
        ];

        foreach ($tenants as $tenant) {
            // Loop through each tenant
            foreach ($permissions as $permission) {
                // Create permission scoped to this tenant
                Permission::firstOrCreate(
                    ['name' => $permission, 'tenant_id' => $tenant->id], // Assign tenant_id
                    ['ulid' => Str::ulid()]
                );
            }
            $allPermissions = Permission::where('tenant_id', $tenant->id)->get();
            // Roles
            $roles = [
                'admin' => $allPermissions,
                'composer' => $allPermissions->whereIn('name', [
                    'create music score',
                    'view music score',
                    'edit music score',
                    'delete music score',
                ]),
                'user' => $allPermissions->whereIn('name', [
                    'view music score',
                    'like music score',
                    'download music score',
                ]),
                'guest' => $allPermissions->whereIn('name', [
                    'view music score',
                ]),
            ];
            foreach ($roles as $roleName => $rolePermissions) {
                $role = Role::firstOrCreate([
                    'name' => strtolower($roleName),
                    'guard_name' => 'web',
                    'tenant_id' => $tenant->id,
                ], [
                    'ulid' => Str::ulid(),
                ]);

                $this->assignPermissionsToRole($role, $rolePermissions);
            }
            // Optionally, assign the 'Admin' role to the test user
            $user = User::where('email', strtolower('test@catholicmassmusicscorearchive.com'))->first();
            if ($user) {
                $role = Role::where('name', 'admin')->first();
                DB::table('model_has_roles')->insert([
                    'role_id' => $role->id,
                    'model_type' => 'App\Models\User', // Specifies that the model is User
                    'model_id' => $user->id, // References the user's ID on the  `users` table
                    'ulid' => Str::ulid(), // Generate a ULID for this relation
                ]);
            }
        }
    }
}
