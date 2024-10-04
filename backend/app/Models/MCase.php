<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MCase extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'case_name',
        'case_date',
        'first_session_date',
        'case_category_id',
        'case_grade_id',
        'client_id',
        'court_id',
        'lawyer_id',
        'opposing_lawyer_id',
        'session_id'
    ];

    protected $casts = [

    ];

    protected $dates = [
        'case_date',
        'first_session_date',
    ];

    protected $table = 'cases';
}
