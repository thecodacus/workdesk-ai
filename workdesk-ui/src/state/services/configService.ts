import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    api: {
        host: 'localhost',
        port: 8080,
        ssl: false
    },
} as { api: { host: string, port: number, ssl?: boolean } }



export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setApiConfig: (state, action: PayloadAction<{ host: string, port: number, ssl?: boolean }>) => {
            state.api = action.payload
        }
    },
})

export const configReducer = configSlice.reducer