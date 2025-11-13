import { useState } from 'react';
import creditCardJson from '@assets/animation/card-credit.json';
import image1Img from '@assets/image.png';
import CloseIcon from '@assets/shared/close.svg?react';
import metamaskImg from '@assets/wallet/metamask.png';
import Lottie from 'lottie-react';

import Button from '../shared/button';
import { Drawer, DrawerContent } from '../shared/drawer';

const ConfirmTransactionPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step] = useState(1);
  const [loading] = useState(false);

  const content = [
    {
      step: 1,
      content: (
        <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#D7D7D7] p-4">
          <div className="flex items-center justify-between">
            <div className="text-[17px] font-semibold text-[#1B1B1D]">Crypto Wallet</div>
            <div className="relative flex h-5 w-5 items-center justify-center">
              <input
                type="radio"
                name="wallet"
                className="border-1 peer h-5 w-5 cursor-pointer appearance-none rounded-full border-gray-300 checked:border-[#0066FF] checked:bg-white"
              />
              <div className="pointer-events-none absolute h-[10px] w-[10px] rounded-full bg-[#1712FF] opacity-0 peer-checked:opacity-100"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src={metamaskImg} alt="MetaMask" className="h-6 w-6 rounded-lg" />
          </div>
        </div>
      ),
    },
    {
      step: 2,
      content: (
        <div className="flex w-full flex-col gap-4 rounded-2xl border border-[#D7D7D7] px-5 py-4">
          <div className="flex items-center gap-4">
            <img src={metamaskImg} alt="Metamask" className="h-10 w-10 rounded-lg" />
            <div className="flex flex-col">
              <div className="text-base font-semibold text-[#1B1B1D]">Metamask Wallet</div>
              <div className="text-base text-[#7A7B83]">0x19231...2ffA6</div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#D7D7D7]"></div>
          <div className="flex items-center justify-between">
            <div className="text-base text-[#7A7B83]">Your balance:</div>
            <div className="text-base font-semibold text-[#1B1B1D]">$1,678,020</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose} container={document.getElementById('container')}>
      <DrawerContent className="absolute w-full bg-white">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-base font-semibold text-[#1B1B1D]">Processing your payment…</div>

            <Lottie animationData={creditCardJson} loop={true} width={200} className="w-[200px]! object-cover" />
          </div>
        ) : (
          <div className="flex flex-col gap-10 px-[24px] pb-8 pt-0">
            <div className="flex items-center justify-between">
              <div className="ml-auto">
                <CloseIcon />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img src={image1Img} alt="image1" className="h-12 w-12" />
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-semibold text-[#1B1B1D]">Nike Store</h1>
                <p className="text-sm text-[#1B1B1D] opacity-50">Nike Landmark 81</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="text-base font-semibold text-[#7A7B83]">Pay Amount</div>
                <div className="text-[34px] font-bold leading-[41px] text-[#1B1B1D]">200.24 USDT</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-base text-[#7A7B83]">Merchant Price</div>
                  <div className="text-base font-medium text-[#1B1B1D]">$199.06</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-base text-[#7A7B83]">Fee:</div>
                  <div className="text-base font-medium text-[#1B1B1D]">0.1 USDT</div>
                </div>
              </div>
            </div>

            {content[step]?.content}

            <Button>Confirm Payment</Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmTransactionPopup;
