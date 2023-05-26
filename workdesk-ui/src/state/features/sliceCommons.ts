export enum Status {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

export function listToDict<T>(list: T[], key: keyof T): { [key: string]: T } {
    let dict: { [key: string]: T } = {};
    list.forEach(item => {
        if (typeof item[key] === 'string') {
            dict[item[key] as string] = item
        }
        else throw "Invalid Key"
    })
    return dict;
}