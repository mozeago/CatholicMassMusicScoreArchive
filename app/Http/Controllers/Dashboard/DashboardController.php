<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch the music scores created by the authenticated user
        $musicScores = auth()->user()->musicScores; // Using the 'musicScores' relationship defined in the User model

        return Inertia::render('Dashboard', [
            'musicScores' => $musicScores,
        ]);

    }
}
