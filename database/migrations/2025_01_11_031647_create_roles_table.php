<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('roles')) {
            Schema::create('roles', function (Blueprint $table) {
                $table->id(); // INT primary key
                $table->foreignId('tenant_id')->constrained('tenants')->onDelete('cascade'); // Tenant ID FK
                $table->string('name')->unique(); // Name of the role
                $table->string('guard_name'); // Used to define guard (e.g., web, api)
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
