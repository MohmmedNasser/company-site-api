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
        // Timestamped 100000 so it runs before create_projects_table
        // (100003): projects.category_id references this table, and a
        // foreign key cannot point at a table that doesn't exist yet.
        Schema::create('categories', function (Blueprint $table) {
            // Same string-slug primary key as every other content table
            // ("web", "mobile", ...) — it is the exact value the frontend
            // already filters by (types.ts: Project.category).
            $table->string('id')->primary();
            $table->unsignedInteger('order');
            $table->json('name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
