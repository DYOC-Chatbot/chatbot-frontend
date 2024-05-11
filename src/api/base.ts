export const API = process.env.NEXT_PUBLIC_BACKEND_URL!;

import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const client = axios.create({
  baseURL: API,
  withCredentials: true,
});

export class BaseAPI {
  private static getBearerTokenConfig() {
    const jwt = getCookie("token");
    return jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : {};
  }

  protected static getBaseUrl() {
    return API;
  }

  protected static get(url: string, config: AxiosRequestConfig<any> = {}) {
    return axios.get(url, { ...config, ...this.getBearerTokenConfig() });
  }

  protected static post<Data>(
    url: string,
    data: Data,
    config: AxiosRequestConfig<any> = {}
  ) {
    return axios.post(url, data, { ...config, ...this.getBearerTokenConfig() });
  }

  protected static put(url: string, config: AxiosRequestConfig<any> = {}) {
    return axios.put(url, { ...config, ...this.getBearerTokenConfig() });
  }

  protected static delete(url: string, config: AxiosRequestConfig<any> = {}) {
    return axios.delete(url, { ...config, ...this.getBearerTokenConfig() });
  }
}

export default client;
