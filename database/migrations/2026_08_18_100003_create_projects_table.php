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
        Schema::create('projects', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('slug')->unique();
            // Indexed automatically by the foreign key below — the
            // /api/v1/projects?category= filter queries this column.
            $table->string('category_id');
            $table->enum('status', ['shipped', 'in-development']);
            $table->string('client_id');
            $table->string('cover_image');
            $table->unsignedInteger('order');
            $table->json('title');
            $table->json('summary');
            $table->json('description');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('client_id')->references('id')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
