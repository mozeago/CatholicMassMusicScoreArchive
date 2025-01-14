<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'ulid',
        'name',
        'email',
        'domain',
        'logo',
    ];

    protected $casts = [
        'ulid' => 'string', // Ensure ULID is handled as a string
    ];

    // Define relationship to users
    public function users()
    {
        return $this->hasMany(User::class, 'tenant_ulid', 'ulid');
    }
}
