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
        if (!Schema::hasTable('permissions')) {
            Schema::create('permissions', function (Blueprint $table) {
                $table->id(); // INT primary key
                $table->ulid('ulid')->unique();
                $table->foreignId('tenant_id')->constrained('tenants')->onDelete('cascade'); // Tenant ID FK
                $table->string('name'); // Permission name
                $table->string('guard_name'); // Used to define guard (e.g., web, api)
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};