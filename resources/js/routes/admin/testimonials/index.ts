import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TestimonialController::index
 * @see app/Http/Controllers/Admin/TestimonialController.php:23
 * @route '/admin/testimonials'
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
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TestimonialController::create
 * @see app/Http/Controllers/Admin/TestimonialController.php:42
 * @route '/admin/testimonials/create'
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
* @see \App\Http\Controllers\Admin\TestimonialController::store
 * @see app/Http/Controllers/Admin/TestimonialController.php:51
 * @route '/admin/testimonials'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/testimonials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::store
 * @see app/Http/Controllers/Admin/TestimonialController.php:51
 * @route '/admin/testimonials'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::store
 * @see app/Http/Controllers/Admin/TestimonialController.php:51
 * @route '/admin/testimonials'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::store
 * @see app/Http/Controllers/Admin/TestimonialController.php:51
 * @route '/admin/testimonials'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::store
 * @see app/Http/Controllers/Admin/TestimonialController.php:51
 * @route '/admin/testimonials'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
export const edit = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials/{testimonial}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
edit.url = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { testimonial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    testimonial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimonial: typeof args.testimonial === 'object'
                ? args.testimonial.id
                : args.testimonial,
                }

    return edit.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
edit.get = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
edit.head = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
    const editForm = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
        editForm.get = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
 * @see app/Http/Controllers/Admin/TestimonialController.php:66
 * @route '/admin/testimonials/{testimonial}/edit'
 */
        editForm.head = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TestimonialController::update
 * @see app/Http/Controllers/Admin/TestimonialController.php:75
 * @route '/admin/testimonials/{testimonial}'
 */
export const update = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/testimonials/{testimonial}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::update
 * @see app/Http/Controllers/Admin/TestimonialController.php:75
 * @route '/admin/testimonials/{testimonial}'
 */
update.url = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { testimonial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    testimonial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimonial: typeof args.testimonial === 'object'
                ? args.testimonial.id
                : args.testimonial,
                }

    return update.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::update
 * @see app/Http/Controllers/Admin/TestimonialController.php:75
 * @route '/admin/testimonials/{testimonial}'
 */
update.put = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::update
 * @see app/Http/Controllers/Admin/TestimonialController.php:75
 * @route '/admin/testimonials/{testimonial}'
 */
    const updateForm = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::update
 * @see app/Http/Controllers/Admin/TestimonialController.php:75
 * @route '/admin/testimonials/{testimonial}'
 */
        updateForm.put = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TestimonialController::move
 * @see app/Http/Controllers/Admin/TestimonialController.php:92
 * @route '/admin/testimonials/{testimonial}/move'
 */
export const move = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

move.definition = {
    methods: ["post"],
    url: '/admin/testimonials/{testimonial}/move',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::move
 * @see app/Http/Controllers/Admin/TestimonialController.php:92
 * @route '/admin/testimonials/{testimonial}/move'
 */
move.url = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { testimonial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    testimonial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimonial: typeof args.testimonial === 'object'
                ? args.testimonial.id
                : args.testimonial,
                }

    return move.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::move
 * @see app/Http/Controllers/Admin/TestimonialController.php:92
 * @route '/admin/testimonials/{testimonial}/move'
 */
move.post = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::move
 * @see app/Http/Controllers/Admin/TestimonialController.php:92
 * @route '/admin/testimonials/{testimonial}/move'
 */
    const moveForm = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::move
 * @see app/Http/Controllers/Admin/TestimonialController.php:92
 * @route '/admin/testimonials/{testimonial}/move'
 */
        moveForm.post = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, options),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
 * @see app/Http/Controllers/Admin/TestimonialController.php:117
 * @route '/admin/testimonials/{testimonial}'
 */
export const destroy = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/testimonials/{testimonial}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
 * @see app/Http/Controllers/Admin/TestimonialController.php:117
 * @route '/admin/testimonials/{testimonial}'
 */
destroy.url = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { testimonial: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    testimonial: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimonial: typeof args.testimonial === 'object'
                ? args.testimonial.id
                : args.testimonial,
                }

    return destroy.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
 * @see app/Http/Controllers/Admin/TestimonialController.php:117
 * @route '/admin/testimonials/{testimonial}'
 */
destroy.delete = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
 * @see app/Http/Controllers/Admin/TestimonialController.php:117
 * @route '/admin/testimonials/{testimonial}'
 */
    const destroyForm = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
 * @see app/Http/Controllers/Admin/TestimonialController.php:117
 * @route '/admin/testimonials/{testimonial}'
 */
        destroyForm.delete = (args: { testimonial: string | { id: string } } | [testimonial: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const testimonials = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
move: Object.assign(move, move),
destroy: Object.assign(destroy, destroy),
}

export default testimonials