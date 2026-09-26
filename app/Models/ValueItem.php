<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Database\Factories\ValueItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'icon', 'order', 'title', 'description'])]
class ValueItem extends Model
{
    /** @use HasFactory<ValueItemFactory> */
    use HasFactory, HasLocalizedFields;

    // Eloquent's default table name for ValueItem would be "value_items"
    // (snake_case plural of the class name) — overridden because the
    // content contract and migration both use the table name "values".
    protected $table = 'values';

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'order' => 'integer',
            'title' => 'array',
            'description' => 'array',
        ];
    }
}
