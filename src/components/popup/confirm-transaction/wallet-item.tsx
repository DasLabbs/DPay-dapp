import { useMemo } from 'react';
import { ConnectedWallet } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { appConfigs } from '@src/configs/app-configs';
import { truncateAddress } from '@src/libs/utils/common';
import { useBalance } from 'wagmi';

type WalletItemProps = {
  wallet: ConnectedWallet;
  setStep: (step: 'wallet-select' | 'confirm' | 'processing') => void;
};

const WalletItem = (props: WalletItemProps) => {
  const { wallet, setStep } = props;
  const { setActiveWallet } = useSetActiveWallet();
  const { data } = useBalance({
    address: wallet.address as `0x${string}`,
    token: appConfigs.tokenContractAddress as `0x${string}`,
  });

  const isDisabled = useMemo(() => {
    return data ? Number(data.formatted) <= 0 : true;
  }, [data]);

  return (
    <div
      key={wallet.address}
      onClick={() => {
        if (isDisabled) return;
        setActiveWallet(wallet);
        setStep('confirm');
      }}
      className={
        `flex cursor-pointer flex-col items-center justify-between gap-4 rounded-2xl border border-[#D7D7D7] px-5 py-4 transition-all hover:border-[#7084FF] hover:bg-[#F5F7FF]` +
        (isDisabled ? ' pointer-events-none opacity-50' : '')
      }
    >
      <div className="flex w-full items-center gap-4">
        <img src={wallet.meta?.icon || ''} alt={wallet.meta?.name || 'Wallet'} className="h-10 w-10 rounded-lg" />
        <div className="flex flex-col">
          <div className="text-base font-semibold text-[#1B1B1D]">{wallet.meta?.name || 'Unknown'}</div>
          <div className="text-sm text-[#7A7B83]">{truncateAddress(wallet.address)}</div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#D7D7D7]"></div>
      <div className="flex w-full items-center justify-between">
        <div className="text-sm text-[#7A7B83]">Balance:</div>
        <div className="text-sm font-semibold text-[#1B1B1D]">
          {data ? `${Number(data.formatted).toFixed(2)} ${data.symbol}` : '0.00'}
        </div>
      </div>
    </div>
  );
};

export default WalletItem;
