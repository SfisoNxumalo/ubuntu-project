import { serviceProvidersEndpoint } from "../endpoints/endpoint";
import type { ServiceProvider } from "../interfaces/ServiceProvider";
import { httpService } from "../utils/httpService/httpService";


export async function getServiceProviders() {
  try {
    const res = await httpService.get<ServiceProvider>(serviceProvidersEndpoint);
    return res;
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // rethrow if you want the caller to handle it
  }
}