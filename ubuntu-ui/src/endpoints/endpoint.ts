export const baseURL = 'https://localhost:7109/api/'

export const serviceProvidersEndpoint = `ServiceProvider`

export function getServiceProviderUser(id:string){
    return `${serviceProvidersEndpoint}/${id}`;
}