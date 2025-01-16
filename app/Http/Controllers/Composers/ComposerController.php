<?php

namespace App\Http\Controllers\Composers;

use App\Http\Controllers\Controller;

class ComposerController extends Controller
{
    public function index()
    {
        // Cache composers for fast retrieval
        $composers = Cache::remember('composers', 60, function () {
            return Composer::select('id', 'name')->paginate(10);
        });

        return response()->json($composers);
    }

    public function show($id)
    {
        // Cache specific composer
        $composer = Cache::remember("composer_{$id}", 60, function () use ($id) {
            return Composer::findOrFail($id);
        });

        return response()->json($composer);
    }
}