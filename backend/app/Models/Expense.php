<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'expense_name',
        'amount',
        'budget_id',
    ];

    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }
}
