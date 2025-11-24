import { createContext, ReactNode, useContext, useMemo } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { createAxiosClient } from '@src/libs/helpers/create-axios-instance';
import { useUser } from '@src/stores/auth.store';
import { AxiosInstance } from 'axios';

interface AxiosContextValue {
  axios: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextValue | null>(null);

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const { getAccessToken } = usePrivy();
  const user = useUser();

  const axiosClient = useMemo(() => {
    return createAxiosClient(getAccessToken);
  }, [getAccessToken, user]);

  return <AxiosContext.Provider value={{ axios: axiosClient }}>{children}</AxiosContext.Provider>;
};

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within AxiosProvider');
  }
  return context.axios;
};
