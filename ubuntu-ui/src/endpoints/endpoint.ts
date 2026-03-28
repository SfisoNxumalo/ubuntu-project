export const baseURL = 'https://localhost:7109/api/'

export const serviceProvidersEndpoint = `ServiceProvider`

export function getServiceProviderUser(id:string):string {
    return `${serviceProvidersEndpoint}/${id}`;
}

export function getUserDocumentsEndpoint(id:string):string {
    return `Document/user/${id}`;
}

export function getProviderUserEndpoint(id:string):string {
    return `${serviceProvidersEndpoint}/${id}/users`;
}