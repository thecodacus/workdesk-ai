
import { baseService } from './baseService'
import { IProjectResponse } from '@src/common/models/Project'


export const projectService = baseService.injectEndpoints({
    endpoints: (build) => ({
        getProjects: build.query<IProjectResponse[], void>({
            query: () => ({ url: 'projects' }),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Projects', id } as const)),
                { type: 'Projects' as const, id: 'LIST' },
            ],
        }),
        addProject: build.mutation<IProjectResponse, Partial<IProjectResponse>>({
            query: (body) => ({
                url: `projects`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
        }),
        getProject: build.query<IProjectResponse[], string>({
            query: (id) => `projects/${id}`,
            providesTags: (_project, _err, id) => [{ type: 'Projects', id }],
        }),
        updateProject: build.mutation<IProjectResponse, Partial<IProjectResponse>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `projects/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (post) => [{ type: 'Projects', id: post?.id }],
        }),
        deleteProject: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `projects/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (post) => [{ type: 'Projects', id: post?.id }],
        }),
        getErrorProne: build.query<{ success: boolean }, void>({
            query: () => 'error-prone',
        }),
    }),
})

export const {
    useAddProjectMutation,
    useDeleteProjectMutation,
    useGetProjectQuery,
    useGetProjectsQuery,
    useUpdateProjectMutation,
    useGetErrorProneQuery,
} = projectService

export const {
    endpoints: { getProject, getProjects },
} = projectService
