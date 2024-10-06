<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class SessionsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('sessions')->insert([
                'id' => $faker->uuid(),
                'user_id' => $faker->numberBetween(1, 10),
                'ip_address' => $faker->ipv4(),
                'user_agent' => $faker->userAgent(),
                'payload' => $faker->text(500),
                'last_activity' => $faker->unixTime(),
            ]);
        }
    }
}
