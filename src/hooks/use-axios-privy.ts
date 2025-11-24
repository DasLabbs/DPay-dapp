import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import axiosClient from '@src/libs/client/axios-client';

/**
 * Hook to sync Privy authentication with axios client
 */
export const useAxiosPrivy = () => {
  const { getAccessToken, authenticated, logout } = usePrivy();

  useEffect(() => {
    // Add request interceptor with Privy token
    const requestInterceptor = axiosClient.interceptors.request.use(
      async (config) => {
        if (authenticated) {
          try {
            const token = await getAccessToken();
            if (token) {
              config.headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error getting Privy token:', error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle 401
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Auto logout on 401
          await logout();
          window.location.href = '/sign-up';
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptor);
      axiosClient.interceptors.response.eject(responseInterceptor);
    };
  }, [authenticated, getAccessToken, logout]);
};
