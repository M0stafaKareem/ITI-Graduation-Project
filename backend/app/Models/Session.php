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
        'case_id',
        'session_number',
        'session_date',
        'happened' ,
        'court_decision',
        'requirements'
    ];
    //table
    protected $table = 'Csessions';
}
