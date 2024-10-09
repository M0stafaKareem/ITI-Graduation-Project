<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('budgets')->insert([
            [
                'budget_name' => 'Marketing',
                'amount' => 10000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'budget_name' => 'Development',
                'amount' => 20000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'budget_name' => 'Operations',
                'amount' => 9000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
