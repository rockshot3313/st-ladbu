<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Resolve role names, preferring Filament Shield config if available
        $superAdminRoleName = 'super_admin';
        $adminRoleName = 'admin';
        $userRoleName = 'user';

        // Create roles if they don't exist
        $superAdminRole = Role::firstOrCreate(['name' => $superAdminRoleName, 'guard_name' => 'web']);
        $adminRole = Role::firstOrCreate(['name' => $adminRoleName, 'guard_name' => 'web']);
        $userRole = Role::firstOrCreate(['name' => $userRoleName, 'guard_name' => 'web']);

        // Create three users with different roles
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => 'password',
            ]
        );

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => 'password',
            ]
        );

        $basicUser = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Basic User',
                'password' => 'password',
            ]
        );

        // Assign roles
        $superAdmin->syncRoles([$superAdminRole]);
        $admin->syncRoles([$adminRole]);
        $basicUser->syncRoles([$userRole]);
    }
}


