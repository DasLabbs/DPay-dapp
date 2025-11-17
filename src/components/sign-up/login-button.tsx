import { usePrivy } from '@privy-io/react-auth';

import Button from '../shared/button';

const LoginButton = () => {
  const { ready, login } = usePrivy();

  const handleLogin = async () => {
    try {
      if (!ready) {
        return;
      }
      login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <Button onClick={handleLogin}>Connect wallet</Button>;
};

export default LoginButton;
