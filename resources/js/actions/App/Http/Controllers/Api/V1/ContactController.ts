import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
 * @see app/Http/Controllers/Api/V1/ContactController.php:21
 * @route '/api/v1/contact'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
 * @see app/Http/Controllers/Api/V1/ContactController.php:21
 * @route '/api/v1/contact'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ContactController::store
 * @see app/Http/Controllers/Api/V1/ContactController.php:21
 * @route '/api/v1/contact'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\ContactController::store
 * @see app/Http/Controllers/Api/V1/ContactController.php:21
 * @route '/api/v1/contact'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\ContactController::store
 * @see app/Http/Controllers/Api/V1/ContactController.php:21
 * @route '/api/v1/contact'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const ContactController = { store }

export default ContactController