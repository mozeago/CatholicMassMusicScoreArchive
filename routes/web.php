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
    Route::get('/music-scores/{ulid}', [MusicScoreController::class, 'show'])->name('music-scores.show');
// Show the form for editing a music score
    Route::get('/music-scores/{ulid}/edit', [MusicScoreController::class, 'edit'])->name('music-scores.edit');
// Update a specific music score
    Route::put('/music-scores/{ulid}', [MusicScoreController::class, 'update'])->name('music-scores.update');
// Delete a specific music score
    Route::delete('/music-scores/{ulid}', [MusicScoreController::class, 'destroy'])->name('music-scores.destroy');
// Composers Management
    Route::resource('composers', ComposerController::class);
// Profile Management (Authenticated Users)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// Categories (Liturgical Seasons and Mass Parts)
    Route::resource('categories', CategoryController::class);
// Manage Playlists
    Route::resource('playlists', PlaylistController::class);
// Add a Score to Favorites
    Route::post('/music-scores/{id}/favorite', [MusicScoreController::class, 'favorite'])->name('music-scores.favorite');
// Remove a Score from Favorites
    Route::delete('/music-scores/{id}/unfavorite', [MusicScoreController::class, 'unfavorite'])->name('music-scores.unfavorite');
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

// User Management (Admin Only)
Route::middleware(['auth', 'can:manage-users'])->group(function () {
    Route::resource('users', UserController::class);
});

require __DIR__ . '/auth.php';
