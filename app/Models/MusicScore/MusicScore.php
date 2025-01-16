<?php

namespace App\Models\MusicScore;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MusicScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'composer',
        'lyrist',
        'year_composed',
        'uploaded_by',
        'downloads',
        'views',
        'likes',
        'shares',
        'favorited',
        'midi_file',
        'score_pdf',
        'chorus',
        'stanzas',
    ];

    protected $casts = [
        'stanzas' => 'array', // Automatically cast JSON to array
    ];

    // Relationship with User who uploaded the music score
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
