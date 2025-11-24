import { AxiosInstance } from 'axios';

export const signIn = async (axios: AxiosInstance) => {
  const response = await axios.post('/api/v1/users/sign-in');
  return response.data?.data;
};
