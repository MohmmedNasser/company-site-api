<?php

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

/**
 * Renders every exception raised under /api/* as the same JSON envelope:
 *
 *     { "error": { "status": 404, "code": "not_found", "message": "Not Found" } }
 *
 * Validation failures add a "fields" map (field => list of messages).
 * Messages are the generic HTTP status text, never the exception's own
 * message — a ModelNotFoundException's message names the model class and
 * a 500's can contain SQL, neither of which belongs in a public response.
 * Reporting (logging) is unaffected: this only changes what is rendered.
 */
final class ApiExceptionRenderer
{
    public function __invoke(Throwable $e, Request $request): ?JsonResponse
    {
        // Returning null hands the exception back to Laravel's default
        // rendering — the Inertia admin keeps its normal error pages.
        if (! $request->is('api/*')) {
            return null;
        }

        if ($e instanceof ValidationException) {
            return self::envelope(
                Response::HTTP_UNPROCESSABLE_ENTITY,
                code: 'validation_failed',
                message: 'The given data was invalid.',
                extra: ['fields' => $e->errors()],
            );
        }

        // By the time render callbacks run, Laravel has already converted
        // ModelNotFoundException (a failed {slug} binding) into a
        // NotFoundHttpException, and the throttle middleware throws a
        // TooManyRequestsHttpException — so every expected failure is an
        // HttpExceptionInterface. Anything else is an unexpected 500.
        if ($e instanceof HttpExceptionInterface) {
            return self::envelope($e->getStatusCode(), headers: $e->getHeaders());
        }

        return self::envelope(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @param  array<string, mixed>  $extra
     * @param  array<string, string>  $headers
     */
    private static function envelope(
        int $status,
        ?string $code = null,
        ?string $message = null,
        array $extra = [],
        array $headers = [],
    ): JsonResponse {
        $text = Response::$statusTexts[$status] ?? 'Error';

        return new JsonResponse([
            'error' => [
                'status' => $status,
                'code' => $code ?? Str::slug($text, '_'),
                'message' => $message ?? $text,
                ...$extra,
            ],
        ], $status, $headers);
    }
}
