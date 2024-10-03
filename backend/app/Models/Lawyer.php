<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lawyer extends Model
{

    protected $table = 'lawyers';
    protected $fillable = ['name', 'phone_number', 'nation_id', 'address'];

    public function opposingLawyer()
    {
        return $this->hasMany(OpposingLawyer::class, 'lawyer_id');
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    use SoftDeletes;
    use HasFactory;
}
