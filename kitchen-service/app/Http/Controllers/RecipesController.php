<?php
namespace App\Http\Controllers;
use App\Models\Recipes;
use App\Services\WarehouseService;
use Illuminate\Support\Facades\Log;

class RecipesController extends Controller
{
    protected $warehouseService;

    public function __construct(WarehouseService $warehouseService)
    {
        $this->warehouseService = $warehouseService;
    }

public function prepareRandomMeal()
{
    $recipe = Recipes::inRandomOrder()->with('ingredients')->first();

    Log::info($recipe);
    
    if (!$recipe) {
        return response()->json(['message' => 'No recipes available'], 404);
    }

    $ingredientsNeeded = $recipe->ingredients->mapWithKeys(function ($item) {
        return [$item['name'] => $item->pivot->quantity];
    })->toArray();

    Log::info($ingredientsNeeded);
    
    if ($this->warehouseService->checkIngredientsAvailability($ingredientsNeeded)) {
        return response()->json([
            'message' => 'Meal prepared successfully',
            'recipe' => $recipe->name,
            'ingredients' => $ingredientsNeeded,
        ]);
    } else {
        return response()->json(['message' => 'Failed to prepare meal due to missing ingredients'], 400);
    }
}
}
