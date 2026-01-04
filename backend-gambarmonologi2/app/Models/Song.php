<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Song extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'type',
        'artist',
        'composer',
        'lyricist',
        'lyrics',
        'audio_url',
        'video_url',
        'cover_image',
        'duration',
        'release_date',
        'order',
        'status',
    ];

    protected $casts = [
        'release_date' => 'date',
        'order' => 'integer',
    ];

    protected $attributes = [
        'order' => 0,
        'status' => 'active',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($song) {
            if (empty($song->slug)) {
                $song->slug = Str::slug($song->title);
            }
        });
    }

    /**
     * Scope a query to only include active songs.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to order by custom order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Scope a query to filter by type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
}
