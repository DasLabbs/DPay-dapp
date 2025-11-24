import { useState } from 'react';
import ChevronRightIcon from '@assets/shared/chevron-right.svg?react';

const ProfileSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-base font-semibold text-[#1B1B1D]">Settings</div>

      <div className="flex flex-col rounded-2xl bg-[#F5F5F7] p-4">
        {/* Notifications */}
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-[#1B1B1D]">Notifications</div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer-checked:bg-primary peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
          </label>
        </div>

        {/* Biometric */}
        <div className="flex items-center justify-between border-t border-[#EAEAEA] py-4">
          <div className="text-sm text-[#1B1B1D]">Biometric Login</div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={biometric}
              onChange={(e) => setBiometric(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer-checked:bg-primary peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
          </label>
        </div>

        {/* Security */}
        <div className="flex cursor-pointer items-center justify-between border-t border-[#EAEAEA] py-4">
          <div className="text-sm text-[#1B1B1D]">Security</div>
          <ChevronRightIcon />
        </div>

        {/* Privacy */}
        <div className="flex cursor-pointer items-center justify-between border-t border-[#EAEAEA] py-4">
          <div className="text-sm text-[#1B1B1D]">Privacy</div>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
