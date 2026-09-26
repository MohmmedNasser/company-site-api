<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'slug', 'cover_image', 'published_at', 'order', 'author', 'title', 'excerpt', 'body'])]
class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, HasLocalizedFields;

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'order' => 'integer',
            'author' => 'array',
            'title' => 'array',
            'excerpt' => 'array',
            'body' => 'array',
        ];
    }
}
