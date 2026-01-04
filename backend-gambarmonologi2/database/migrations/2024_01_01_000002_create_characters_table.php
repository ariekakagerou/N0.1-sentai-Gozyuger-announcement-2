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
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('ranger_name')->nullable(); // e.g., "Gozyuger Red"
            $table->string('color')->nullable(); // e.g., "red", "blue", "yellow"
            $table->string('actor')->nullable();
            $table->text('description')->nullable();
            $table->longText('biography')->nullable();
            $table->string('image')->nullable();
            $table->string('avatar')->nullable();
            $table->integer('age')->nullable();
            $table->string('occupation')->nullable();
            $table->json('abilities')->nullable();
            $table->json('weapons')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_main')->default(false);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('slug');
            $table->index('color');
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
