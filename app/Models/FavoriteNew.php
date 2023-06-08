<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FavoriteNew extends Model
{
    use HasFactory;

    protected $table = 'favorite_news';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'new_id'
    ];

    /**
     * Returns the user that saved the image as favorite.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
