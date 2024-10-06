<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersSeeder::class,
            CaseCategoriesSeeder::class,
            CaseGradesSeeder::class,
            ClientCategoriesSeeder::class,
            CourtsSeeder::class,
            EventsSeeder::class,
            ExpensesSeeder::class,
            PartiesSeeder::class,
            SessionsSeeder::class,
            LawyersSeeder::class,
            OpposingLawyersSeeder::class,
            TasksSeeder::class,
            ClientsSeeder::class,
            CasesSeeder::class,
            CasesPartiesSeeder::class,
            CsessionsSeeder::class,
        ]);
    }
}
