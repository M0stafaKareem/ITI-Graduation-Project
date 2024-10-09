<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('expenses')->insert([
            [
                'expense_name' => 'Facebook Ads',
                'amount' => 1500,
                'budget_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'expense_name' => 'Youtube Ads',
                'amount' => 2000,
                'budget_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'expense_name' => 'Bloggers Ads',
                'amount' => 500,
                'budget_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'expense_name' => 'Website Development',
                'amount' => 5000,
                'budget_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'expense_name' => 'Mobile App Development',
                'amount' => 3000,
                'budget_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'expense_name' => 'Office Supplies',
                'amount' => 1000,
                'budget_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'expense_name' => 'Transportations',
                'amount' => 500,
                'budget_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
