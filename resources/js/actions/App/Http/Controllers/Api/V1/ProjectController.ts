import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ProjectController::index
 * @see app/Http/Controllers/Api/V1/ProjectController.php:21
 * @route '/api/v1/projects'
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
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
export const show = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/projects/{project}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
show.url = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { project: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.slug
                : args.project,
                }

    return show.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
show.get = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
show.head = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
    const showForm = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
        showForm.get = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\ProjectController::show
 * @see app/Http/Controllers/Api/V1/ProjectController.php:41
 * @route '/api/v1/projects/{project}'
 */
        showForm.head = (args: { project: string | number | { slug: string | number } } | [project: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const ProjectController = { index, show }

export default ProjectController