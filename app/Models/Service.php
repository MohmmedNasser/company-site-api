<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'slug', 'icon', 'image', 'categories', 'order', 'title', 'excerpt', 'body'])]
class Service extends Model
{
    use HasLocalizedFields;

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'categories' => 'array',
            'order' => 'integer',
            'title' => 'array',
            'excerpt' => 'array',
            'body' => 'array',
        ];
    }
}
