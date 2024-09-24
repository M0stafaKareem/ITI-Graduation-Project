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
		Schema::create('cases', function (Blueprint $table) {
			$table->bigIncrements('id');

			

			$table->string('case_name', 200)->nullable();
			// $table->bigInteger('case_no', 200)->nullable();

			$table->date('case_date')->nullable();

			$table->date('first_session_date')->nullable();
			

			

			$table->bigInteger('case_category_id')->nullable()->unsigned();
			$table->foreign('case_category_id')->references('id')
				->on('case_categories')->onDelete('SET NULL');

			$table->bigInteger('case_grade_id')->nullable()->unsigned();
			$table->foreign('case_grade_id')->references('id')
				->on('case_grades')->onDelete('SET NULL');

			$table->bigInteger('client_id')->nullable()->unsigned();
			$table->foreign('client_id')->references('id')
				->on('clients')->onDelete('SET NULL');


				$table->bigInteger('court_id')->nullable()->unsigned();
            $table->foreign('court_id')->references('id')
                ->on('courts')->onDelete('SET NULL');




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
