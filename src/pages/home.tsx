import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BellIcon from '@assets/bell.svg?react';
import CardBg from '@assets/card-bg.png';
import MoreIcon from '@assets/more.svg?react';
import ReceiveIcon from '@assets/receive.svg?react';
import RewardsIcon from '@assets/rewards.svg?react';
import SendIcon from '@assets/send.svg?react';
import SettingsIcon from '@assets/settings.svg?react';
import BottomBar from '@src/components/bottom-bar';
import Balance from '@src/components/home/balance';
import TransactionList from '@src/components/home/transaction-list';
import CopyButton from '@src/components/shared/copy-button';
import SplashScreen from '@src/components/splash-screen';
import { truncateAddress } from '@src/libs/utils/common';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';

const HomePage = () => {
  const { address, isConnecting } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  const commingSoon = () => {
    toast('Coming Soon!', {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    });
  };

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await document.fonts.ready;
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading assets:', error);
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  return (
    <Suspense fallback={<SplashScreen />}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" />
        ) : (
          <div className="relative flex h-full w-full flex-col">
            <div className="border-b-border flex w-full items-center justify-between gap-8 bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.80)_48.56%,rgba(255,255,255,0.50)_100%)] px-4 py-3 backdrop-blur-[50px]">
              <SettingsIcon />

              <div className="flex items-center gap-2">
                <div className="text-[17px] font-medium leading-[22px]">Main Account</div>
              </div>

              <BellIcon />
            </div>

            <div className="relative w-full py-4">
              <img src={CardBg} alt="card-bg" className="h-auto w-full" />
              <div className="absolute left-10 top-10 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <Balance />
                  {isConnecting || !address ? (
                    <div className="h-7 w-36 animate-pulse rounded-[12px] bg-white/20" />
                  ) : (
                    <div className="flex w-fit items-center gap-2 rounded-[12px] bg-[rgba(0,0,0,0.16)] px-2 py-[6px]">
                      <div className="text-xs text-white">{truncateAddress(address)}</div>
                      <CopyButton text={address} />
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-10 left-10 flex w-[80%] items-center justify-between">
                <div className="flex flex-col items-center gap-[6px]" onClick={commingSoon}>
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[16.64px] border-[0.5px] border-solid border-[rgba(255,255,255,0.24)] bg-[linear-gradient(91deg,rgba(4,105,191,0.20)_0.62%,rgba(8,126,227,0.20)_99.6%)]">
                    <ReceiveIcon />
                  </div>
                  <div className="text-xs text-white">Receive</div>
                </div>

                <div className="flex flex-col items-center gap-[6px]" onClick={commingSoon}>
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[16.64px] border-[0.5px] border-solid border-[rgba(255,255,255,0.24)] bg-[linear-gradient(91deg,rgba(4,105,191,0.20)_0.62%,rgba(8,126,227,0.20)_99.6%)]">
                    <SendIcon />
                  </div>
                  <div className="text-xs text-white">Send</div>
                </div>

                <div className="flex flex-col items-center gap-[6px]" onClick={commingSoon}>
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[16.64px] border-[0.5px] border-solid border-[rgba(255,255,255,0.24)] bg-[linear-gradient(91deg,rgba(4,105,191,0.20)_0.62%,rgba(8,126,227,0.20)_99.6%)]">
                    <RewardsIcon />
                  </div>
                  <div className="text-xs text-white">Rewards</div>
                </div>

                <div className="flex flex-col items-center gap-[6px]" onClick={commingSoon}>
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[16.64px] border-[0.5px] border-solid border-[rgba(255,255,255,0.24)] bg-[linear-gradient(91deg,rgba(4,105,191,0.20)_0.62%,rgba(8,126,227,0.20)_99.6%)]">
                    <MoreIcon />
                  </div>
                  <div className="text-xs text-white">More</div>
                </div>
              </div>
            </div>

            <TransactionList />

            <BottomBar />
          </div>
        )}
      </AnimatePresence>
    </Suspense>
  );
};

export default HomePage;
