<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;

    protected $table = 'tickets'; 

    protected $fillable = [
        'subject',     
        'recipients',  
        'status',      
    ];

    public $timestamps = true; 
}
