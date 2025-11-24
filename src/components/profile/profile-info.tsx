import { useUser } from '@privy-io/react-auth';
import { truncateAddress } from '@src/libs/utils/common';

const ProfileInfo = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#F5F5F7] p-4">
      {/* Email */}
      {user?.email && (
        <div className="flex items-center justify-between py-2">
          <div className="text-sm text-[#7A7B83]">Email</div>
          <div className="text-sm font-medium text-[#1B1B1D]">{user.email.address}</div>
        </div>
      )}

      {/* Phone */}
      {user?.phone && (
        <div className="flex items-center justify-between py-2">
          <div className="text-sm text-[#7A7B83]">Phone</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-[#1B1B1D]">{user.phone.number}</div>
          </div>
        </div>
      )}

      {/* Wallet ID */}
      {user?.wallet && (
        <div className="flex items-center justify-between py-2">
          <div className="text-sm text-[#7A7B83]">Wallet Address</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-[#1B1B1D]">{truncateAddress(user.wallet.address)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
