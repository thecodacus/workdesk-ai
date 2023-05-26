import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProjectResponse } from "../../../common/models/Project";
import { Status } from "../sliceCommons";


export interface IProjectState {
    status: Status,
    error?: string,
    projects: IProjectResponse[]
    projectDict: { [id: string]: IProjectResponse }
    selectedProject?: IProjectResponse
}

const initialState: IProjectState = {
    status: Status.IDLE,
    projects: [],
    projectDict: {},
    selectedProject: undefined
}

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        selectProject: (state, action: PayloadAction<IProjectResponse>) => {
            state.selectedProject = action.payload
        }
    },
    // extraReducers(builder) {
    //     // builder.addCase()
    // }
})