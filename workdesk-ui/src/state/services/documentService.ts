
import { baseService } from './baseService'
import { IDocumentResponse } from '@src/common/models/Document'


export const documentService = baseService.injectEndpoints({
    endpoints: (build) => ({
        getDocuments: build.query<IDocumentResponse[], string>({
            query: (projectId) => ({ url: `/projects/${projectId}/documents` }),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Docs', id } as const)),
                { type: 'Docs' as const, id: 'LIST' },
            ],
        }),
        addDocument: build.mutation<{}, { data: FormData, projectId: string }>({
            query: ({ data, projectId }) => ({
                url: `/projects/${projectId}/documents`,
                method: 'POST',
                body: data,
                formData: true
            }),
            invalidatesTags: [{ type: 'Docs', id: 'LIST' }],
        }),
        getDocument: build.query<IDocumentResponse[], { projectId: string, documentId: string }>({
            query: ({ projectId, documentId }) => ({ url: `/projects/${projectId}/documents/${documentId}` }),
            providesTags: (_project, _err, { documentId }) => [{ type: 'Docs', id: documentId }],
        }),
        updateDocument: build.mutation<IDocumentResponse, Partial<IDocumentResponse>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `documents/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (post) => [{ type: 'Docs', id: post?.id }],
        }),
        deleteDocument: build.mutation<{ success: boolean; id: string }, { projectId: string, documentId: string }>({
            query({ projectId, documentId }) {
                return {
                    url: `/projects/${projectId}/documents/${documentId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (doc) => [{ type: 'Docs', id: doc?.id }],
        }),
        digestDocument: build.mutation<{}, string>({
            query(projectId) {
                return {
                    url: `/projects/${projectId}/digest`,
                    method: 'GET'
                }
            }
        }),
        getErrorProne: build.query<{ success: boolean }, void>({
            query: () => 'error-prone',
        }),
    }),
})

export const {
    useAddDocumentMutation,
    useDeleteDocumentMutation,
    useGetDocumentQuery,
    useGetDocumentsQuery,
    useUpdateDocumentMutation,
    useGetErrorProneQuery,
    useDigestDocumentMutation
} = documentService

export const {
    endpoints: { getDocument, getDocuments },
} = documentService
