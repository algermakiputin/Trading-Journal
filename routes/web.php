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
Route::get('/logs', function () {
    return view('welcome');
}); 
Route::get('/analytics', function () {
    return view('welcome');
}); 
Route::get('/monthly-tracker', function () {
    return view('welcome');
}); 

Route::get('api/transactions', [TransactionsController::class, 'fetch_all']);
Route::post('api/transactions/store', [TransactionsController::class, 'store']);
Route::get('api/transactions/datatable', [TransactionsController::class, 'datatable']);
Route::get('positions', [ TradesController::class, 'positions']);
Route::get('api/getTopGainers', [ TradesController::class, 'getTopGainers']);
Route::get('api/getTopLosers', [ TradesController::class, 'getTopLosers']);
Route::get('api/getClosedTrades', [ TradesController::class, 'getClosedTrades']);
Route::get('api/monthlyTracker', [ TradesController::class, 'monthlyTracker']);
Route::get('api/tradeSummary', [ TradesController::class, 'tradeSummary']);
Route::get('api/getAccountPerformanceSummary', [ TradesController::class, 'getAccountPerformanceSummary']);

Route::post('api/transactions/sell', [TransactionsController::class, 'sell']);
Route::post('api/bank/create', [BankController::class, 'store']);
Route::get('get_equities', [EquitiesController::class, 'getEquities']);

Route::get('api/equitycurve', [EquitiesController::class,'getEquityCurve']);

Route::get('test', [TransactionsController::class, 'getResult']);
