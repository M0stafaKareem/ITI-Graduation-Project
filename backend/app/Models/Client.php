<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'country_id',
        'city_id',
        'state_id',
        'role',
        'mobile',
        'email',
        'gender',
        'address',
        'description',
    ];
}
