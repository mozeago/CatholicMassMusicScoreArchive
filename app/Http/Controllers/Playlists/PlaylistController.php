<?php

namespace App\Http\Controllers\Playlists;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Cache playlists for fast retrieval
        $playlists = Cache::remember('playlists', 60, function () {
            return Playlist::select('id', 'name', 'user_id')->paginate(10);
        });

        return response()->json($playlists);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Cache specific playlist
        $playlist = Cache::remember("playlist_{$id}", 60, function () use ($id) {
            return Playlist::findOrFail($id);
        });

        return response()->json($playlist);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
