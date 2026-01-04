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
        Schema::create('robots', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type')->nullable(); // e.g., "Individual Mecha", "Combined Mecha"
            $table->text('description')->nullable();
            $table->longText('specifications')->nullable();
            $table->string('image')->nullable();
            $table->string('pilot')->nullable();
            $table->json('weapons')->nullable();
            $table->json('special_attacks')->nullable();
            $table->json('components')->nullable(); // For combined mechas
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
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
        Schema::dropIfExists('robots');
    }
};
