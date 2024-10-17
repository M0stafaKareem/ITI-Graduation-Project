<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CasesSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('cases')->insert([
                'case_name' => $faker->sentence(3),
                'case_date' => $faker->date(),
                'first_session_date' => $faker->date(),
                'case_category_id' => $faker->numberBetween(1, 10),
                'case_grade_id' => $faker->numberBetween(1, 5),
                'client_id' => $faker->numberBetween(1, 20),
                'court_id' => $faker->numberBetween(1, 5),
                'lawyer_id' => $faker->numberBetween(1, 10),
                'opposing_lawyer_id' => $faker->numberBetween(1, 10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
