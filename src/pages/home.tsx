import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BellIcon from '@assets/bell.svg?react';
import CardBg from '@assets/card-bg.png';
import MockImg from '@assets/image.png';
import Mock2Img from '@assets/image2.png';
import MoreIcon from '@assets/more.svg?react';
import ReceiveIcon from '@assets/receive.svg?react';
import RewardsIcon from '@assets/rewards.svg?react';
import SendIcon from '@assets/send.svg?react';
import SettingsIcon from '@assets/settings.svg?react';
import SwapIcon from '@assets/swap.svg?react';
import SwipeIcon from '@assets/swipe.svg?react';
import BottomBar from '@src/components/bottom-bar';
import Balance from '@src/components/home/balance';
import ConfirmTransactionPopup from '@src/components/popup/confirm-transaction-popup';
import CopyButton from '@src/components/shared/copy-button';
import SplashScreen from '@src/components/splash-screen';
import { truncateAddress } from '@src/libs/utils/common';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';

const HomePage = () => {
  const { address, isConnecting } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  const commingSoon = () => {
    toast('Coming Soon!', { icon: '🚧' });
  };

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Wait for fonts
        await document.fonts.ready;

        // Preload images
        const imagesToLoad = [CardBg, MockImg, Mock2Img];
        const imagePromises = imagesToLoad.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);

        // Minimum splash time
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

            <div className="flex flex-col gap-6 px-4 py-1">
              <div className="flex items-center gap-2">
                <SwapIcon />
                <div className="text-xl font-medium">Transactions</div>
              </div>
              <div className="flex w-full flex-col rounded-[32px] bg-[#F5F5F7] px-[24px]">
                <div className="flex items-center gap-4 border-b border-[#EAEAEA] py-6">
                  <img src={MockImg} alt="mock" className="h-[48px] w-[48px] rounded-xl" />
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-[15px] font-medium">Nike Air Force 1</h1>
                      <p className="text-xs opacity-50">Purchase</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">$200.24</div>
                      <div className="text-xs opacity-50">200.1 USDT</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-b border-[#EAEAEA] py-6">
                  <img src={Mock2Img} alt="mock" className="h-[48px] w-[48px] rounded-xl" />
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-[15px] font-medium">Caffe Latte</h1>
                      <p className="text-xs opacity-50">Purchase</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">$200.24</div>
                      <div className="text-xs opacity-50">200.1 USDT</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 py-6">
                  <SwipeIcon />
                  <div className="text-[12px] font-medium">Swipe up to see all transactions</div>
                </div>
              </div>
            </div>
            <BottomBar />
          </div>
        )}

        <ConfirmTransactionPopup isOpen={false} onClose={() => {}} />
      </AnimatePresence>
    </Suspense>
  );
};

export default HomePage;
