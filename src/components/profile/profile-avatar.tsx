import { useUser } from '@src/stores/auth.store';

const ProfileAvatar = () => {
  const user = useUser();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#7084FF] to-[#4A5FE8] text-3xl font-bold text-white">
        {getInitials(user?.username)}
      </div>

      {/* Name */}
      <div className="text-xl font-semibold text-[#1B1B1D]">{user?.username || 'User'}</div>
    </div>
  );
};

export default ProfileAvatar;
