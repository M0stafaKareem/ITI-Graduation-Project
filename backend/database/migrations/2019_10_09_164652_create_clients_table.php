<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('clients')) {
            Schema::create('clients', function (Blueprint $table) {
                $table->id();
                $table->string('name');

                $table->unsignedBigInteger('country_id')->nullable();
                $table->foreign('country_id')->references('id')
                    ->on('countries')->onDelete('SET NULL');

                // $table->unsignedBigInteger('state_id')->nullable()->unsigned();
                // $table->foreign('state_id')->references('id')
                //     ->on('states')->onDelete('SET NULL');

                $table->unsignedBigInteger('city_id')->nullable()->unsigned();
                $table->foreign('city_id')->references('id')
                    ->on('cities')->onDelete('SET NULL');

                $table->unsignedBigInteger('client_category_id')->nullable();
                $table->foreign('client_category_id')->references('id')
                    ->on('client_categories')->onDelete('SET NULL');


                $table->enum('role', ['Defendant', 'Plaintiff', 'Accused', 'Victim', 'Witness', 'Other'])->default('Defendant');

                $table->string('mobile')->nullable();
                $table->string('email')->nullable();
                $table->string('gender')->default(0);
                $table->text('address')->nullable();
                $table->longText('description')->nullable();

                $table->softDeletes();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
