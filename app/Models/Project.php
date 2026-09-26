<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['id', 'slug', 'category', 'status', 'client_id', 'cover_image', 'order', 'title', 'summary', 'description'])]
class Project extends Model
{
    use HasLocalizedFields;

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'status' => ProjectStatus::class,
            'order' => 'integer',
            'title' => 'array',
            'summary' => 'array',
            'description' => 'array',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
