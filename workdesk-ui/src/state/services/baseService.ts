import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '@src/state/store'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: `${window.location.protocol}//${"0.0.0.0" || window.location.hostname}:${8000 || window.location.port}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth.token
        const apiKey = (getState() as RootState).config.openai.apiKey
        if (token) {
            headers.set('authentication', `Bearer ${token}`)

        }
        if (apiKey) {
            headers.set('openai-api-key', `${apiKey}`)
        }
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded 
 */
export const baseService = createApi({
    /**
     * `reducerPath` is optional and will not be required by most users.
     * This is useful if you have multiple API definitions,
     * e.g. where each has a different domain, with no interaction between endpoints.
     * Otherwise, a single API definition should be used in order to support tag invalidation,
     * among other features
     */
    reducerPath: 'api',
    /**
     * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
     */
    baseQuery: baseQueryWithRetry,
    /**
     * Tag types must be defined in the original API definition
     * for any tags that would be provided by injected endpoints
     */
    tagTypes: ['Projects', 'Docs'],
    /**
     * This api has endpoints injected in adjacent files,
     * which is why no endpoints are shown below.
     * If you want all endpoints defined in the same file, they could be included here instead
     */
    endpoints: () => ({}),
})

export const enhancedApi = baseService.enhanceEndpoints({
    endpoints: () => ({
        getProjects: () => 'test',
    }),
})
