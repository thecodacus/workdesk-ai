import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { baseService } from './services/baseService'
import auth from './services/authService'
import { configReducer } from './services/configService'
import { chatStore } from './services/queryService'

export const createStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
    configureStore({
        reducer: {
            [baseService.reducerPath]: baseService.reducer,
            // polling,
            auth,
            config: configReducer,
            [chatStore.name]: chatStore.reducer

        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseService.middleware),
        ...options,
    })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
