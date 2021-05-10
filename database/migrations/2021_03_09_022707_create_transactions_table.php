<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            
            $table->id();
            $table->string('date');
            $table->string('stock_code');
            $table->string('type');
            $table->double('price');
            $table->unsignedInteger('shares');
            $table->double('fees');
            $table->double('net'); 
            $table->unsignedInteger('trade_id');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
