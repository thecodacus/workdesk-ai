export interface IProject {
    id: string,
    name: string,
    documentIds: string[]
    collaborators: { id: string, accessType: string }[],


}

export interface IProjectResponse extends IProject {

}