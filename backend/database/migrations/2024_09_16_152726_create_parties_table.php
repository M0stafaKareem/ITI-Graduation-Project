<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
		Schema::create('parties', function (Blueprint $table) {
			$table->bigIncrements('id');

			$table->string('involvment')->nullable();
			
			$table->timestamps();
            $table->softDeletes()->nullable();


		});
	}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cases');
    }
};
