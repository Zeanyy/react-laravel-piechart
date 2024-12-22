<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChannelController as ChannelController;

Route::get('/channels', [ChannelController::class, 'index']);
Route::delete('/delete/{channel}', [ChannelController::class, 'destroy']);
Route::post('/add', [ChannelController::class, 'store']);
Route::put('/edit/{channel}', [ChannelController::class, 'update']);