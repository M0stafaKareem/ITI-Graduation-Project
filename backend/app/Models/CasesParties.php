<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CasesParties extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'case_id',
        'party_id',
        'name',
    ];
    protected $table = 'cases_parties';
}
