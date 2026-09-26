<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use App\Enums\TimelineStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'year', 'status', 'order', 'title', 'description'])]
class TimelineEntry extends Model
{
    use HasLocalizedFields;

    // Eloquent's default table name for TimelineEntry would be
    // "timeline_entries" — overridden because the content contract and
    // migration both use the table name "timeline".
    protected $table = 'timeline';

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'status' => TimelineStatus::class,
            'order' => 'integer',
            'title' => 'array',
            'description' => 'array',
        ];
    }
}
