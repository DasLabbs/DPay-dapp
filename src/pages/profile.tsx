import { useNavigate } from 'react-router-dom';
import BackIcon from '@assets/back.svg?react';
import LogoutButton from '@src/components/profile/logout-button';
import ProfileAvatar from '@src/components/profile/profile-avatar';
import ProfileInfo from '@src/components/profile/profile-info';
import ProfileSettings from '@src/components/profile/profile-settings';
import ProfileWallets from '@src/components/profile/profile-wallet';
import routes from '@src/routes/routes';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col bg-white pb-[80px]">
      {/* Header */}
      <div className="flex items-center justify-center border-b border-[#E5E5E5] px-4 py-4">
        <div onClick={() => navigate(routes.HOME)} className="absolute left-4 cursor-pointer">
          <BackIcon />
        </div>
        <h1 className="text-xl font-semibold text-[#1B1B1D]">Profile</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-8">
          {/* Avatar & Name */}
          <ProfileAvatar />

          {/* User Info */}
          <ProfileInfo />

          {/* Wallets */}
          <ProfileWallets />

          {/* Settings */}
          <ProfileSettings />

          {/* Logout */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
