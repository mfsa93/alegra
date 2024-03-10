<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Services\MarketService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IngredientController extends Controller
{
    protected $marketService;

    public function __construct(MarketService $marketService)
    {
        $this->marketService = $marketService;
    }

    public function index(): JsonResponse
    {
        $ingredients = Ingredient::all();
        return response()->json($ingredients);
    }

    public function getIngredients(Request $request): JsonResponse
    {
        $ingredientsRequested = $request->ingredients;
        $ingredientsStatus = [];

        foreach ($ingredientsRequested as $ingredientName) {
            $ingredientsStatus[$ingredientName] = $this->processIngredient($ingredientName);
        }

        return response()->json($ingredientsStatus);
    }

    private function processIngredient($ingredientName): string
    {
        $ingredient = Ingredient::where('name', $ingredientName)->first();
        Log::info($ingredient);
        if (!$ingredient || ($ingredient->quantity === 0 && !$this->fullFillIngredient($ingredientName))) {
            return 0;
        }

        if (!$this->decreaseIngredient($ingredientName)) {
            return 0;
        }

        return 1;
    }

    private function fullFillIngredient($name, $attemps = 3): bool
    {
        $quantity = $this->marketService->buyIngredient($name);
        Log::info($quantity);
        if (!$quantity) {
            return $attemps ? $this->fullFillIngredient($name, $attemps - 1) : 0;
        }

        Ingredient::where(
            ['name' => $name]
        )->update(['quantity' => $quantity]);
        
        return true;
    }

    private function decreaseIngredient($name): bool
    {
        $ingredient = Ingredient::where('name', $name)->first();

        if (!$ingredient || $ingredient->quantity <= 0) {
            return false;
        }

        $ingredient->decrement('quantity');
        return true;
    }
}
