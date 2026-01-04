<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Character extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'ranger_name',
        'color',
        'actor',
        'description',
        'biography',
        'image',
        'avatar',
        'age',
        'occupation',
        'abilities',
        'weapons',
        'order',
        'is_main',
        'status',
    ];

    protected $casts = [
        'abilities' => 'array',
        'weapons' => 'array',
        'age' => 'integer',
        'order' => 'integer',
        'is_main' => 'boolean',
    ];

    protected $attributes = [
        'order' => 0,
        'is_main' => false,
        'status' => 'active',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($character) {
            if (empty($character->slug)) {
                $character->slug = Str::slug($character->name);
            }
        });
    }

    /**
     * Scope a query to only include active characters.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include main characters.
     */
    public function scopeMain($query)
    {
        return $query->where('is_main', true);
    }

    /**
     * Scope a query to order by custom order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
