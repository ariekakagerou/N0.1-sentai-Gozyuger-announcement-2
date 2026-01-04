<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to Sentai Gozyuger API',
        'version' => '1.0.0',
        'documentation' => '/api/v1/health',
    ]);
});
