<?php

namespace App\Http\Controllers;

use App\Models\MarketPurchase;

class MarketPurchaseController extends Controller
{
    public function index()
    {
        $marketPurchases = MarketPurchase::all();

        return response()->json($marketPurchases);
    }
}
