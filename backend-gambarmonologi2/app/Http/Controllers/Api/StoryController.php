<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Story::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->aired();
        }

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('synopsis', 'like', '%' . $request->search . '%');
            });
        }

        $sortBy = $request->get('sort_by', 'episode_number');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->get('per_page', 15);

        return response()->json($query->paginate($perPage));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'episode_number' => 'required|integer|min:1',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:stories,slug',
            'synopsis' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'video_url' => 'nullable|url',
            'air_date' => 'nullable|date',
            'director' => 'nullable|string|max:255',
            'writer' => 'nullable|string|max:255',
            'featured_characters' => 'nullable|array',
            'featured_robots' => 'nullable|array',
            'rating' => 'nullable|numeric|min:0|max:10',
            'status' => 'nullable|in:upcoming,aired,archived',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('stories', 'public');
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        return response()->json(Story::create($validated), 201);
    }

    public function show($slug)
    {
        $story = Story::where('slug', $slug)->firstOrFail();
        $story->incrementViews();

        return response()->json($story);
    }

    public function update(Request $request, $id)
    {
        $story = Story::findOrFail($id);

        $validated = $request->validate([
            'episode_number' => 'sometimes|required|integer|min:1',
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:stories,slug,' . $id,
            'synopsis' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'video_url' => 'nullable|url',
            'air_date' => 'nullable|date',
            'director' => 'nullable|string|max:255',
            'writer' => 'nullable|string|max:255',
            'featured_characters' => 'nullable|array',
            'featured_robots' => 'nullable|array',
            'rating' => 'nullable|numeric|min:0|max:10',
            'status' => 'nullable|in:upcoming,aired,archived',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($story->thumbnail) {
                Storage::disk('public')->delete($story->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('stories', 'public');
        }

        $story->update($validated);
        return response()->json($story);
    }

    public function destroy($id)
    {
        $story = Story::findOrFail($id);
        
        if ($story->thumbnail) {
            Storage::disk('public')->delete($story->thumbnail);
        }

        $story->delete();
        return response()->json(['message' => 'Story deleted successfully']);
    }
}
