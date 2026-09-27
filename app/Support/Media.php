<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * Image columns hold one of two kinds of value:
 *
 *  - a legacy reference seeded from the frontend mock data — an absolute
 *    URL (picsum.photos placeholders) or a site-relative path served by the
 *    Next.js app's own public/ folder (/clients/..., /avatars/...);
 *  - a path on the "public" disk, written by an admin upload
 *    (services/01k....webp), which has no scheme and no leading slash.
 *
 * Only the second kind is ours to resolve or delete. Legacy values pass
 * through untouched until someone uploads a replacement.
 */
class Media
{
    private const DISK = 'public';

    public static function url(?string $value): ?string
    {
        if ($value === null || $value === '' || self::isExternal($value)) {
            return $value;
        }

        return Storage::disk(self::DISK)->url($value);
    }

    public static function store(UploadedFile $file, string $directory): string
    {
        return $file->store($directory, self::DISK);
    }

    public static function delete(?string $value): void
    {
        if ($value === null || $value === '' || self::isExternal($value)) {
            return;
        }

        Storage::disk(self::DISK)->delete($value);
    }

    public static function isExternal(string $value): bool
    {
        return str_starts_with($value, '/') || preg_match('#^https?://#i', $value) === 1;
    }
}
