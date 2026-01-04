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
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type')->nullable(); // e.g., "Opening", "Ending", "Insert Song"
            $table->string('artist')->nullable();
            $table->string('composer')->nullable();
            $table->string('lyricist')->nullable();
            $table->text('lyrics')->nullable();
            $table->string('audio_url')->nullable();
            $table->string('video_url')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('duration')->nullable();
            $table->date('release_date')->nullable();
            $table->integer('order')->default(0);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('slug');
            $table->index('type');
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
