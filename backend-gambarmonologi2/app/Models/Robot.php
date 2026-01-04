<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Robot extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'specifications',
        'image',
        'pilot',
        'weapons',
        'special_attacks',
        'components',
        'height',
        'weight',
        'order',
        'status',
    ];

    protected $casts = [
        'weapons' => 'array',
        'special_attacks' => 'array',
        'components' => 'array',
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

        static::creating(function ($robot) {
            if (empty($robot->slug)) {
                $robot->slug = Str::slug($robot->name);
            }
        });
    }

    /**
     * Scope a query to only include active robots.
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
}
