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
        Schema::dropIfExists('Csessions');
        Schema::create('Csessions', function (Blueprint $table) {
			$table->id();   
            $table->date('session_date');
            $table->string('requirements')->nullable();
            $table->string('happened')->nullable();
            $table->string(column: 'court_decision')->nullable();
            $table->bigInteger('case_id')->nullable()->unsigned();
			$table->foreign('case_id')->references('id')
            ->on('cases')->onDelete('SET NULL');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Csessions');
    }
};
