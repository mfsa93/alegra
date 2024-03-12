<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MarketService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('MARKET_API_URL');
    }

    public function buyIngredient($ingredientName)
    {
        try {
            $response = Http::get($this->baseUrl, [
                'ingredient' => strtolower($ingredientName)
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['quantitySold'] ?? 0;
            } else {
                Log::error("Failed to buy ingredient {$ingredientName}: HTTP status {$response->status()}");
                return 0;
            }
        } catch (\Exception $e) {
            Log::error("Error buying ingredient {$ingredientName}: " . $e->getMessage());
            return 0;
        }
    }
}
