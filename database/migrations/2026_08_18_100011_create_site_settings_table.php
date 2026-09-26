<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            // Not $table->id(): MySQL refuses a CHECK constraint on an
            // AUTO_INCREMENT column ("cannot refer to an auto-increment
            // column"), and auto-increment serves no purpose on a table
            // that only ever holds one row anyway.
            $table->unsignedTinyInteger('id')->primary();
            $table->json('hero');
            $table->json('sections');
            $table->json('pages');
            $table->json('contact');
            $table->json('newsletter');
            $table->json('social');
            $table->timestamps();
        });

        // Enforce the singleton at the database level, not just by convention:
        // no INSERT or UPDATE can ever leave a row whose id isn't 1. MySQL has
        // enforced CHECK constraints since 8.0.16 (earlier versions parsed but
        // silently ignored them), so this only bites during a real INSERT
        // attempt against the second row, not at migration time.
        //
        // Skipped on SQLite (the in-memory test database, see phpunit.xml):
        // SQLite cannot add a constraint to an existing table via ALTER
        // TABLE. Production and local dev both run MySQL, so the guarantee
        // still holds wherever real data lives.
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('ALTER TABLE site_settings ADD CONSTRAINT site_settings_singleton_check CHECK (id = 1)');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
