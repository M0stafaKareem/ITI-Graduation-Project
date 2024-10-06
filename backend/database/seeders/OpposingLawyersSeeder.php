<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class OpposingLawyersSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            DB::table('opposing_lawyers')->insert([
                'name' => $faker->name(),
                'phone_number' => $faker->phoneNumber(),
                'national_id' => $faker->randomNumber(8),
                'address' => $faker->address(),
                'lawyer_id' => $faker->numberBetween(1, 10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
