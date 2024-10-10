<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ClientsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('clients')->insert([
                'name' => $faker->firstName() . ' ' . $faker->lastName(),
                'country_id' => $faker->numberBetween(1, 5),
                'state_id' => $faker->numberBetween(1, 5),
                'city_id' => $faker->numberBetween(1, 10),
                'client_category_id' => $faker->numberBetween(1, 5),
                'role' => $faker->randomElement(['Defendant', 'Plaintiff', 'Accused', 'Victim', 'Witness', 'Other']),
                'mobile' => $faker->phoneNumber(),
                'email' => $faker->email(),
                'gender' => $faker->boolean(),
                'address' => $faker->address(),
                'description' => $faker->realText(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
