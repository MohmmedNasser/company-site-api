<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'hero', 'sections', 'pages', 'contact', 'newsletter', 'social'])]
class SiteSetting extends Model
{
    protected $table = 'site_settings';

    // id is a plain unsigned tinyint primary key (see the migration's
    // note on why it isn't AUTO_INCREMENT), so Eloquent must be told not
    // to expect a database-generated value back after insert.
    public $incrementing = false;

    protected $keyType = 'int';

    protected function casts(): array
    {
        return [
            'hero' => 'array',
            'sections' => 'array',
            'pages' => 'array',
            'contact' => 'array',
            'newsletter' => 'array',
            'social' => 'array',
        ];
    }

    /**
     * The whole table is a single row (id=1, enforced by a CHECK
     * constraint in the migration). Callers ask for "the settings", never
     * "a settings record", so this static accessor replaces every normal
     * query method (where/find/etc.) that would otherwise imply more than
     * one row could exist.
     */
    public static function current(): self
    {
        return static::findOrFail(1);
    }
}
