<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Story extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'episode_number',
        'title',
        'slug',
        'synopsis',
        'description',
        'thumbnail',
        'video_url',
        'air_date',
        'director',
        'writer',
        'featured_characters',
        'featured_robots',
        'views',
        'rating',
        'status',
    ];

    protected $casts = [
        'air_date' => 'date',
        'featured_characters' => 'array',
        'featured_robots' => 'array',
        'episode_number' => 'integer',
        'views' => 'integer',
        'rating' => 'decimal:2',
    ];

    protected $attributes = [
        'views' => 0,
        'status' => 'upcoming',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($story) {
            if (empty($story->slug)) {
                $story->slug = Str::slug($story->title);
            }
        });
    }

    /**
     * Scope a query to only include aired stories.
     */
    public function scopeAired($query)
    {
        return $query->where('status', 'aired')
                    ->whereNotNull('air_date')
                    ->where('air_date', '<=', now());
    }

    /**
     * Scope a query to order by episode number.
     */
    public function scopeByEpisode($query)
    {
        return $query->orderBy('episode_number', 'asc');
    }

    /**
     * Increment the views count.
     */
    public function incrementViews()
    {
        $this->increment('views');
    }
}
