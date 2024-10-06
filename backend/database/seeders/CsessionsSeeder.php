<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class CsessionsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('csessions')->insert([
                'session_date' => $faker->date(),
                'requirements' => $faker->sentence(),
                'happened' => $faker->sentence(),
                'court_decision' => $faker->sentence(),
                'case_id' => $faker->numberBetween(1, 50),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
