import { appConfigs } from '@src/configs/app-configs';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { StorageKey } from '../constants/storage';
import { getStorageData } from '../helpers/storage';

const axiosClient = axios.create({
  baseURL: appConfigs.apiURL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getStorageData<string>(StorageKey.ACCESS_TOKEN);
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => handleResponse(response),
  async (error: AxiosError) => handleErrorResponse(error)
);

const handleResponse = (response: AxiosResponse) => response;

const handleErrorResponse = async (error: AxiosError): Promise<AxiosResponse | undefined> => {
  return Promise.reject(handleError(error));
};

const handleError = (error: AxiosError) => {
  return error;
};

export default axiosClient;
