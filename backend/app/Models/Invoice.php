<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        
        
     '  client_id',
    ];
    public function payment(){
        return $this->hasMany(Payment::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }   
}
