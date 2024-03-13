<?php

namespace App\Http\Controllers;

use App\Models\MarketPurchase;

class MarketPurchaseController extends Controller
{
    public function index()
    {
        $marketPurchases = MarketPurchase::paginate(10);

        return response()->json($marketPurchases);
    }
}
