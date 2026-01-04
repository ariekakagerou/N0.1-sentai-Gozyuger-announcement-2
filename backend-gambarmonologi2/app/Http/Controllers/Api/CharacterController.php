<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Character::query();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->active();
        }

        // Filter by color
        if ($request->has('color')) {
            $query->where('color', $request->color);
        }

        // Filter by main characters
        if ($request->boolean('main')) {
            $query->main();
        }

        // Search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('ranger_name', 'like', '%' . $request->search . '%');
            });
        }

        // Sort
        $query->ordered();

        $perPage = $request->get('per_page', 15);
        $characters = $query->paginate($perPage);

        return response()->json($characters);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:characters,slug',
            'ranger_name' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:50',
            'actor' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'biography' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'avatar' => 'nullable|image|max:1024',
            'age' => 'nullable|integer|min:0',
            'occupation' => 'nullable|string|max:255',
            'abilities' => 'nullable|array',
            'weapons' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_main' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('characters', 'public');
        }

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('characters/avatars', 'public');
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $character = Character::create($validated);

        return response()->json($character, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $character = Character::where('slug', $slug)->firstOrFail();

        return response()->json($character);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $character = Character::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:characters,slug,' . $id,
            'ranger_name' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:50',
            'actor' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'biography' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'avatar' => 'nullable|image|max:1024',
            'age' => 'nullable|integer|min:0',
            'occupation' => 'nullable|string|max:255',
            'abilities' => 'nullable|array',
            'weapons' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_main' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            if ($character->image) {
                Storage::disk('public')->delete($character->image);
            }
            $validated['image'] = $request->file('image')->store('characters', 'public');
        }

        if ($request->hasFile('avatar')) {
            if ($character->avatar) {
                Storage::disk('public')->delete($character->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('characters/avatars', 'public');
        }

        $character->update($validated);

        return response()->json($character);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $character = Character::findOrFail($id);
        
        if ($character->image) {
            Storage::disk('public')->delete($character->image);
        }
        
        if ($character->avatar) {
            Storage::disk('public')->delete($character->avatar);
        }

        $character->delete();

        return response()->json(['message' => 'Character deleted successfully']);
    }
}
