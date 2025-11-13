import completeJson from '@assets/animation/complete.json';
import Lottie from 'lottie-react';

import Button from '../shared/button';

const PaymentStatus = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col items-center gap-4 py-8">
        <Lottie animationData={completeJson} loop={false} width={64} className="w-[64px]! object-cover" />
        <div className="flex flex-col items-center gap-2">
          <div className="text-base font-semibold text-[#7A7B83]">Payment Successful</div>
          <div className="text-text text-[34px] font-bold leading-[41px]">200.20 USDT</div>
        </div>
      </div>
      <div className="w-full p-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-[#EAEAEA] p-5">
          <div className="flex flex-col gap-2">
            <div className="text-text text-xl font-semibold">Transaction Information</div>
            <div className="font-base text-[#7A7B83]">5:00 PM, 07/05/2024</div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] py-4">
              <div className="text-base text-[#7A7B83]">Order ID</div>
              <div className="text-base font-semibold text-[#1B1B1D]">#128765HGY63</div>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="text-base text-[#7A7B83]">Pay Amount</div>
              <div className="text-base font-semibold text-[#1B1B1D]">200.02 USDT</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto flex w-full items-center justify-center px-6 pb-6">
        <Button className="w-full">Back to Home</Button>
      </div>
    </div>
  );
};

export default PaymentStatus;
