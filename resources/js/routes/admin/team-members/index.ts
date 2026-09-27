import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/team-members',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:21
 * @route '/admin/team-members'
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
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/team-members/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:38
 * @route '/admin/team-members/create'
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
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:47
 * @route '/admin/team-members'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/team-members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:47
 * @route '/admin/team-members'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:47
 * @route '/admin/team-members'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:47
 * @route '/admin/team-members'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:47
 * @route '/admin/team-members'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
export const edit = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/team-members/{team_member}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
edit.url = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return edit.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
edit.get = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
edit.head = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
    const editForm = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
        editForm.get = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:62
 * @route '/admin/team-members/{team_member}/edit'
 */
        editForm.head = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:71
 * @route '/admin/team-members/{team_member}'
 */
export const update = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/team-members/{team_member}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:71
 * @route '/admin/team-members/{team_member}'
 */
update.url = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return update.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:71
 * @route '/admin/team-members/{team_member}'
 */
update.put = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:71
 * @route '/admin/team-members/{team_member}'
 */
    const updateForm = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:71
 * @route '/admin/team-members/{team_member}'
 */
        updateForm.put = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TeamMemberController::move
 * @see app/Http/Controllers/Admin/TeamMemberController.php:88
 * @route '/admin/team-members/{team_member}/move'
 */
export const move = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

move.definition = {
    methods: ["post"],
    url: '/admin/team-members/{team_member}/move',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::move
 * @see app/Http/Controllers/Admin/TeamMemberController.php:88
 * @route '/admin/team-members/{team_member}/move'
 */
move.url = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return move.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::move
 * @see app/Http/Controllers/Admin/TeamMemberController.php:88
 * @route '/admin/team-members/{team_member}/move'
 */
move.post = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: move.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::move
 * @see app/Http/Controllers/Admin/TeamMemberController.php:88
 * @route '/admin/team-members/{team_member}/move'
 */
    const moveForm = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::move
 * @see app/Http/Controllers/Admin/TeamMemberController.php:88
 * @route '/admin/team-members/{team_member}/move'
 */
        moveForm.post = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, options),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:113
 * @route '/admin/team-members/{team_member}'
 */
export const destroy = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/team-members/{team_member}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:113
 * @route '/admin/team-members/{team_member}'
 */
destroy.url = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return destroy.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:113
 * @route '/admin/team-members/{team_member}'
 */
destroy.delete = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:113
 * @route '/admin/team-members/{team_member}'
 */
    const destroyForm = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:113
 * @route '/admin/team-members/{team_member}'
 */
        destroyForm.delete = (args: { team_member: string | { id: string } } | [team_member: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const teamMembers = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
move: Object.assign(move, move),
destroy: Object.assign(destroy, destroy),
}

export default teamMembers