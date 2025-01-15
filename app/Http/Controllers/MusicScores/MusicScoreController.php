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
    // guest list all the available score sheets
    public function guestIndex()
    {
        $scores = MusicScore::select('id', 'title', 'composer', 'category_id', 'created_at')
            ->with('category:id,name') // Eager load category for efficiency
            ->paginate(10);

        return view('music-scores.guest-index', compact('scores'));
    }
    // guest preview a score sheet
    public function preview($id)
    {
        $score = MusicScore::select('id', 'title', 'description', 'file_path', 'composer', 'category_id', 'created_at')
            ->with('category:id,name')
            ->findOrFail($id);

        return view('music-scores.preview', compact('score'));
    }
// Allow guests to download a music score
    public function download($id)
    {
        $score = MusicScore::select('score_pdf', 'title')->findOrFail($id);

        $filePath = storage_path('app/public/' . $score->score_pdf);

        if (!file_exists($filePath)) {
            return abort(404, 'File not found.');
        }

        return Response::download($filePath, $score->title . '.pdf');
    }
    // Share a music score (generate shareable link)
    public function share($id)
    {
        $score = MusicScore::select('id', 'title')->findOrFail($id);

        $shareUrl = route('music-scores.preview', ['id' => $score->id]);

        return view('music-scores.share', compact('score', 'shareUrl'));
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
