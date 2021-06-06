<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equity extends Model
{
    use HasFactory;
    protected $fillable = ['total_equity', 'remaining_cash', 'action', 'action_reference_id','date','profile_id'];
}
