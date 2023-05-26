import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { User } from '../../common/models/User';
import { baseService } from './baseService';
import { retry } from '@reduxjs/toolkit/dist/query';


export const authService = baseService.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<{ token: string; user: User }, any>({
            query: (credentials: any) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' })
                },
            }
        })
    })
})
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean }

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authService.endpoints.login.matchPending, (action) => {
                console.log('pending', action)
            })
            .addMatcher(authService.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled', action)
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addMatcher(authService.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action)
                state.isAuthenticated = false;
            })
    },
})

export const { logout } = slice.actions
export const {
    useLoginMutation
} = authService

export const {
    endpoints: { login },
} = authService

export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated
