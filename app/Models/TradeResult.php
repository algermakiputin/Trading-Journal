<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradeResult extends Model
{
    use HasFactory;

    protected $fillable = ['trade_id', 'win', 'gain_loss_percentage', 'gain_loss_amount'];
}
