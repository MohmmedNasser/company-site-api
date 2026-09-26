<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['id', 'client_id', 'avatar', 'rating', 'order', 'author', 'role', 'quote'])]
class Testimonial extends Model
{
    use HasLocalizedFields;

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:1',
            'order' => 'integer',
            'author' => 'array',
            'role' => 'array',
            'quote' => 'array',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
