<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'is_completed',  
        'lawyer_id',   
        'due_date',   
    ];
    public function lawyer(){
        return $this->belongsTo(Lawyer::class);
    }
}
