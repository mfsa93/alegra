<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class IngredientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            'Tomato', 'Lemon', 'Potato', 'Rice', 'Ketchup', 'Lettuce', 'Onion', 'Cheese', 'Meat', 'Chicken'
        ];

        foreach ($ingredients as $ingredientName) {
            Ingredient::firstOrCreate(['name' => $ingredientName]);
        }
    }
}
