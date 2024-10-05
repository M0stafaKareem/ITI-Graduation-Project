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
        Schema::dropIfExists('sessions');
        Schema::create('sessions', function (Blueprint $table) {
			$table->id();   
            $table->timestamps();
            $table->date('session_date');
            $table->string(column: 'court_decision')->nullable();
            $table->string('session_events')->nullable();
            $table->string('session_requirements')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->softDeletes();
            $table->bigInteger('case_id')->unsigned()->nullable();
            $table->foreign('case_id')
            ->references('id')->on('cases')
            ->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
