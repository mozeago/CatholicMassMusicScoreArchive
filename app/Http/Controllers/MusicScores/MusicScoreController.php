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
            return MusicScore::select([
                'id',
                'ulid',
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
                'time_signature',
                'mass_section',
                'season',
                'key_signature',
                'keyboard_organ',
                'created_at',
                'updated_at',
            ])
                ->paginate(10);
        });

        return Inertia::render('Welcome', [
            'canLogin' => route('login') ? true : false,
            'canRegister' => route('register') ? true : false,
            'laravelVersion' => app()->version(),
            'phpVersion' => PHP_VERSION,
            'appName' => config('app.name'),
            'musicScores' => $musicScores->items(), // Pass music scores to the frontend
        ]);
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
            'time_signature' => $request->input('time_signature'),
            'mass_section' => $request->input('mass_section'),
            'season' => $request->input('season'),
            'key_signature' => $request->input('key_signature'),
            'keyboard_organ' => $request->input('keyboard_organ'),
        ]);

        return redirect()->route('music-scores.guest.index')->with('success', 'Music score uploaded successfully!');
    }
    // Show the form for editing a music score
    public function edit($ulid)
    {
        $score = MusicScore::where('ulid', $ulid)->firstOrFail();

        // Ensure the user has permission to edit the score (optional)
        if ($score->uploaded_by != auth()->user()->id) {
            return redirect()->route('music-scores.index')->with('error', 'Unauthorized action.');
        }

        return Inertia::render('MusicScores/Edit', [
            'musicScore' => $score,
        ]);
    }

    // Update a specific music score
    public function update(Request $request, $ulid)
    {
        \Log::info('Raw Request Body: ' . file_get_contents('php://input'));
        \Log::info('Before Validation', $request->all());
        $validated = $request->validate([
            'title' => 'required|string',
            'composer' => 'nullable|string|max:255',
            'lyrist' => 'nullable|string|max:255',
            'year_composed' => 'nullable|date_format:Y',
            'time_signature' => 'required|string',
            'season' => 'required|string',
            'mass_section' => 'required|string',
            'key_signature' => 'required|string',
            'midi_file' => 'nullable|file|mimes:mid,midi,smf,kar',
            'score_pdf' => 'nullable|file|mimes:pdf',
            'chorus' => 'nullable|string',
            'stanzas' => 'nullable',
            'uploaded_by' => 'required|integer|exists:users,id',
        ]);
        \Log::info('After Validation', $validated);
        try {
            // Fetch the music score record
            $score = MusicScore::where('ulid', $ulid)->firstOrFail();

            // Check if the user has permission to update the score
            if ($score->uploaded_by != auth()->user()->id) {
                \Log::error('Unauthorized update attempt.', [
                    'user_id' => auth()->user()->id,
                    'score_ulid' => $ulid,
                ]);
                return redirect()->route('music-scores.index')->with('error', 'Unauthorized action.');
            }
            // Validate the incoming data
            $data = $validated;
            \Log::info('Validated Data:', $data); // Log the validated data

            if (isset($data['stanzas']) && is_string($data['stanzas'])) {
                $data['stanzas'] = json_decode($data['stanzas'], true);
            }
            // Handle MIDI file upload
            if ($request->hasFile('midi_file')) {
                if ($score->midi_file) {
                    \Log::info('Deleting old MIDI file: ' . $score->midi_file); // Log deletion
                    Storage::disk('public')->delete($score->midi_file);
                }
                $data['midi_file'] = $request->file('midi_file')->store('music-scores/midi', 'public');
                \Log::info('Uploaded new MIDI file: ' . $data['midi_file']);
            }
            // Handle PDF file upload
            if ($request->hasFile('score_pdf')) {
                if ($score->score_pdf) {
                    \Log::info('Deleting old score PDF: ' . $score->score_pdf); // Log deletion
                    Storage::disk('public')->delete($score->score_pdf);
                }
                $data['score_pdf'] = $request->file('score_pdf')->store('music-scores/pdf', 'public');
                \Log::info('Uploaded new score PDF: ' . $data['score_pdf']);
            }

            // Update the music score record
            $score->update($data);
            \Log::info('Music score updated successfully.', ['score_ulid' => $ulid]);

            return redirect()->route('music-scores.index')->with('success', 'Music score updated successfully.');
        } catch (\Exception $e) {
            // Log any errors that occur
            \Log::error('Error updating music score: ' . $e->getMessage(), [
                'exception' => $e,
                'score_ulid' => $ulid,
            ]);
            return redirect()->route('music-scores.index')->with('error', 'Failed to update music score.');
        }
    }

    // Delete a specific music score
    public function destroy($ulid)
    {
        $score = MusicScore::where('ulid', $ulid)->firstOrFail();

        // Ensure the user has permission to delete the score
        if ($score->uploaded_by != auth()->user()->id) {
            return redirect()->route('music-scores.index')->with('error', 'Unauthorized action.');
        }

        // Delete the score
        $score->delete();

        return redirect()->route('music-scores.index')->with('success', 'Music score deleted successfully.');
    }
}