import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/faq',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FaqItemController::index
 * @see app/Http/Controllers/Admin/FaqItemController.php:19
 * @route '/admin/faq'
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
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/faq/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FaqItemController::create
 * @see app/Http/Controllers/Admin/FaqItemController.php:34
 * @route '/admin/faq/create'
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
* @see \App\Http\Controllers\Admin\FaqItemController::store
 * @see app/Http/Controllers/Admin/FaqItemController.php:43
 * @route '/admin/faq'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/faq',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::store
 * @see app/Http/Controllers/Admin/FaqItemController.php:43
 * @route '/admin/faq'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::store
 * @see app/Http/Controllers/Admin/FaqItemController.php:43
 * @route '/admin/faq'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::store
 * @see app/Http/Controllers/Admin/FaqItemController.php:43
 * @route '/admin/faq'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::store
 * @see app/Http/Controllers/Admin/FaqItemController.php:43
 * @route '/admin/faq'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
export const edit = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/faq/{faq_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
edit.url = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq_item: typeof args.faq_item === 'object'
                ? args.faq_item.id
                : args.faq_item,
                }

    return edit.definition.url
            .replace('{faq_item}', parsedArgs.faq_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
edit.get = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
edit.head = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
    const editForm = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
        editForm.get = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FaqItemController::edit
 * @see app/Http/Controllers/Admin/FaqItemController.php:58
 * @route '/admin/faq/{faq_item}/edit'
 */
        editForm.head = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\FaqItemController::update
 * @see app/Http/Controllers/Admin/FaqItemController.php:67
 * @route '/admin/faq/{faq_item}'
 */
export const update = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/faq/{faq_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::update
 * @see app/Http/Controllers/Admin/FaqItemController.php:67
 * @route '/admin/faq/{faq_item}'
 */
update.url = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq_item: typeof args.faq_item === 'object'
                ? args.faq_item.id
                : args.faq_item,
                }

    return update.definition.url
            .replace('{faq_item}', parsedArgs.faq_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::update
 * @see app/Http/Controllers/Admin/FaqItemController.php:67
 * @route '/admin/faq/{faq_item}'
 */
update.put = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::update
 * @see app/Http/Controllers/Admin/FaqItemController.php:67
 * @route '/admin/faq/{faq_item}'
 */
    const updateForm = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::update
 * @see app/Http/Controllers/Admin/FaqItemController.php:67
 * @route '/admin/faq/{faq_item}'
 */
        updateForm.put = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FaqItemController::move
 * @see app/Http/Controllers/Admin/FaqItemController.php:77
 * @route '/admin/faq/{faq_item}/move'
 */
export const move = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

move.definition = {
    methods: ["post"],
    url: '/admin/faq/{faq_item}/move',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::move
 * @see app/Http/Controllers/Admin/FaqItemController.php:77
 * @route '/admin/faq/{faq_item}/move'
 */
move.url = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq_item: typeof args.faq_item === 'object'
                ? args.faq_item.id
                : args.faq_item,
                }

    return move.definition.url
            .replace('{faq_item}', parsedArgs.faq_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::move
 * @see app/Http/Controllers/Admin/FaqItemController.php:77
 * @route '/admin/faq/{faq_item}/move'
 */
move.post = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::move
 * @see app/Http/Controllers/Admin/FaqItemController.php:77
 * @route '/admin/faq/{faq_item}/move'
 */
    const moveForm = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::move
 * @see app/Http/Controllers/Admin/FaqItemController.php:77
 * @route '/admin/faq/{faq_item}/move'
 */
        moveForm.post = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, options),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\Admin\FaqItemController::destroy
 * @see app/Http/Controllers/Admin/FaqItemController.php:102
 * @route '/admin/faq/{faq_item}'
 */
export const destroy = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/faq/{faq_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FaqItemController::destroy
 * @see app/Http/Controllers/Admin/FaqItemController.php:102
 * @route '/admin/faq/{faq_item}'
 */
destroy.url = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq_item: typeof args.faq_item === 'object'
                ? args.faq_item.id
                : args.faq_item,
                }

    return destroy.definition.url
            .replace('{faq_item}', parsedArgs.faq_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqItemController::destroy
 * @see app/Http/Controllers/Admin/FaqItemController.php:102
 * @route '/admin/faq/{faq_item}'
 */
destroy.delete = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\FaqItemController::destroy
 * @see app/Http/Controllers/Admin/FaqItemController.php:102
 * @route '/admin/faq/{faq_item}'
 */
    const destroyForm = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FaqItemController::destroy
 * @see app/Http/Controllers/Admin/FaqItemController.php:102
 * @route '/admin/faq/{faq_item}'
 */
        destroyForm.delete = (args: { faq_item: string | { id: string } } | [faq_item: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const FaqItemController = { index, create, store, edit, update, move, destroy }

export default FaqItemController