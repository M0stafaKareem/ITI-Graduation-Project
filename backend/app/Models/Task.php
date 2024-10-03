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
<<<<<<< HEAD
        'user_id',   
        'due_date',   
=======
        'lawyer_id',   
>>>>>>> 78af8b2 ("adjusting Event table , relate it to lawyers")
    ];
    public function lawyer(){
        return $this->belongsTo(Lawyer::class);
    }
}
