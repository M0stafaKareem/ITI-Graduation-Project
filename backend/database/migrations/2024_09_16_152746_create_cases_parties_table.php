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
		Schema::create('cases_parties', function (Blueprint $table) {
			$table->bigIncrements('id');

			$table->bigInteger('case_id')->nullable()->unsigned();
			$table->foreign('case_id')->references('id')
				->on('cases')->onDelete('SET NULL');

			$table->bigInteger('party_id')->nullable()->unsigned();
			$table->foreign('party_id')->references('id')
				->on('parties')->onDelete('SET NULL');


			$table->string('name');
            $table->softDeletes();

			$table->timestamps();

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
