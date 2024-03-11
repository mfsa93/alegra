<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use App\Models\Recipes;
use Illuminate\Database\Seeder;

class RecipesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = [
            [
                'name' => 'Tomato Soup',
                'ingredients' => [
                    ['name' => 'Tomato', 'quantity' => 4],
                    ['name' => 'Onion', 'quantity' => 1],
                ],
            ],
            [
                'name' => 'Lemon Chicken',
                'ingredients' => [
                    ['name' => 'Lemon', 'quantity' => 2],
                    ['name' => 'Chicken', 'quantity' => 1],
                ],
            ],
            [
                'name' => 'Potato Salad',
                'ingredients' => [
                    ['name' => 'Potato', 'quantity' => 3],
                    ['name' => 'Lettuce', 'quantity' => 1],
                ],
            ],
            [
                'name' => 'Rice and Chicken',
                'ingredients' => [
                    ['name' => 'Rice', 'quantity' => 2],
                    ['name' => 'Ketchup', 'quantity' => 1],
                    ['name' => 'Chicken', 'quantity' => 1],
                ],
            ],
            [
                'name' => 'Cheese and Tomato Pizza',
                'ingredients' => [
                    ['name' => 'Tomato', 'quantity' => 3],
                    ['name' => 'Cheese', 'quantity' => 2],
                ],
            ],
            [
                'name' => 'Meat Stew',
                'ingredients' => [
                    ['name' => 'Meat', 'quantity' => 2],
                    ['name' => 'Potato', 'quantity' => 2],
                    ['name' => 'Onion', 'quantity' => 1],
                    ['name' => 'Ketchup', 'quantity' => 1],
                ],
            ],
        ];

        foreach ($recipes as $recipeData) {
            $recipe = Recipes::create(['name' => $recipeData['name']]);

            foreach ($recipeData['ingredients'] as $ingredientData) {
                $ingredient = Ingredient::where('name', $ingredientData['name'])->first();
                if($ingredient) {
                    $recipe->ingredients()->attach($ingredient->id, ['quantity' => $ingredientData['quantity']]);
                }
            }
        }
    }
}
