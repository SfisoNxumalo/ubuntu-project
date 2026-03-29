import type { AxiosResponse } from "axios";
import { AskAIEndpoint, checkAccessEndpoint, getDocumentByIdEndpoint, getProviderDocumentsEndpoint, getProviderUserEndpoint, getServiceProviderByIdEndpoint, getUserDocumentsEndpoint, grantAccessEndpoint, revokeAccessEndpoint, serviceProvidersEndpoint, uploadDocumentEndpoint } from "../endpoints/endpoint";
import type { ServiceProvider } from "../interfaces/ServiceProvider";
import { httpService } from "../utils/httpService/httpService";
import type { UserDocument } from "../interfaces/UserDocument";
import type { UploadedDocument } from "../interfaces/UploadedDocument";
import type { ServiceProviderUser } from "../interfaces/ServiceProviderUser";
import type { AskRequest, AskResponse } from "../interfaces/AskRequest";


export async function getServiceProviders():Promise<AxiosResponse<ServiceProvider[]>> {
  try {
    const res = await httpService.get<ServiceProvider[]>(serviceProvidersEndpoint);
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export async function getServiceProvidersUsers(id:string):Promise<AxiosResponse<ServiceProviderUser[]>> {
  try {
    const res = await httpService.get<ServiceProviderUser[]>(getProviderUserEndpoint(id));
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}


export async function getUserDocuments(id:string): Promise<AxiosResponse<UserDocument[]>> {
  try {
    const res = await httpService.get<UserDocument[]>(getUserDocumentsEndpoint(id));
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export async function getProviderDocuments(id:string): Promise<AxiosResponse<UserDocument[]>> {
  try {
    const res = await httpService.get<UserDocument[]>(getProviderDocumentsEndpoint(id));
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export async function getDocumentById(id:string): Promise<AxiosResponse<UploadedDocument>> {
  try {
    const res = await httpService.get<UploadedDocument>(getDocumentByIdEndpoint(id));
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export async function getServiceProviderById(id:string): Promise<AxiosResponse<ServiceProvider>> {
  try {
    const res = await httpService.get<ServiceProvider>(getServiceProviderByIdEndpoint(id));
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export type AccessObj = {
  hasAccess:boolean
}

export async function checkAccess(id:string, provId:string): Promise<AxiosResponse<AccessObj>> {
  try {
    const res = await httpService.get<AccessObj>(checkAccessEndpoint(id, provId));
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}



export async function updateProviderAccess(id:string, provId:string, grant:boolean) {
  try {

    const userDetails ={
      userId:id,
      serviceProviderId:provId
    }

    let url = grantAccessEndpoint;

    if(!grant)
      url = revokeAccessEndpoint

    const res = await httpService.post(url, userDetails);
    return res;

  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export async function uploadDocument(data:FormData) {
try {

    const res = await httpService.post(uploadDocumentEndpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

export async function AskAI(data:AskRequest): Promise<AxiosResponse<AskResponse>> {

try {

    const res = await httpService.post<AskResponse>(AskAIEndpoint, data);

    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}

