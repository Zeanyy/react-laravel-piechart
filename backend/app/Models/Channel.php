<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    /* Ustawienie nazwy tabeli */
    protected $table = "channels";

    /* Wyłączenie automatycznego zarządzania znacznikami czasowymi (`created_at`, `updated_at`) */
    public $timestamps = false;

    /* Możliwość edycji pól `name` i `quantity` */
    protected $fillable = [
        'name',
        'quantity'
    ];
}
