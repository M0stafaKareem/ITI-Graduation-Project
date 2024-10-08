<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{

    use HasFactory;
    protected $fillable = [ "email", "otp", "expire_at"];
    protected $table = "otp";
    protected $primaryKey ="email";
}
