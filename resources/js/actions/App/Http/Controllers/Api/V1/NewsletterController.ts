import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\NewsletterController::store
 * @see app/Http/Controllers/Api/V1/NewsletterController.php:23
 * @route '/api/v1/newsletter'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/newsletter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\NewsletterController::store
 * @see app/Http/Controllers/Api/V1/NewsletterController.php:23
 * @route '/api/v1/newsletter'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\NewsletterController::store
 * @see app/Http/Controllers/Api/V1/NewsletterController.php:23
 * @route '/api/v1/newsletter'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\NewsletterController::store
 * @see app/Http/Controllers/Api/V1/NewsletterController.php:23
 * @route '/api/v1/newsletter'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\NewsletterController::store
 * @see app/Http/Controllers/Api/V1/NewsletterController.php:23
 * @route '/api/v1/newsletter'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const NewsletterController = { store }

export default NewsletterController