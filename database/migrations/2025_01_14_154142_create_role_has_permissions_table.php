<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// for generating ULID

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('role_has_permissions')) {
            Schema::create('role_has_permissions', function (Blueprint $table) {
                $table->id();
                $table->ulid('ulid')->unique(); // ULID column for unique identifier
                $table->foreignId('role_id')->constrained()->onDelete('cascade'); // Foreign key to roles
                $table->foreignId('permission_id')->constrained()->onDelete('cascade'); // Foreign key to permissions
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_has_permissions');
    }
};
