<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CasesParties extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_id',
        'party_id',
        'name',
    ];
    protected $table = 'cases_parties';
}
