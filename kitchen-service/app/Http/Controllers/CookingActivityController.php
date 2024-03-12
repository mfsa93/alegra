<?php

namespace App\Http\Controllers;

use App\Models\CookingActivity;

class CookingActivityController extends Controller
{
    public function index()
    {
        $cookingActivities = CookingActivity::with(['recipes.ingredients'])->get();
        return response()->json($cookingActivities);
    }
}
