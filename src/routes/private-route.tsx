import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';

import routes from './routes';

const PrivateRoute = () => {
  const { authenticated, ready } = usePrivy();
  const location = useLocation();

  if (!ready) {
    return <Outlet />;
  }

  return authenticated ? <Outlet /> : <Navigate to={routes.SIGN_UP} state={{ from: location }} replace />;
};

export default PrivateRoute;
