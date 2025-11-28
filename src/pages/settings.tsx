import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@assets/shared/arrow-left.svg?react';
import ChevronRightIcon from '@assets/shared/chevron-right.svg?react';
import { usePrivy } from '@privy-io/react-auth';
import Button from '@src/components/shared/button';
import routes from '@src/routes/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { useDisconnect } from 'wagmi';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout: privyLogout } = usePrivy();
  const { disconnect } = useDisconnect();
  const logout = useAuthStore((state) => state.logout);

  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [autoLock, setAutoLock] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

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
    <div className="flex h-full w-full flex-col bg-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-center border-b border-[#E5E5E5] px-4 py-4">
        <div onClick={() => navigate(routes.HOME)} className="absolute left-4 cursor-pointer">
          <ArrowLeftIcon />
        </div>
        <h1 className="text-xl font-semibold text-[#1B1B1D]">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* General */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-[#7A7B83]">GENERAL</div>
            <div className="flex flex-col rounded-2xl bg-[#F5F5F7]">
              {/* Notifications */}
              <div className="flex items-center justify-between border-b border-[#EAEAEA] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Notifications</div>
                </div>
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

              {/* Language */}
              <div className="flex cursor-pointer items-center justify-between border-b border-[#EAEAEA] px-4 py-4 hover:bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF9500]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-[#1B1B1D]">Language</div>
                    <div className="text-xs text-[#7A7B83]">English</div>
                  </div>
                </div>
                <ChevronRightIcon />
              </div>

              {/* Currency */}
              <div className="flex cursor-pointer items-center justify-between px-4 py-4 hover:bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#34C759]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-[#1B1B1D]">Currency</div>
                    <div className="text-xs text-[#7A7B83]">USD</div>
                  </div>
                </div>
                <ChevronRightIcon />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-[#7A7B83]">SECURITY</div>
            <div className="flex flex-col rounded-2xl bg-[#F5F5F7]">
              {/* Biometric Login */}
              <div className="flex items-center justify-between border-b border-[#EAEAEA] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF3B30]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Biometric Login</div>
                </div>
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

              {/* Auto Lock */}
              <div className="flex items-center justify-between border-b border-[#EAEAEA] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5856D6]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Auto Lock</div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={autoLock}
                    onChange={(e) => setAutoLock(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer-checked:bg-primary peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                </label>
              </div>

              {/* Change PIN */}
              <div className="flex cursor-pointer items-center justify-between border-b border-[#EAEAEA] px-4 py-4 hover:bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#AF52DE]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Change PIN</div>
                </div>
                <ChevronRightIcon />
              </div>

              {/* Privacy Policy */}
              <div className="flex cursor-pointer items-center justify-between px-4 py-4 hover:bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007AFF]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Privacy Policy</div>
                </div>
                <ChevronRightIcon />
              </div>
            </div>
          </div>

          {/* Display */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-[#7A7B83]">DISPLAY</div>
            <div className="flex flex-col rounded-2xl bg-[#F5F5F7]">
              {/* Show Balance */}
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF9500]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Show Balance</div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={showBalance}
                    onChange={(e) => setShowBalance(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer-checked:bg-primary peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none"></div>
                </label>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-[#7A7B83]">ABOUT</div>
            <div className="flex flex-col rounded-2xl bg-[#F5F5F7]">
              {/* Version */}
              <div className="flex items-center justify-between border-b border-[#EAEAEA] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8E8E93]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Version</div>
                </div>
                <div className="text-sm text-[#7A7B83]">1.0.0</div>
              </div>

              {/* Terms of Service */}
              <div className="flex cursor-pointer items-center justify-between border-b border-[#EAEAEA] px-4 py-4 hover:bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5856D6]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Terms of Service</div>
                </div>
                <ChevronRightIcon />
              </div>

              {/* Help & Support */}
              <div className="flex cursor-pointer items-center justify-between px-4 py-4 hover:bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#34C759]">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[#1B1B1D]">Help & Support</div>
                </div>
                <ChevronRightIcon />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button onClick={handleLogout} className="mt-2 bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
