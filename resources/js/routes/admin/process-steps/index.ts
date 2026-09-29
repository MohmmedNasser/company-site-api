import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/process-steps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::index
 * @see app/Http/Controllers/Admin/ProcessStepController.php:19
 * @route '/admin/process-steps'
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
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/process-steps/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::create
 * @see app/Http/Controllers/Admin/ProcessStepController.php:35
 * @route '/admin/process-steps/create'
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
* @see \App\Http\Controllers\Admin\ProcessStepController::store
 * @see app/Http/Controllers/Admin/ProcessStepController.php:44
 * @route '/admin/process-steps'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/process-steps',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::store
 * @see app/Http/Controllers/Admin/ProcessStepController.php:44
 * @route '/admin/process-steps'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::store
 * @see app/Http/Controllers/Admin/ProcessStepController.php:44
 * @route '/admin/process-steps'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::store
 * @see app/Http/Controllers/Admin/ProcessStepController.php:44
 * @route '/admin/process-steps'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::store
 * @see app/Http/Controllers/Admin/ProcessStepController.php:44
 * @route '/admin/process-steps'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
export const edit = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/process-steps/{process_step}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
edit.url = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { process_step: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { process_step: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    process_step: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        process_step: typeof args.process_step === 'object'
                ? args.process_step.id
                : args.process_step,
                }

    return edit.definition.url
            .replace('{process_step}', parsedArgs.process_step.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
edit.get = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
edit.head = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
    const editForm = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
        editForm.get = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::edit
 * @see app/Http/Controllers/Admin/ProcessStepController.php:59
 * @route '/admin/process-steps/{process_step}/edit'
 */
        editForm.head = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ProcessStepController::update
 * @see app/Http/Controllers/Admin/ProcessStepController.php:68
 * @route '/admin/process-steps/{process_step}'
 */
export const update = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/process-steps/{process_step}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::update
 * @see app/Http/Controllers/Admin/ProcessStepController.php:68
 * @route '/admin/process-steps/{process_step}'
 */
update.url = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { process_step: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { process_step: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    process_step: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        process_step: typeof args.process_step === 'object'
                ? args.process_step.id
                : args.process_step,
                }

    return update.definition.url
            .replace('{process_step}', parsedArgs.process_step.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::update
 * @see app/Http/Controllers/Admin/ProcessStepController.php:68
 * @route '/admin/process-steps/{process_step}'
 */
update.put = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::update
 * @see app/Http/Controllers/Admin/ProcessStepController.php:68
 * @route '/admin/process-steps/{process_step}'
 */
    const updateForm = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::update
 * @see app/Http/Controllers/Admin/ProcessStepController.php:68
 * @route '/admin/process-steps/{process_step}'
 */
        updateForm.put = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ProcessStepController::move
 * @see app/Http/Controllers/Admin/ProcessStepController.php:78
 * @route '/admin/process-steps/{process_step}/move'
 */
export const move = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

move.definition = {
    methods: ["post"],
    url: '/admin/process-steps/{process_step}/move',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::move
 * @see app/Http/Controllers/Admin/ProcessStepController.php:78
 * @route '/admin/process-steps/{process_step}/move'
 */
move.url = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { process_step: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { process_step: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    process_step: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        process_step: typeof args.process_step === 'object'
                ? args.process_step.id
                : args.process_step,
                }

    return move.definition.url
            .replace('{process_step}', parsedArgs.process_step.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::move
 * @see app/Http/Controllers/Admin/ProcessStepController.php:78
 * @route '/admin/process-steps/{process_step}/move'
 */
move.post = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::move
 * @see app/Http/Controllers/Admin/ProcessStepController.php:78
 * @route '/admin/process-steps/{process_step}/move'
 */
    const moveForm = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::move
 * @see app/Http/Controllers/Admin/ProcessStepController.php:78
 * @route '/admin/process-steps/{process_step}/move'
 */
        moveForm.post = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, options),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\Admin\ProcessStepController::destroy
 * @see app/Http/Controllers/Admin/ProcessStepController.php:103
 * @route '/admin/process-steps/{process_step}'
 */
export const destroy = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/process-steps/{process_step}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::destroy
 * @see app/Http/Controllers/Admin/ProcessStepController.php:103
 * @route '/admin/process-steps/{process_step}'
 */
destroy.url = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { process_step: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { process_step: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    process_step: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        process_step: typeof args.process_step === 'object'
                ? args.process_step.id
                : args.process_step,
                }

    return destroy.definition.url
            .replace('{process_step}', parsedArgs.process_step.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProcessStepController::destroy
 * @see app/Http/Controllers/Admin/ProcessStepController.php:103
 * @route '/admin/process-steps/{process_step}'
 */
destroy.delete = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ProcessStepController::destroy
 * @see app/Http/Controllers/Admin/ProcessStepController.php:103
 * @route '/admin/process-steps/{process_step}'
 */
    const destroyForm = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProcessStepController::destroy
 * @see app/Http/Controllers/Admin/ProcessStepController.php:103
 * @route '/admin/process-steps/{process_step}'
 */
        destroyForm.delete = (args: { process_step: string | { id: string } } | [process_step: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const processSteps = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
move: Object.assign(move, move),
destroy: Object.assign(destroy, destroy),
}

export default processSteps