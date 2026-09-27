import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/process-steps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ProcessStepController::index
 * @see app/Http/Controllers/Api/V1/ProcessStepController.php:15
 * @route '/api/v1/process-steps'
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
const ProcessStepController = { index }

export default ProcessStepController