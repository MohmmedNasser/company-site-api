import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/values',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ValueItemController::index
 * @see app/Http/Controllers/Api/V1/ValueItemController.php:15
 * @route '/api/v1/values'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const ValueItemController = { index }

export default ValueItemController