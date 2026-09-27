import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/subscribers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:15
 * @route '/admin/subscribers'
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
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/subscribers/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:35
 * @route '/admin/subscribers/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const subscribers = {
    index: Object.assign(index, index),
export: Object.assign(exportMethod, exportMethod),
}

export default subscribers