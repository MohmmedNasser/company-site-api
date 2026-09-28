import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::index
 * @see app/Http/Controllers/Admin/ContactMessageController.php:23
 * @route '/admin/messages'
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
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/messages/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::exportMethod
 * @see app/Http/Controllers/Admin/ContactMessageController.php:86
 * @route '/admin/messages/export'
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
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleRead
 * @see app/Http/Controllers/Admin/ContactMessageController.php:58
 * @route '/admin/messages/{message}/read'
 */
export const toggleRead = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleRead.url(args, options),
    method: 'patch',
})

toggleRead.definition = {
    methods: ["patch"],
    url: '/admin/messages/{message}/read',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleRead
 * @see app/Http/Controllers/Admin/ContactMessageController.php:58
 * @route '/admin/messages/{message}/read'
 */
toggleRead.url = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return toggleRead.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleRead
 * @see app/Http/Controllers/Admin/ContactMessageController.php:58
 * @route '/admin/messages/{message}/read'
 */
toggleRead.patch = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleRead.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleRead
 * @see app/Http/Controllers/Admin/ContactMessageController.php:58
 * @route '/admin/messages/{message}/read'
 */
    const toggleReadForm = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleRead.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleRead
 * @see app/Http/Controllers/Admin/ContactMessageController.php:58
 * @route '/admin/messages/{message}/read'
 */
        toggleReadForm.patch = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleRead.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleRead.form = toggleReadForm
/**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleArchive
 * @see app/Http/Controllers/Admin/ContactMessageController.php:66
 * @route '/admin/messages/{message}/archive'
 */
export const toggleArchive = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleArchive.url(args, options),
    method: 'patch',
})

toggleArchive.definition = {
    methods: ["patch"],
    url: '/admin/messages/{message}/archive',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleArchive
 * @see app/Http/Controllers/Admin/ContactMessageController.php:66
 * @route '/admin/messages/{message}/archive'
 */
toggleArchive.url = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return toggleArchive.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleArchive
 * @see app/Http/Controllers/Admin/ContactMessageController.php:66
 * @route '/admin/messages/{message}/archive'
 */
toggleArchive.patch = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleArchive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleArchive
 * @see app/Http/Controllers/Admin/ContactMessageController.php:66
 * @route '/admin/messages/{message}/archive'
 */
    const toggleArchiveForm = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleArchive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::toggleArchive
 * @see app/Http/Controllers/Admin/ContactMessageController.php:66
 * @route '/admin/messages/{message}/archive'
 */
        toggleArchiveForm.patch = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleArchive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleArchive.form = toggleArchiveForm
/**
* @see \App\Http\Controllers\Admin\ContactMessageController::destroy
 * @see app/Http/Controllers/Admin/ContactMessageController.php:77
 * @route '/admin/messages/{message}'
 */
export const destroy = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/messages/{message}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::destroy
 * @see app/Http/Controllers/Admin/ContactMessageController.php:77
 * @route '/admin/messages/{message}'
 */
destroy.url = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return destroy.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactMessageController::destroy
 * @see app/Http/Controllers/Admin/ContactMessageController.php:77
 * @route '/admin/messages/{message}'
 */
destroy.delete = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContactMessageController::destroy
 * @see app/Http/Controllers/Admin/ContactMessageController.php:77
 * @route '/admin/messages/{message}'
 */
    const destroyForm = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactMessageController::destroy
 * @see app/Http/Controllers/Admin/ContactMessageController.php:77
 * @route '/admin/messages/{message}'
 */
        destroyForm.delete = (args: { message: string | number | { id: string | number } } | [message: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ContactMessageController = { index, exportMethod, toggleRead, toggleArchive, destroy, export: exportMethod }

export default ContactMessageController