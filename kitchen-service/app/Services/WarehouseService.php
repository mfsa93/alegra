<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WarehouseService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('WAREHOUSE_API_URL');
    }

    /**
     * Verifica la disponibilidad de los ingredientes en el servicio de bodega.
     *
     * @param array $ingredients
     * @return bool
     */
    public function checkIngredientsAvailability(array $ingredients): bool
    {
        $response = Http::post(env('WAREHOUSE_API'), [
            'ingredients' => $ingredients,
        ]);
    
        Log::info($response);
        // we dont need more that the successful response
        if ($response->successful()) {
            return true;
        }

        return false;
    }
}
