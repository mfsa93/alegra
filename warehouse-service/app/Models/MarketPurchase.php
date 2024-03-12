<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketPurchase extends Model
{
    use HasFactory;
    protected $fillable = ['ingredient_name', 'quantity'];
}
