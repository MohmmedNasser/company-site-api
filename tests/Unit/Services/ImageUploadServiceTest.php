<?php

namespace Tests\Unit\Services;

use App\Services\ImageUploadService;
use App\Support\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageUploadServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');
    }

    public function test_store_saves_the_original_on_the_public_disk(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->image('photo.jpg', 1600, 900), 'services');

        $this->assertStringStartsWith('services/', $path);
        Storage::disk('public')->assertExists($path);
    }

    public function test_store_generates_a_thumbnail_alongside_the_original(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->image('photo.jpg', 1600, 900), 'services');

        Storage::disk('public')->assertExists('thumbnails/'.$path);
    }

    public function test_the_thumbnail_is_scaled_down_to_a_200px_long_edge(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->image('photo.jpg', 1600, 900), 'services');

        [$width, $height] = getimagesizefromstring(Storage::disk('public')->get('thumbnails/'.$path));

        $this->assertSame(200, $width);
        $this->assertSame(113, $height); // 900/1600 * 200, rounded
    }

    public function test_the_thumbnail_never_upscales_an_image_already_smaller_than_the_target(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->image('icon.jpg', 120, 80), 'services');

        [$width, $height] = getimagesizefromstring(Storage::disk('public')->get('thumbnails/'.$path));

        $this->assertSame(120, $width);
        $this->assertSame(80, $height);
    }

    public function test_delete_removes_both_the_original_and_its_thumbnail(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->image('photo.jpg'), 'services');
        Storage::disk('public')->assertExists($path);
        Storage::disk('public')->assertExists('thumbnails/'.$path);

        ImageUploadService::delete($path);

        Storage::disk('public')->assertMissing($path);
        Storage::disk('public')->assertMissing('thumbnails/'.$path);
    }

    public function test_delete_is_a_no_op_for_null_and_legacy_values(): void
    {
        ImageUploadService::delete(null);
        ImageUploadService::delete('https://picsum.photos/400');
        ImageUploadService::delete('/clients/logo.svg');

        $this->addToAssertionCount(1);
    }

    public function test_thumbnail_url_is_null_for_a_null_path(): void
    {
        $this->assertNull(ImageUploadService::thumbnailUrl(null));
    }

    public function test_thumbnail_url_falls_back_to_the_legacy_value_untouched(): void
    {
        $this->assertSame(
            'https://picsum.photos/400',
            ImageUploadService::thumbnailUrl('https://picsum.photos/400'),
        );
    }

    public function test_thumbnail_url_resolves_to_the_generated_thumbnail_file(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->image('photo.jpg'), 'services');

        $this->assertSame(
            Storage::disk('public')->url('thumbnails/'.$path),
            ImageUploadService::thumbnailUrl($path),
        );
    }

    public function test_svg_uploads_skip_thumbnail_generation_and_the_url_falls_back_to_the_original(): void
    {
        $path = ImageUploadService::store(UploadedFile::fake()->create('logo.svg', 10, 'image/svg+xml'), 'clients');

        Storage::disk('public')->assertExists($path);
        Storage::disk('public')->assertMissing('thumbnails/'.$path);
        $this->assertSame(Media::url($path), ImageUploadService::thumbnailUrl($path));
    }
}
