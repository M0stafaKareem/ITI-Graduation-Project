<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable=[
    'title',
    'description',
    'guest_email',
    'guest_name',
    'start_date',
    'end_date'];
}
