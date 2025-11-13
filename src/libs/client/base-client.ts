import { appConfigs } from '@src/configs/app-configs';
import axios, { AxiosError, AxiosResponse } from 'axios';

const baseClient = axios.create({
  baseURL: `${appConfigs.apiURL}`,
});

const handleResponse = (response: AxiosResponse) => response;
const handleErrorResponse = (error: AxiosError) => {
  if (error.response) {
    return error.response.data;
  }
  return error;
};

baseClient.interceptors.response.use(
  (response: AxiosResponse) => handleResponse(response),
  async (error: AxiosError) => Promise.reject(handleErrorResponse(error))
);

export default baseClient;
