import { useLogin } from '@privy-io/react-auth';

import Button from '../shared/button';

const LoginButton = () => {
  const { login } = useLogin();

  const handleLogin = async () => {
    try {
      login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <Button onClick={handleLogin}>Connect wallet</Button>;
};

export default LoginButton;
