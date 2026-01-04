<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RobotController extends Controller
{
    public function index(Request $request)
    {
        $query = Robot::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->active();
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $query->ordered();
        $perPage = $request->get('per_page', 15);

        return response()->json($query->paginate($perPage));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:robots,slug',
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'specifications' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'pilot' => 'nullable|string|max:255',
            'weapons' => 'nullable|array',
            'special_attacks' => 'nullable|array',
            'components' => 'nullable|array',
            'height' => 'nullable|string|max:100',
            'weight' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'status' => 'nullable|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('robots', 'public');
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        return response()->json(Robot::create($validated), 201);
    }

    public function show($slug)
    {
        return response()->json(Robot::where('slug', $slug)->firstOrFail());
    }

    public function update(Request $request, $id)
    {
        $robot = Robot::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:robots,slug,' . $id,
            'type' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'specifications' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'pilot' => 'nullable|string|max:255',
            'weapons' => 'nullable|array',
            'special_attacks' => 'nullable|array',
            'components' => 'nullable|array',
            'height' => 'nullable|string|max:100',
            'weight' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'status' => 'nullable|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            if ($robot->image) {
                Storage::disk('public')->delete($robot->image);
            }
            $validated['image'] = $request->file('image')->store('robots', 'public');
        }

        $robot->update($validated);
        return response()->json($robot);
    }

    public function destroy($id)
    {
        $robot = Robot::findOrFail($id);
        
        if ($robot->image) {
            Storage::disk('public')->delete($robot->image);
        }

        $robot->delete();
        return response()->json(['message' => 'Robot deleted successfully']);
    }
}
