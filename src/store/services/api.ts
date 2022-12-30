import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const api = createApi({
    reducerPath: 'furnitureApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Slider'],
    endpoints: () => ({})
})