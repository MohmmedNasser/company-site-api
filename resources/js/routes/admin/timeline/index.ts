import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/timeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::index
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:20
 * @route '/admin/timeline'
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
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/timeline/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::create
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:37
 * @route '/admin/timeline/create'
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
* @see \App\Http\Controllers\Admin\TimelineEntryController::store
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:46
 * @route '/admin/timeline'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/timeline',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::store
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:46
 * @route '/admin/timeline'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::store
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:46
 * @route '/admin/timeline'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::store
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:46
 * @route '/admin/timeline'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::store
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:46
 * @route '/admin/timeline'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
export const edit = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/timeline/{timeline_entry}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
edit.url = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timeline_entry: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { timeline_entry: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    timeline_entry: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        timeline_entry: typeof args.timeline_entry === 'object'
                ? args.timeline_entry.id
                : args.timeline_entry,
                }

    return edit.definition.url
            .replace('{timeline_entry}', parsedArgs.timeline_entry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
edit.get = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
edit.head = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
    const editForm = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
        editForm.get = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::edit
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:61
 * @route '/admin/timeline/{timeline_entry}/edit'
 */
        editForm.head = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TimelineEntryController::update
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:70
 * @route '/admin/timeline/{timeline_entry}'
 */
export const update = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/timeline/{timeline_entry}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::update
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:70
 * @route '/admin/timeline/{timeline_entry}'
 */
update.url = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timeline_entry: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { timeline_entry: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    timeline_entry: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        timeline_entry: typeof args.timeline_entry === 'object'
                ? args.timeline_entry.id
                : args.timeline_entry,
                }

    return update.definition.url
            .replace('{timeline_entry}', parsedArgs.timeline_entry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::update
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:70
 * @route '/admin/timeline/{timeline_entry}'
 */
update.put = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::update
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:70
 * @route '/admin/timeline/{timeline_entry}'
 */
    const updateForm = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::update
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:70
 * @route '/admin/timeline/{timeline_entry}'
 */
        updateForm.put = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TimelineEntryController::move
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:80
 * @route '/admin/timeline/{timeline_entry}/move'
 */
export const move = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

move.definition = {
    methods: ["post"],
    url: '/admin/timeline/{timeline_entry}/move',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::move
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:80
 * @route '/admin/timeline/{timeline_entry}/move'
 */
move.url = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timeline_entry: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { timeline_entry: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    timeline_entry: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        timeline_entry: typeof args.timeline_entry === 'object'
                ? args.timeline_entry.id
                : args.timeline_entry,
                }

    return move.definition.url
            .replace('{timeline_entry}', parsedArgs.timeline_entry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::move
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:80
 * @route '/admin/timeline/{timeline_entry}/move'
 */
move.post = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::move
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:80
 * @route '/admin/timeline/{timeline_entry}/move'
 */
    const moveForm = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::move
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:80
 * @route '/admin/timeline/{timeline_entry}/move'
 */
        moveForm.post = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, options),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::destroy
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:105
 * @route '/admin/timeline/{timeline_entry}'
 */
export const destroy = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/timeline/{timeline_entry}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::destroy
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:105
 * @route '/admin/timeline/{timeline_entry}'
 */
destroy.url = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timeline_entry: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { timeline_entry: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    timeline_entry: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        timeline_entry: typeof args.timeline_entry === 'object'
                ? args.timeline_entry.id
                : args.timeline_entry,
                }

    return destroy.definition.url
            .replace('{timeline_entry}', parsedArgs.timeline_entry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TimelineEntryController::destroy
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:105
 * @route '/admin/timeline/{timeline_entry}'
 */
destroy.delete = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::destroy
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:105
 * @route '/admin/timeline/{timeline_entry}'
 */
    const destroyForm = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TimelineEntryController::destroy
 * @see app/Http/Controllers/Admin/TimelineEntryController.php:105
 * @route '/admin/timeline/{timeline_entry}'
 */
        destroyForm.delete = (args: { timeline_entry: string | { id: string } } | [timeline_entry: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const timeline = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
move: Object.assign(move, move),
destroy: Object.assign(destroy, destroy),
}

export default timeline