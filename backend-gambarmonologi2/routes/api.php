<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\CharacterController;
use App\Http\Controllers\Api\RobotController;
use App\Http\Controllers\Api\SongController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\StoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // News Routes
    Route::apiResource('news', NewsController::class)->parameters([
        'news' => 'id'
    ]);
    Route::get('news/slug/{slug}', [NewsController::class, 'show']);

    // Character Routes
    Route::apiResource('characters', CharacterController::class);
    Route::get('characters/slug/{slug}', [CharacterController::class, 'show']);

    // Robot Routes
    Route::apiResource('robots', RobotController::class);
    Route::get('robots/slug/{slug}', [RobotController::class, 'show']);

    // Song Routes
    Route::apiResource('songs', SongController::class);
    Route::get('songs/slug/{slug}', [SongController::class, 'show']);

    // Blog Routes
    Route::apiResource('blogs', BlogController::class);
    Route::get('blogs/slug/{slug}', [BlogController::class, 'show']);

    // Story/Episode Routes
    Route::apiResource('stories', StoryController::class);
    Route::get('stories/slug/{slug}', [StoryController::class, 'show']);

    // Health Check
    Route::get('health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'service' => 'Sentai Gozyuger API',
            'version' => '1.0.0'
        ]);
    });
});

// Fallback route
Route::fallback(function () {
    return response()->json([
        'message' => 'Endpoint not found',
        'available_endpoints' => [
            'GET /api/v1/health',
            'GET /api/v1/news',
            'GET /api/v1/characters',
            'GET /api/v1/robots',
            'GET /api/v1/songs',
            'GET /api/v1/blogs',
            'GET /api/v1/stories',
        ]
    ], 404);
});
