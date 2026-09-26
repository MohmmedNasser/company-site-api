<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'email', 'service', 'budget', 'message'])]
class ContactMessage extends Model
{
    // The table has created_at but no updated_at column (a contact
    // message is never edited after submission). Setting UPDATED_AT to
    // null tells Eloquent not to write that column, while created_at is
    // still managed automatically on create.
    const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
            'archived_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }
}
