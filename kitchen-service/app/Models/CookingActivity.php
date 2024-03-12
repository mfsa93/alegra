<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CookingActivity extends Model
{
    use HasFactory;
    protected $fillable = ['recipes_id', 'started_at', 'completed_at'];
    
    public function recipes()
    {
        return $this->belongsTo(Recipes::class);
    }
}
