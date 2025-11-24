import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { appConfigs } from '@src/configs/app-configs';
import { useAxios } from '@src/providers/axios-provider';
import { signIn } from '@src/services/user/user.service';
import { useAuthStore } from '@src/stores/auth.store';
import { useMutation } from '@tanstack/react-query';
import { useSwitchChain } from 'wagmi';

import routes from './routes';

const PrivateRoute = () => {
  const { authenticated, ready } = usePrivy();
  const location = useLocation();
  const { setIsAuthenticated, setUser } = useAuthStore();
  const { switchChain } = useSwitchChain();
  const axios = useAxios();
  const { mutate: _signUp } = useMutation({
    mutationFn: async () => signIn(axios),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
    },
  });

  useLogin({
    onComplete: () => {
      _signUp();
    },
    onError: (error) => {
      toast.error(error || 'Login failed');
    },
  });

  useEffect(() => {
    switchChain?.({
      chainId: appConfigs.sominiaChainId,
    });
  }, []);

  if (!ready) {
    return <Outlet />;
  }

  return authenticated ? <Outlet /> : <Navigate to={routes.SIGN_UP} state={{ from: location }} replace />;
};

export default PrivateRoute;
