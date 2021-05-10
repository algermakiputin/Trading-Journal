<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equities', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('date'); 
            $table->double('total_equity');
            $table->double('remaining_cash');
            $table->string('action');
            $table->integer('action_reference_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equities');
    }
}
