import CloseIcon from '@assets/shared/close.svg?react';
import { useWallets } from '@src/hooks/use-wallets';

import WalletItem from './wallet-item';

type ChooseWalletProps = {
  onClose: () => void;
  setStep: (step: 'wallet-select' | 'confirm' | 'processing') => void;
};

const ChooseWallet = (props: ChooseWalletProps) => {
  const { onClose, setStep } = props;
  const { wallets, ready: walletsReady } = useWallets();
  return (
    <div className="flex flex-col gap-6 px-[24px] py-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Choose Wallet</div>
        <div onClick={onClose}>
          <CloseIcon />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        {/* Wallet List */}
        {walletsReady && (
          <div className="flex flex-col gap-3">
            {wallets.map((wallet) => (
              <WalletItem key={wallet.address} wallet={wallet} setStep={setStep} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseWallet;
