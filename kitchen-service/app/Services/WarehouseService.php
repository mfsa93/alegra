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
        $response = Http::post($this->baseUrl, [
            'ingredients' => $ingredients,
        ]);

        Log::info($response);
        if ($response->successful()) {
            return true;
        }

        return false;
    }
}
