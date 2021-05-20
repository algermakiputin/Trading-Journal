<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTradeResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trade_results', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('trade_id');
            $table->integer('win');
            $table->double('gain_loss_percentage');
            $table->double('gain_loss_amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trade_results');
    }
}
