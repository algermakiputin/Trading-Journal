<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'shares', 'stock_code', 'date','gain_loss'];
    
    public function transactions() {

        return $this->hasMany(Transaction::class, 'trade_id');
    }
}
