<?php

namespace App\Models;

use App\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'avatar', 'order', 'name', 'role', 'bio'])]
class TeamMember extends Model
{
    use HasLocalizedFields;

    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'order' => 'integer',
            'name' => 'array',
            'role' => 'array',
            'bio' => 'array',
        ];
    }
}
