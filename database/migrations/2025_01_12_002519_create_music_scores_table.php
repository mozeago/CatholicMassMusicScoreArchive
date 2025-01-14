<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (!Schema::hasTable('music_scores')) {
            Schema::create('music_scores', function (Blueprint $table) {
                $table->id();
                $table->ulid('ulid')->unique();
                $table->string('title');
                $table->string('composer')->nullable();
                $table->string('lyrist')->nullable();
                $table->year('year_composed')->nullable();
                $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade'); // Reference to User who uploaded
                $table->integer('downloads')->default(0);
                $table->integer('views')->default(0);
                $table->integer('likes')->default(0);
                $table->integer('shares')->default(0);
                $table->integer('favorited')->default(0);
                $table->string('midi_file')->nullable();
                $table->string('score_pdf')->nullable();
                $table->text('chorus')->nullable();
                $table->json('stanzas')->nullable(); // Store stanzas as JSON
                $table->timestamps();
            });
        }
    }
    public function down()
    {
        Schema::dropIfExists('music_scores');
    }
};
