import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
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
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
 * @route '/admin/subscribers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
 * @route '/admin/subscribers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
 * @route '/admin/subscribers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
 * @route '/admin/subscribers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
 * @route '/admin/subscribers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriberController::index
 * @see app/Http/Controllers/Admin/SubscriberController.php:16
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
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
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
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
 * @route '/admin/subscribers/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
 * @route '/admin/subscribers/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
 * @route '/admin/subscribers/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
 * @route '/admin/subscribers/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
 * @route '/admin/subscribers/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubscriberController::exportMethod
 * @see app/Http/Controllers/Admin/SubscriberController.php:45
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
/**
* @see \App\Http\Controllers\Admin\SubscriberController::destroy
 * @see app/Http/Controllers/Admin/SubscriberController.php:36
 * @route '/admin/subscribers/{subscriber}'
 */
export const destroy = (args: { subscriber: number | { id: number } } | [subscriber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/subscribers/{subscriber}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SubscriberController::destroy
 * @see app/Http/Controllers/Admin/SubscriberController.php:36
 * @route '/admin/subscribers/{subscriber}'
 */
destroy.url = (args: { subscriber: number | { id: number } } | [subscriber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscriber: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subscriber: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subscriber: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscriber: typeof args.subscriber === 'object'
                ? args.subscriber.id
                : args.subscriber,
                }

    return destroy.definition.url
            .replace('{subscriber}', parsedArgs.subscriber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubscriberController::destroy
 * @see app/Http/Controllers/Admin/SubscriberController.php:36
 * @route '/admin/subscribers/{subscriber}'
 */
destroy.delete = (args: { subscriber: number | { id: number } } | [subscriber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\SubscriberController::destroy
 * @see app/Http/Controllers/Admin/SubscriberController.php:36
 * @route '/admin/subscribers/{subscriber}'
 */
    const destroyForm = (args: { subscriber: number | { id: number } } | [subscriber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SubscriberController::destroy
 * @see app/Http/Controllers/Admin/SubscriberController.php:36
 * @route '/admin/subscribers/{subscriber}'
 */
        destroyForm.delete = (args: { subscriber: number | { id: number } } | [subscriber: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const subscribers = {
    index: Object.assign(index, index),
export: Object.assign(exportMethod, exportMethod),
destroy: Object.assign(destroy, destroy),
}

export default subscribers