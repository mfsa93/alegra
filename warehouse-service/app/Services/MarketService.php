<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class MarketService
{
    protected $client;
    protected $baseUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->baseUrl = env('MARKET_API_URL');
        Log::info($this->baseUrl);
    }

    public function buyIngredient($ingredientName)
    {
        try {
            $response = $this->client->request('GET', $this->baseUrl, [
                'query' => ['ingredient' => $ingredientName]
            ]);
            $data = json_decode($response->getBody()->getContents(), true);
            return $data['quantitySold'] ?? 0;
        } catch (\Exception $e) {
            Log::error("Error buying ingredient {$ingredientName}: " . $e->getMessage());
            return 0;
        }
    }
}
