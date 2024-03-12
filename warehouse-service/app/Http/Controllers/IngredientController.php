<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\MarketPurchase;
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
        Log::info($ingredientsRequested);
        $ingredientsStatus = [];

        foreach ($ingredientsRequested as $ingredientName => $quantityNeeded) {
            $ingredientsStatus[$ingredientName] = $this->processIngredient(
                $ingredientName, $quantityNeeded
            );
        }

        return response()->json($ingredientsStatus);
    }

    private function processIngredient($ingredientName, $quantityNeeded): bool
    {
        $ingredient = Ingredient::where('name', $ingredientName)->first();

        if (
            !$ingredient ||
            ($ingredient->quantity < $quantityNeeded &&
                !$this->fullFillIngredient(
                    $ingredientName, $quantityNeeded - $ingredient->quantity
                )
            )
        ) {
            return false;
        }

        return $this->decreaseIngredient($ingredientName, $quantityNeeded);
    }

    private function fullFillIngredient($name, $quantityNeeded, $attemps = 3, $quantityGetted = 0): bool
    {
        $quantityGetted = $quantity = $this->marketService->buyIngredient($name);
        
        MarketPurchase::create([
            'ingredient_name' => $name,
            'quantity' => $quantityGetted,
        ]);

        if (!$quantity) {
            return $attemps ? $this->fullFillIngredient($name, $attemps - 1, $quantity) : 0;
        }

        Ingredient::where(
            ['name' => $name]
        )->first()->increment('quantity', $quantity);

        if ($quantityGetted < $quantityNeeded) {
            return $attemps ? $this->fullFillIngredient($name, $attemps) : 0;
        }

        return true;
    }

    private function decreaseIngredient($name, $quantityNeeded): bool
    {
        $ingredient = Ingredient::where('name', $name)->first();

        if (!$ingredient || $ingredient->quantity <= 0) {
            return false;
        }

        $ingredient->decrement('quantity', $quantityNeeded);
        return true;
    }
}
