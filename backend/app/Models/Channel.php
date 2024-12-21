<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $table = "channels";

    public $timestamps = false;

    protected $fillable = [
        'name',
        'quantity'
    ];
}
