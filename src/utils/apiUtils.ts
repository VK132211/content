import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import logger from "./logger";
import ForbiddenError from "./errors/ForbiddenError";

export function getHeaders(contentName: any): AxiosRequestHeaders {
  const headersToCallApi: AxiosRequestHeaders = {
    "Content-Type": contentName === "document" ? "application/vnd.api+json" : "application/json",
  };
  return headersToCallApi;
}

export async function doGET<T>(url: string, configuration: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    logger.info(`GET request to ${url} with config: ${JSON.stringify(configuration)}`);
    return await axios.get<T>(url, configuration);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      const response = e.response;
      if (response) {
        const { status, statusText, data } = response;
        logger.error(`Error: ${status} - ${statusText} Response data: ${JSON.stringify(data)}`);
        const message = data?.errors[0]?.details || "No message available";
        logger.info(`Error message: ${message}`);
        switch (status) {
          case 403:
            throw new ForbiddenError(message);
          case 404:
            throw new Error(`Not Found: ${message}`);
          case 500:
            throw new Error(`Internal Server Error: ${message}`);
          default:
            throw new Error(`Unexpected error: ${message}`);
        }
      }
      throw new Error(`Axios Errror: ${e.message}`);
    }
    throw new Error(`Unexpected error:${e instanceof Error ? e.message : String(e)}`);
  }
}
export async function doPOST<T>(url: string, data: any, configuration: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    if (!configuration.headers || isEmpty(configuration.headers)) {
      logger.debug(`Post request to ${url} with data: ${JSON.stringify(data)}`);
      return await axios.post<T>(url, data);
    }
    logger.debug(
      `POST request to ${url} with data: ${JSON.stringify(data)} and config: ${JSON.stringify(configuration)}`
    );
    return await axios.post<T>(url, data, configuration);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      const response = e.response;
      if (response) {
        const { status, statusText, data } = response;
        logger.error(`Error: ${status} - ${statusText} Response data: ${JSON.stringify(data)}`);
        const message = data?.errors[0]?.details || "No message available";
        logger.info(`Error message: ${message}`);
        switch (status) {
          case 403:
            throw new ForbiddenError(message);
          case 404:
            throw new Error(`Not Found: ${message}`);
          case 500:
            throw new Error(`Internal Server Error: ${message}`);
          default:
            throw new Error(`Unexpected error: ${message}`);
        }
      }
      throw new Error(`Axios Errror: ${e.message}`);
    }
    throw new Error(`Unexpected error:${e instanceof Error ? e.message : String(e)}`);
  }
}
function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}
