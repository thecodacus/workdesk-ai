
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { baseService } from './baseService'
import { RootState } from '../store'

interface IAnswerResponse {
    query: string,
    result: string,
    source_documents: {
        metadata: { source: string }
        page_content: string
    }[]
}

export const queryService = baseService.injectEndpoints({
    endpoints: (build) => ({
        getAnswer: build.mutation<IAnswerResponse, { projectId: string, question: string, parameters: IChatParameters }>({
            query: ({ projectId, question, parameters }) => ({
                url: `/projects/${projectId}/qa`,
                body: { question, parameters },
                method: "POST"
            }),
        })
    }),
})

export const {
    useGetAnswerMutation
} = queryService

export const {
    endpoints: { getAnswer },
} = queryService

interface IChat {
    role: string,
    message: string,
    source_documents?: {
        metadata: { source: string }
        page_content: string
    }[]
}
interface IChatParameters {
    modelName: ModelName,
    temperature: number,
    answerMethod: AnswerMethod,
    sourceMatchCount: number,
}

export enum ModelName {
    GPT4 = 'gpt-4',
    GPT3_5 = 'gpt-3.5-turbo'
}
export enum AnswerMethod {
    REFINE = 'refine',
    MAP_REDUCE = 'map_reduce',
    STUFF = 'stuff'
}

const initialState: {
    messages: IChat[]
    parameters: IChatParameters
} = {
    messages: [],
    parameters: {
        modelName: ModelName.GPT3_5,
        temperature: 0.2,
        answerMethod: AnswerMethod.STUFF,
        sourceMatchCount: 2
    }
}

export const chatStore = createSlice({
    name: 'chatState',
    initialState,
    reducers: {
        resetChat: () => initialState,
        query: (state, action: PayloadAction<{ projectId: string, question: string }>) => {
            state.messages.push({
                role: 'User',
                message: action.payload.question
            })
        },
        setModel: (state, action: PayloadAction<ModelName>) => {
            state.parameters.modelName = action.payload
        },
        setTemperature: (state, action: PayloadAction<number>) => {
            state.parameters.temperature = action.payload

        },
        setAnswerMethod: (state, action: PayloadAction<AnswerMethod>) => {
            state.parameters.answerMethod = action.payload
        },
        setSourceMatchCount: (state, action: PayloadAction<number>) => {
            state.parameters.sourceMatchCount = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(queryService.endpoints.getAnswer.matchPending, (action) => {
                console.log('pending', action)
            })
            .addMatcher(queryService.endpoints.getAnswer.matchFulfilled, (state, action) => {
                console.log('fulfilled', action)
                state.messages.push({
                    role: "AI",
                    message: action.payload.result,
                    source_documents: action.payload.source_documents

                })
            })
            .addMatcher(queryService.endpoints.getAnswer.matchRejected, (action) => {
                console.log('rejected', action)
            })
    },
})

export const { query, resetChat, setModel, setTemperature, setAnswerMethod, setSourceMatchCount } = chatStore.actions
export const selectChatMessages = (state: RootState) => state.chatState.messages
export const selectChatParameters = (state: RootState) => state.chatState.parameters