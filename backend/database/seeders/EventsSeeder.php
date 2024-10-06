<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class EventsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('events')->insert([
                'title' => $faker->sentence(),
                'description' => $faker->sentence(),
                'guest_name' => $faker->name(),
                'guest_email' => $faker->email(),
                'start' => $faker->dateTimeBetween('now', '+1 year'),
                'end' => $faker->dateTimeBetween('+1 year', '+2 years'),
                'backgroundColor' => $faker->hexColor(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
