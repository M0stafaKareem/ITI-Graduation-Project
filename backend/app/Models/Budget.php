<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Budget extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable=[
        'budget_name',
        'amount',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}
