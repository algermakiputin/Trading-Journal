<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['date','stock_code', 'price', 'shares', 'fees', 'net', 'trade_id','type','gain_loss_percentage'];
}
