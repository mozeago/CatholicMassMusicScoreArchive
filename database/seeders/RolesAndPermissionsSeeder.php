<?php

namespace Database\Seeders;

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
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Roles
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $composer = Role::firstOrCreate(['name' => 'Composer']);
        $user = Role::firstOrCreate(['name' => 'User']);
        $guest = Role::firstOrCreate(['name' => 'Guest']);

        // Assign Permissions to Roles
        $admin->givePermissionTo(Permission::all());

        $composer->givePermissionTo([
            'create music score',
            'view music score',
            'edit music score',
            'delete music score',
        ]);

        $user->givePermissionTo([
            'view music score',
            'like music score',
            'download music score',
        ]);

        $guest->givePermissionTo([
            'view music score',
        ]);
    }
}
