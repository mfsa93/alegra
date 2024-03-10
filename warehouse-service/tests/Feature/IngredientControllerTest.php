<?php

namespace Tests\Feature;

use App\Services\MarketService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Ingredient;

class IngredientControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_lists_all_ingredients()
    {
        $ingredient = Ingredient::create(['name' => 'Tomato', 'quantity' => 5]);

        $response = $this->get('/api/ingredients');

        $response->assertStatus(200);
        
        $response->assertJson([[
            'name' => 'Tomato',
            'quantity' => 5,
        ]]);
    }

    /** @test */
    public function it_processes_ingredient_correctly()
    {
        $this->withoutExceptionHandling();
        $ingredient = Ingredient::create(['name' => 'Lemon', 'quantity' => 0]);

        $this->mock(MarketService::class, function ($mock) use ($ingredient) {
            $mock->shouldReceive('buyIngredient')
                ->with('Lemon')
                ->andReturn(5);
        });

        $response = $this->postJson('/api/ingredients', ['ingredients' => ['Lemon']] );
        $response->assertStatus(200)
            ->assertJson(['Lemon' => 1]);

        $this->assertDatabaseHas('ingredients', [
            'name' => 'Lemon',
            'quantity' => 4,
        ]);
    }
}
