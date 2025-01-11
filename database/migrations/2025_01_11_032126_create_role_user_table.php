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
        Schema::create('role_user', function (Blueprint $table) {
            $table->id(); // INT primary key
            $table->foreignId('tenant_id')->constrained('tenants')->onDelete('cascade'); // Tenant ID FK
            $table->foreignId('role_id')->constrained()->onDelete('cascade'); // Role ID
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // User ID
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};
