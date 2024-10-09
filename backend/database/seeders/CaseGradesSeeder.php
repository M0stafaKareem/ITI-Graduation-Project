<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class CaseGradesSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            DB::table('case_grades')->insert([
                'name' => $faker->word(),
                'description' => $faker->realText(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
