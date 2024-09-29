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
        Schema::create('opposing_lawyers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('phone_number')->unique(); 
            $table->string(column: 'national_id')->unique();
            $table->string(column: 'address');

            $table->unsignedBigInteger('lawyer_id')->nullable();  
            $table->foreign('lawyer_id')->
            references('id')->on('lawyers')->onDelete('SET NULL'); 
 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opposing_lawyers');
    }
};
