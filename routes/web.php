<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\TransactionsController;
use App\Http\Controllers\TradesController;
use App\Http\Controllers\api\BankController;
use App\Http\Controllers\EquitiesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
}); 

Route::get('api/transactions', [TransactionsController::class, 'fetch_all']);
Route::post('api/transactions/store', [TransactionsController::class, 'store']);
Route::get('positions', [ TradesController::class, 'positions']);

Route::post('api/transactions/sell', [TransactionsController::class, 'sell']);
Route::post('api/bank/create', [BankController::class, 'store']);
Route::get('get_equities', [EquitiesController::class, 'getEquities']);
