<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Guest Routes that dont need login
// Routes for guests
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/music-scores', [MusicScoreController::class, 'guestIndex'])->name('music-scores.guest.index');
    Route::get('/music-scores/{id}', [MusicScoreController::class, 'preview'])->name('music-scores.preview');
    Route::get('/music-scores/{id}/download', [MusicScoreController::class, 'download'])->name('music-scores.download');
    Route::get('/music-scores/{id}/share', [MusicScoreController::class, 'share'])->name('music-scores.share');
});
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'appName' => config('app.name'),
    ]);
});
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
Route::middleware(['auth'])->group(function () {
    Route::resource('music-scores', MusicScoreController::class);
});
// Composers Management
Route::middleware(['auth'])->group(function () {
    Route::resource('composers', ComposerController::class);
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
