<?php

use App\Http\Controllers\Categories\CategoryController;
use App\Http\Controllers\Composers\ComposerController;
use App\Http\Controllers\MusicScores\MusicScoreController;
use App\Http\Controllers\Playlists\PlaylistController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth:web'])->group(function () {
// List all music scores
    Route::get('/music-scores', [MusicScoreController::class, 'index'])->name('music-scores.index');
// Show the form for creating a new music score
    Route::get('/music-scores/create', [MusicScoreController::class, 'create'])->name('music-scores.create');
// Store a new music score
    Route::post('/music-scores', [MusicScoreController::class, 'store'])->name('music-scores.store');
// Display a specific music score
    Route::get('/music-scores/{id}', [MusicScoreController::class, 'show'])->name('music-scores.show');
// Show the form for editing a music score
    Route::get('/music-scores/{id}/edit', [MusicScoreController::class, 'edit'])->name('music-scores.edit');
// Update a specific music score
    Route::put('/music-scores/{id}', [MusicScoreController::class, 'update'])->name('music-scores.update');
// Delete a specific music score
    Route::delete('/music-scores/{id}', [MusicScoreController::class, 'destroy'])->name('music-scores.destroy');
});
// Composers Management
Route::middleware(['auth'])->group(function () {
    Route::resource('composers', ComposerController::class);
});
// Guest Routes that dont need login
// Routes for guests
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/music-scores/{id}/preview', [MusicScoreController::class, 'preview'])->name('music-scores.preview');
    Route::get('/music-scores/{id}/download', [MusicScoreController::class, 'download'])->name('music-scores.download');
    Route::get('/music-scores/{id}/share', [MusicScoreController::class, 'share'])->name('music-scores.share');
});
Route::get('/', [MusicScoreController::class, 'index'])->name('music-scores.guest.index');

// Dashboard (Requires Authentication)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
// Profile Management (Authenticated Users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Categories (Liturgical Seasons and Mass Parts)
Route::middleware(['auth'])->group(function () {
    Route::resource('categories', CategoryController::class);
});
// User Management (Admin Only)
Route::middleware(['auth', 'can:manage-users'])->group(function () {
    Route::resource('users', UserController::class);
});
// Favorites/Playlists
Route::middleware(['auth'])->group(function () {
    // Manage Playlists
    Route::resource('playlists', PlaylistController::class);

    // Add a Score to Favorites
    Route::post('/music-scores/{id}/favorite', [MusicScoreController::class, 'favorite'])->name('music-scores.favorite');

    // Remove a Score from Favorites
    Route::delete('/music-scores/{id}/unfavorite', [MusicScoreController::class, 'unfavorite'])->name('music-scores.unfavorite');
});
require __DIR__ . '/auth.php';
