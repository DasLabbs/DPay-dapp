import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import Button from '@src/components/shared/button';
import routes from '@src/routes/routes';

const ProfilePage = () => {
  const { logout } = usePrivy();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate(routes.SIGN_UP);
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default ProfilePage;
