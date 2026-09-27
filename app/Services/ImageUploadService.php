<?php

namespace App\Services;

use App\Support\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\ImageManager;
use Throwable;

/**
 * Builds on Media (the low-level "disk path <-> URL" primitive already
 * shared by every content resource) to add the one thing every admin image
 * field needs beyond storing the original: a thumbnail generated alongside
 * it, and both files cleaned up together on replace and delete. This is the
 * single call site the six image-bearing admin controllers (Service,
 * Project, Client, TeamMember, Post, Testimonial) now share, instead of
 * each repeating "store the file, remember the old path, delete it once the
 * new one is saved" by hand.
 */
class ImageUploadService
{
    private const DISK = 'public';

    private const THUMBNAIL_DIRECTORY = 'thumbnails';

    private const THUMBNAIL_MAX_DIMENSION = 200;

    /**
     * Store the original via Media (unchanged convention) and, when the
     * format is one the GD driver can decode, a thumbnail beside it.
     */
    public static function store(UploadedFile $file, string $directory): string
    {
        $path = Media::store($file, $directory);

        self::generateThumbnail($file, $path);

        return $path;
    }

    /**
     * Remove the original and its thumbnail together, so a replace or a
     * destroy never leaves one half of the pair orphaned on disk.
     */
    public static function delete(?string $path): void
    {
        Media::delete($path);

        if ($path !== null && $path !== '' && ! Media::isExternal($path)) {
            Storage::disk(self::DISK)->delete(self::thumbnailPath($path));
        }
    }

    /**
     * The URL an admin index-table row shows. Falls back to the full image
     * for anything with no thumbnail on disk: a legacy value (Media::url()
     * already passes those through) or an SVG logo, which was never given
     * one in the first place.
     */
    public static function thumbnailUrl(?string $path): ?string
    {
        if ($path === null || $path === '' || Media::isExternal($path)) {
            return Media::url($path);
        }

        $thumbnail = self::thumbnailPath($path);

        return Storage::disk(self::DISK)->exists($thumbnail)
            ? Storage::disk(self::DISK)->url($thumbnail)
            : Media::url($path);
    }

    /**
     * Best-effort: a thumbnail that fails to generate simply isn't there,
     * and thumbnailUrl() already knows to fall back to the full image when
     * that happens — never worth failing the whole upload over.
     */
    private static function generateThumbnail(UploadedFile $file, string $path): void
    {
        $extension = self::extension($path);

        // GD has no SVG decoder. Logos are the one field that accepts SVG
        // (see StoreClientRequest/UpdateClientRequest), and a vector mark
        // doesn't need a raster thumbnail anyway.
        if ($extension === 'svg') {
            return;
        }

        try {
            $encoded = (new ImageManager(new GdDriver))
                ->decodeSplFileInfo($file)
                ->scaleDown(width: self::THUMBNAIL_MAX_DIMENSION, height: self::THUMBNAIL_MAX_DIMENSION)
                ->encodeUsingFileExtension($extension);

            Storage::disk(self::DISK)->put(self::thumbnailPath($path), $encoded->toString());
        } catch (Throwable) {
            // Left unwritten on purpose — see the docblock above.
        }
    }

    private static function thumbnailPath(string $path): string
    {
        return self::THUMBNAIL_DIRECTORY.'/'.$path;
    }

    private static function extension(string $path): string
    {
        return strtolower(pathinfo($path, PATHINFO_EXTENSION));
    }
}
