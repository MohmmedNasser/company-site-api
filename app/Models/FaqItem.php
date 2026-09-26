<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'order', 'question', 'answer'])]
class FaqItem extends Model
{
    use HasLocalizedFields;

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'order' => 'integer',
            'question' => 'array',
            'answer' => 'array',
        ];
    }
}
