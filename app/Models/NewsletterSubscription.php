<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['email'])]
class NewsletterSubscription extends Model
{
    // Same reasoning as ContactMessage: no updated_at column, so this
    // column is excluded from Eloquent's automatic timestamp management.
    const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }
}
