<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChannelController as ChannelController;

/* Route do pobierania listy kanałów */
Route::get('/channels', [ChannelController::class, 'index']);

/* Route do usuwania wybranego kanału */
Route::delete('/delete/{channel}', [ChannelController::class, 'destroy']);

/* Route do dodawania nowego kanału */
Route::post('/add', [ChannelController::class, 'store']);

/* Route do edycji wybranego kanału */
Route::put('/edit/{channel}', [ChannelController::class, 'update']);