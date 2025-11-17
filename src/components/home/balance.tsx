import { useState } from 'react';
import EyeIcon from '@assets/eye.svg?react';
import EyeBlindIcon from '@assets/eye-blind.svg?react';
import { useAccount, useBalance } from 'wagmi';

const Balance = () => {
  const { address } = useAccount();
  const { data, isLoading } = useBalance({
    address: address,
  });

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const displayBalance = () => {
    if (isLoading) return '...';
    if (!isBalanceVisible) return `**** ${data?.symbol}`;
    return `${Number(data?.formatted).toFixed(2)} ${data?.symbol}`;
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs text-white">Your balance</div>
      <div className="flex items-center gap-3">
        <div className="text-[28px] font-bold text-white">{displayBalance()}</div>
        <button onClick={toggleBalanceVisibility} className="cursor-pointer">
          {isBalanceVisible ? <EyeIcon /> : <EyeBlindIcon />}
        </button>
      </div>
    </div>
  );
};

export default Balance;
