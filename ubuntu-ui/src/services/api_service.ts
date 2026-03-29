import type { AxiosResponse } from "axios";
import { checkAccessEndpoint, getDocumentByIdEndpoint, getServiceProviderByIdEndpoint, getUserDocumentsEndpoint, grantAccessEndpoint, revokeAccessEndpoint, serviceProvidersEndpoint } from "../endpoints/endpoint";
import type { ServiceProvider } from "../interfaces/ServiceProvider";
import { httpService } from "../utils/httpService/httpService";
import type { UserDocument } from "../interfaces/UserDocument";
import type { UploadedDocument } from "../interfaces/UploadedDocument";


export async function getServiceProviders():Promise<AxiosResponse<ServiceProvider[]>> {
  try {
    const res = await httpService.get<ServiceProvider[]>(serviceProvidersEndpoint);
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


