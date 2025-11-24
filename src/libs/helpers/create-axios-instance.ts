import { appConfigs } from '@src/configs/app-configs';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const createAxiosClient = (getAccessToken: () => Promise<string | null>): AxiosInstance => {
  const instance = axios.create({
    baseURL: appConfigs.apiURL,
  });

  // Request interceptor to add access token
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const token = await getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting access token:', error);
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized - token may be expired');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
