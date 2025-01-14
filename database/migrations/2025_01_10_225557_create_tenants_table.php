<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('tenants')) {
            Schema::create('tenants', function (Blueprint $table) {
                $table->id(); // INT primary key
                $table->ulid('ulid')->unique(); // ULID column for unique identification
                $table->string('name'); // Tenant name
                $table->string('email')->unique(); // Tenant email for contact
                $table->string('domain')->unique()->nullable(); // Tenant's custom domain (optional)
                $table->string('logo')->nullable(); // Tenant's logo path
                $table->timestamps(); // Created and updated timestamps
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('tenants');
    }
}
