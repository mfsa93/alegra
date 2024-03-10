<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ingredients')->insert([
            ['name' => 'Tomato', 'quantity' => 5],
            ['name' => 'Lemon', 'quantity' => 5],
            ['name' => 'Potato', 'quantity' => 5],
            ['name' => 'Rice', 'quantity' => 5],
            ['name' => 'Ketchup', 'quantity' => 5],
            ['name' => 'Lettuce', 'quantity' => 5],
            ['name' => 'Onion', 'quantity' => 5],
            ['name' => 'Cheese', 'quantity' => 5],
            ['name' => 'Meat', 'quantity' => 5],
            ['name' => 'Chicken', 'quantity' => 5],
        ]);
    }
}
