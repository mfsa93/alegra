<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Recipes;
use App\Models\Ingredient;
use App\Services\WarehouseService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

class RecipesControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_responds_with_no_recipes_available_if_none_exist()
    {
        $response = $this->get('/api/prepare-meal');
        $response->assertStatus(404)->assertJson(['message' => 'No recipes available']);
    }

    /** @test */
    public function it_prepares_a_meal_if_ingredients_are_available()
    {
        $this->mock(WarehouseService::class, function ($mock) {
            $mock->shouldReceive('checkIngredientsAvailability')->andReturn(true);
        });

        $ingredient = Ingredient::create(['name' => 'Tomato']);
        $recipe = Recipes::create(['name' => 'Tomato Soup']);
        $recipe->ingredients()->attach($ingredient->id, ['quantity' => 3]);

        $response = $this->get('/api/prepare-meal');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Meal prepared successfully',
                'recipe' => 'Tomato Soup',
                'ingredients' => ['Tomato' => 3],
            ]);
    }

    /** @test */
    public function it_fails_to_prepare_a_meal_if_ingredients_are_not_available()
    {
        $this->mock(WarehouseService::class, function ($mock) {
            $mock->shouldReceive('checkIngredientsAvailability')->andReturn(false);
        });

        $ingredient = Ingredient::create(['name' => 'Tomato']);
        $recipe = Recipes::create(['name' => 'Tomato Soup']);
        $recipe->ingredients()->attach($ingredient->id, ['quantity' => 3]);

        $response = $this->get('/api/prepare-meal');

        $response->assertStatus(400)
            ->assertJson(['message' => 'Failed to prepare meal due to missing ingredients']);
    }
}
