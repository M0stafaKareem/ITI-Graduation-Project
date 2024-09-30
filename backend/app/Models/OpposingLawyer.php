<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Lawyer;
use Illuminate\Database\Eloquent\SoftDeletes;

class OpposingLawyer extends Model
{
    protected $table = 'opposing_lawyers';
    protected $fillable = ['name', 'phone_number', 'national_id', 'address','lawyer_id'];
    
    public function lawyer()
    {
        return $this->belongsTo(Lawyer::class, 'lawyer_id');
    }

    use SoftDeletes;
    use HasFactory;
}
