import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface IConfigStore {
    openai: {
        apiKey: string
    }
}

const initialState: IConfigStore = {
    openai: {
        apiKey: localStorage.getItem('openai-api-key') || ""
    }
}



export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setOpenAIApiKey: (state, action: PayloadAction<string>) => {
            state.openai.apiKey = action.payload
            localStorage.setItem('openai-api-key', action.payload)
        }
    },
})

export const {
    setOpenAIApiKey
} = configSlice.actions
export const configReducer = configSlice.reducer
export const selectOpenAIConfig = (state: RootState) => state.config.openai