<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SongController extends Controller
{
    public function index(Request $request)
    {
        $query = Song::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->active();
        }

        if ($request->has('type')) {
            $query->ofType($request->type);
        }

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('artist', 'like', '%' . $request->search . '%');
            });
        }

        $query->ordered();
        $perPage = $request->get('per_page', 15);

        return response()->json($query->paginate($perPage));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:songs,slug',
            'type' => 'nullable|string|max:100',
            'artist' => 'nullable|string|max:255',
            'composer' => 'nullable|string|max:255',
            'lyricist' => 'nullable|string|max:255',
            'lyrics' => 'nullable|string',
            'audio_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'cover_image' => 'nullable|image|max:2048',
            'duration' => 'nullable|string|max:20',
            'release_date' => 'nullable|date',
            'order' => 'nullable|integer',
            'status' => 'nullable|in:active,inactive',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('songs', 'public');
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        return response()->json(Song::create($validated), 201);
    }

    public function show($slug)
    {
        return response()->json(Song::where('slug', $slug)->firstOrFail());
    }

    public function update(Request $request, $id)
    {
        $song = Song::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:songs,slug,' . $id,
            'type' => 'nullable|string|max:100',
            'artist' => 'nullable|string|max:255',
            'composer' => 'nullable|string|max:255',
            'lyricist' => 'nullable|string|max:255',
            'lyrics' => 'nullable|string',
            'audio_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'cover_image' => 'nullable|image|max:2048',
            'duration' => 'nullable|string|max:20',
            'release_date' => 'nullable|date',
            'order' => 'nullable|integer',
            'status' => 'nullable|in:active,inactive',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($song->cover_image) {
                Storage::disk('public')->delete($song->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('songs', 'public');
        }

        $song->update($validated);
        return response()->json($song);
    }

    public function destroy($id)
    {
        $song = Song::findOrFail($id);
        
        if ($song->cover_image) {
            Storage::disk('public')->delete($song->cover_image);
        }

        $song->delete();
        return response()->json(['message' => 'Song deleted successfully']);
    }
}
