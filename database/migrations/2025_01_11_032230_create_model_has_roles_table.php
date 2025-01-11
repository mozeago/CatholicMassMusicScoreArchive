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
        Schema::create('model_has_roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('model_type');
            $table->bigInteger('model_id');
            $table->foreignId('role_id')->constrained()->onDelete('cascade'); // Role ID
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('model_has_roles');
    }
};
