import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ServiceController::index
 * @see app/Http/Controllers/Api/V1/ServiceController.php:15
 * @route '/api/v1/services'
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
/**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
export const show = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/services/{service}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
show.url = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { service: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.slug
                : args.service,
                }

    return show.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
show.get = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
show.head = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
    const showForm = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
        showForm.get = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ServiceController::show
 * @see app/Http/Controllers/Api/V1/ServiceController.php:26
 * @route '/api/v1/services/{service}'
 */
        showForm.head = (args: { service: string | number | { slug: string | number } } | [service: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const ServiceController = { index, show }

export default ServiceController