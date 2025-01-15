<?php

namespace App\Http\Controllers\MusicScores;

use App\Http\Controllers\Controller;

class MusicScoreController extends Controller
{
    public function index()
    {
        // Cache the music scores for fast retrieval
        $musicScores = Cache::remember('music_scores', 60, function () {
            return MusicScore::select('id', 'title', 'composer', 'score_pdf')
                ->with(['composer', 'category']) // eager load relationships
                ->paginate(10); // Limit to 10 per page for efficient loading
        });

        return response()->json($musicScores);
    }

    public function show($id)
    {
        // Cache the specific music score
        $musicScore = Cache::remember("music_score_{$id}", 60, function () use ($id) {
            return MusicScore::with(['composer', 'category'])
                ->findOrFail($id);
        });

        return response()->json($musicScore);
    }

    public function favorite($id)
    {
        // Logic to add a score to favorites
        $user = auth()->user();
        $user->favorites()->attach($id);

        return response()->json(['message' => 'Added to favorites']);
    }

    public function unfavorite($id)
    {
        // Logic to remove a score from favorites
        $user = auth()->user();
        $user->favorites()->detach($id);

        return response()->json(['message' => 'Removed from favorites']);
    }
}
