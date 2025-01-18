<?php

namespace App\Http\Controllers\MusicScores;

use App\Http\Controllers\Controller;
use App\Models\MusicScore\MusicScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Response;

class MusicScoreController extends Controller
{
    // Display a list of music scores
    public function index()
    {
        $musicScores = Cache::remember('music_scores', 60, function () {
            return MusicScore::select('id', 'title', 'composer', 'score_pdf')
                ->with(['composer', 'category']) // eager load relationships
                ->paginate(10);
        });

        return response()->json($musicScores);
    }

    // Display music scores for guests
    public function guestIndex()
    {
        $scores = MusicScore::select('id', 'title', 'composer', 'created_at')->paginate(10);

        return view('music-scores.index', compact('scores'));
    }

    // Preview a specific score sheet for guests
    public function preview($id)
    {
        $score = MusicScore::select('id', 'title', 'score_pdf', 'composer', 'created_at')
            ->with('category:id,name')
            ->findOrFail($id);

        return view('music-scores.preview', compact('score'));
    }

    // Download a music score
    public function download($id)
    {
        $score = MusicScore::select('score_pdf', 'title')->findOrFail($id);

        $filePath = storage_path('app/public/' . $score->score_pdf);

        if (!file_exists($filePath)) {
            return abort(404, 'File not found.');
        }

        return Response::download($filePath, $score->title . '.pdf');
    }

    // Share a music score (generate a shareable link)
    public function share($id)
    {
        $score = MusicScore::select('id', 'title')->findOrFail($id);

        $shareUrl = route('music-scores.preview', ['id' => $score->id]);

        return view('music-scores.share', compact('score', 'shareUrl'));
    }

    // Display details of a specific music score
    public function show($id)
    {
        $musicScore = Cache::remember("music_score_{$id}", 60, function () use ($id) {
            return MusicScore::with(['composer', 'category'])->findOrFail($id);
        });

        return response()->json($musicScore);
    }

    // Add a music score to user's favorites
    public function favorite($id)
    {
        $user = auth()->user();
        $user->favorites()->attach($id);

        return response()->json(['message' => 'Added to favorites']);
    }

    // Remove a music score from user's favorites
    public function unfavorite($id)
    {
        $user = auth()->user();
        $user->favorites()->detach($id);

        return response()->json(['message' => 'Removed from favorites']);
    }

    // Render the upload form
    public function create()
    {
        return Inertia::render('MusicScores/Upload');
    }

    // Handle the upload and save the music score
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'composer' => 'required|string|max:255',
            'lyrist' => 'nullable|string|max:255',
            'year_composed' => 'nullable|integer',
            'midi_file' => 'nullable|file|mimes:mid|max:5120',
            'score_pdf' => 'required|file|mimes:pdf|max:10240',
            'chorus' => 'nullable|string',
            'stanzas' => 'nullable|json',
        ]);

        // Handle file uploads
        $midiPath = $request->hasFile('midi_file') ? $request->file('midi_file')->store('music-scores/midi', 'public') : null;
        $pdfPath = $request->file('score_pdf')->store('music-scores/pdf', 'public');

        // Create the music score entry
        MusicScore::create([
            'title' => $request->input('title'),
            'ulid' => Str::ulid(),
            'composer' => $request->input('composer'),
            'lyrist' => $request->input('lyrist'),
            'year_composed' => $request->input('year_composed'),
            'midi_file' => $midiPath,
            'score_pdf' => $pdfPath,
            'chorus' => $request->input('chorus'),
            'stanzas' => $request->input('stanzas'),
            'uploaded_by' => auth()->user()->id,
        ]);

        return redirect()->route('music-scores.guest.index')->with('success', 'Music score uploaded successfully!');
    }
}
