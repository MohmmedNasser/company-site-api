import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\SiteSettingController::show
 * @see app/Http/Controllers/Api/V1/SiteSettingController.php:15
 * @route '/api/v1/settings'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const SiteSettingController = { show }

export default SiteSettingController