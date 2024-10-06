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
        if(!Schema::hasTable('expenses')) {
            
            Schema::create('expenses', function (Blueprint $table) {
                $table->id();
                $table->timestamps();
                $table->string('expense_name');
                $table->integer('amount');
                $table->softDeletes();
                $table->foreignId('budget_id')->constrained()->references('id')->on('budgets')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
