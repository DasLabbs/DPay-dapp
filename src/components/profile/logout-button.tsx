import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import routes from '@src/routes/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { useDisconnect } from 'wagmi';

import Button from '../shared/button';

const LogoutButton = () => {
  const { logout: privyLogout } = usePrivy();
  const { disconnect } = useDisconnect();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await privyLogout();
      disconnect();
      logout();
      navigate(routes.SIGN_UP);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
      Logout
    </Button>
  );
};

export default LogoutButton;
