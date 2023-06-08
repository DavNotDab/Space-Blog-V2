<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsDemoSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'create']);
        Permission::create(['name' => 'edit']);
        Permission::create(['name' => 'delete']);
        Permission::create(['name' => 'view content']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'reader']);
        $role1->givePermissionTo('view content');

        $role2 = Role::create(['name' => 'writer']);
        $role2->givePermissionTo('create');
        $role2->givePermissionTo('edit');
        $role2->givePermissionTo('delete');
        $role2->givePermissionTo('view content');

        $user = User::factory()->create([
            'name' => 'Example Writer User',
            'email' => 'writer@example.com',
        ]);
        $user->assignRole($role2);

    }
}
