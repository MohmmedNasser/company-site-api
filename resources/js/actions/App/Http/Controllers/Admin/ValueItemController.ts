import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/values',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ValueItemController::index
 * @see app/Http/Controllers/Admin/ValueItemController.php:19
 * @route '/admin/values'
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
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/values/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ValueItemController::create
 * @see app/Http/Controllers/Admin/ValueItemController.php:35
 * @route '/admin/values/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\ValueItemController::store
 * @see app/Http/Controllers/Admin/ValueItemController.php:44
 * @route '/admin/values'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/values',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::store
 * @see app/Http/Controllers/Admin/ValueItemController.php:44
 * @route '/admin/values'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::store
 * @see app/Http/Controllers/Admin/ValueItemController.php:44
 * @route '/admin/values'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::store
 * @see app/Http/Controllers/Admin/ValueItemController.php:44
 * @route '/admin/values'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::store
 * @see app/Http/Controllers/Admin/ValueItemController.php:44
 * @route '/admin/values'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
export const edit = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/values/{value_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
edit.url = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { value_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { value_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    value_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        value_item: typeof args.value_item === 'object'
                ? args.value_item.id
                : args.value_item,
                }

    return edit.definition.url
            .replace('{value_item}', parsedArgs.value_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
edit.get = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
edit.head = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
    const editForm = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
        editForm.get = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ValueItemController::edit
 * @see app/Http/Controllers/Admin/ValueItemController.php:59
 * @route '/admin/values/{value_item}/edit'
 */
        editForm.head = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\ValueItemController::update
 * @see app/Http/Controllers/Admin/ValueItemController.php:68
 * @route '/admin/values/{value_item}'
 */
export const update = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/values/{value_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::update
 * @see app/Http/Controllers/Admin/ValueItemController.php:68
 * @route '/admin/values/{value_item}'
 */
update.url = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { value_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { value_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    value_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        value_item: typeof args.value_item === 'object'
                ? args.value_item.id
                : args.value_item,
                }

    return update.definition.url
            .replace('{value_item}', parsedArgs.value_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::update
 * @see app/Http/Controllers/Admin/ValueItemController.php:68
 * @route '/admin/values/{value_item}'
 */
update.put = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::update
 * @see app/Http/Controllers/Admin/ValueItemController.php:68
 * @route '/admin/values/{value_item}'
 */
    const updateForm = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::update
 * @see app/Http/Controllers/Admin/ValueItemController.php:68
 * @route '/admin/values/{value_item}'
 */
        updateForm.put = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\ValueItemController::move
 * @see app/Http/Controllers/Admin/ValueItemController.php:78
 * @route '/admin/values/{value_item}/move'
 */
export const move = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

move.definition = {
    methods: ["post"],
    url: '/admin/values/{value_item}/move',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::move
 * @see app/Http/Controllers/Admin/ValueItemController.php:78
 * @route '/admin/values/{value_item}/move'
 */
move.url = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { value_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { value_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    value_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        value_item: typeof args.value_item === 'object'
                ? args.value_item.id
                : args.value_item,
                }

    return move.definition.url
            .replace('{value_item}', parsedArgs.value_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::move
 * @see app/Http/Controllers/Admin/ValueItemController.php:78
 * @route '/admin/values/{value_item}/move'
 */
move.post = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::move
 * @see app/Http/Controllers/Admin/ValueItemController.php:78
 * @route '/admin/values/{value_item}/move'
 */
    const moveForm = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::move
 * @see app/Http/Controllers/Admin/ValueItemController.php:78
 * @route '/admin/values/{value_item}/move'
 */
        moveForm.post = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, options),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\Admin\ValueItemController::destroy
 * @see app/Http/Controllers/Admin/ValueItemController.php:103
 * @route '/admin/values/{value_item}'
 */
export const destroy = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/values/{value_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ValueItemController::destroy
 * @see app/Http/Controllers/Admin/ValueItemController.php:103
 * @route '/admin/values/{value_item}'
 */
destroy.url = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { value_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { value_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    value_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        value_item: typeof args.value_item === 'object'
                ? args.value_item.id
                : args.value_item,
                }

    return destroy.definition.url
            .replace('{value_item}', parsedArgs.value_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ValueItemController::destroy
 * @see app/Http/Controllers/Admin/ValueItemController.php:103
 * @route '/admin/values/{value_item}'
 */
destroy.delete = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ValueItemController::destroy
 * @see app/Http/Controllers/Admin/ValueItemController.php:103
 * @route '/admin/values/{value_item}'
 */
    const destroyForm = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ValueItemController::destroy
 * @see app/Http/Controllers/Admin/ValueItemController.php:103
 * @route '/admin/values/{value_item}'
 */
        destroyForm.delete = (args: { value_item: string | { id: string } } | [value_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ValueItemController = { index, create, store, edit, update, move, destroy }

export default ValueItemController