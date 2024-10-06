<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class TasksSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('tasks')->insert([
                'due_date' => $faker->date(),
                'title' => $faker->sentence(),
                'description' => $faker->sentence(),
                'is_completed' => $faker->boolean(),
                'lawyer_id' => $faker->numberBetween(1, 10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
