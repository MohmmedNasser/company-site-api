import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PostController::index
 * @see app/Http/Controllers/Api/V1/PostController.php:31
 * @route '/api/v1/posts'
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
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
export const show = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/posts/{post}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
show.url = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { post: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.slug
                : args.post,
                }

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
show.get = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
show.head = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
    const showForm = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
        showForm.get = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\PostController::show
 * @see app/Http/Controllers/Api/V1/PostController.php:52
 * @route '/api/v1/posts/{post}'
 */
        showForm.head = (args: { post: string | number | { slug: string | number } } | [post: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const PostController = { index, show }

export default PostController