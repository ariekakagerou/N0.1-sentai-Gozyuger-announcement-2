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
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->integer('episode_number');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('synopsis')->nullable();
            $table->longText('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('video_url')->nullable();
            $table->date('air_date')->nullable();
            $table->string('director')->nullable();
            $table->string('writer')->nullable();
            $table->json('featured_characters')->nullable();
            $table->json('featured_robots')->nullable();
            $table->integer('views')->default(0);
            $table->decimal('rating', 3, 2)->nullable();
            $table->enum('status', ['upcoming', 'aired', 'archived'])->default('upcoming');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('slug');
            $table->index('episode_number');
            $table->index('air_date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stories');
    }
};
