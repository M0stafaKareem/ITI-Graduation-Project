<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable=[
        'session_number',
        'session_name',
        'session_date',
        'circle',
        'session_result' ,
        'court_decision'];
}
