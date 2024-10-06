<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class PartiesSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('parties')->insert([
                'involvment' => $faker->word(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
