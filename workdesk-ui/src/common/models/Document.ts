export interface IDocument {
    id: string,
    name: string,
    documentIds: string[]
    collaborators: { id: string, accessType: string }[],


}

export interface IDocumentResponse extends IDocument {

}