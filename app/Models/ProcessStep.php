<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Database\Factories\ProcessStepFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'icon', 'order', 'title', 'description'])]
class ProcessStep extends Model
{
    /** @use HasFactory<ProcessStepFactory> */
    use HasFactory, HasLocalizedFields;

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
