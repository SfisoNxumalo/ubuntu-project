export const baseURL = 'https://localhost:7109/api/' //replace

export const serviceProvidersEndpoint = `ServiceProvider`

export function getServiceProviderByIdEndpoint(id:string):string {
    return `${serviceProvidersEndpoint}/${id}`;
}

export function getUserDocumentsEndpoint(id:string):string {
    return `UserDocument/user/${id}`;
}

export function getProviderDocumentsEndpoint(id:string):string {
    return `UserDocument/provider/${id}`;
}

export function getDocumentByIdEndpoint(id:string):string {
    return `Document/${id}`;
}

export function checkAccessEndpoint(userid:string, providerId:string) : string {
    return `Access/check?userId=${userid}&serviceProviderId=${providerId}`
}

export const grantAccessEndpoint = `Access/grant`
export const revokeAccessEndpoint = `Access/revoke`


export function getServiceProviderDocumentsEndpoint(id:string):string {
    return `Document/user/${id}`;
}

export function getProviderUserEndpoint(id:string):string {
    return `${serviceProvidersEndpoint}/${id}/users`;
}

export const uploadDocumentEndpoint = "Document/upload"

export const AskAIEndpoint = "/DocumentQA/ask"


export function loginEndpoint(user:string):string {
    return `${user}/login`;
}

export const registerUserEndpoint = `User`