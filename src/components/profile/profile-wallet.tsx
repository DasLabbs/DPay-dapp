import { useState } from 'react';
import ChevronRightIcon from '@assets/shared/chevron-right.svg?react';
import WalletIcon from '@assets/wallet.svg?react';
import { ConnectedWallet, usePrivy } from '@privy-io/react-auth';
import { appConfigs } from '@src/configs/app-configs';
import { useWallets } from '@src/hooks/use-wallets';
import { truncateAddress } from '@src/libs/utils/common';
import { useAccount, useBalance } from 'wagmi';

import WalletDetailDrawer from './wallet-drawer';

const ProfileWallets = () => {
  const { wallets } = useWallets();
  const { address } = useAccount();
  const { linkWallet } = usePrivy();
  const [selectedWallet, setSelectedWallet] = useState<ConnectedWallet | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: tokenBalance } = useBalance({
    address: address as `0x${string}`,
    token: appConfigs.tokenContractAddress as `0x${string}`,
  });

  const { data: nativeBalance } = useBalance({
    address: address as `0x${string}`,
  });

  const ethereumWallets = wallets.filter((wallet) => wallet.walletClientType !== 'privy');

  const handleWalletClick = (wallet: ConnectedWallet) => {
    setSelectedWallet(wallet);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {/* Balances */}
          <div className="flex flex-col rounded-2xl bg-[#F5F5F7] p-4">
            {/* Token Balance */}
            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-[#7A7B83]">USDT Balance</div>
              <div className="text-sm font-semibold text-[#1B1B1D]">
                {tokenBalance ? `${Number(tokenBalance.formatted).toFixed(2)} ${tokenBalance.symbol}` : '0.00 USDT'}
              </div>
            </div>

            {/* Native Balance */}
            <div className="flex items-center justify-between border-t border-[#EAEAEA] py-4">
              <div className="text-sm text-[#7A7B83]">{appConfigs.sominiaNativeTokenSymbol} Balance</div>
              <div className="text-sm font-semibold text-[#1B1B1D]">
                {nativeBalance ? `${Number(nativeBalance.formatted).toFixed(4)} ${nativeBalance.symbol}` : '0.00 STM'}
              </div>
            </div>
          </div>

          {/* Connected Wallets */}
          <div className="flex flex-col gap-3">
            <div className="text-base font-semibold text-[#1B1B1D]">Connected Wallets</div>
            {ethereumWallets.map((wallet) => (
              <div
                key={wallet.address}
                onClick={() => handleWalletClick(wallet)}
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-[#F5F5F7] p-4 transition-opacity hover:opacity-80"
              >
                <div className="flex items-center gap-3">
                  {wallet.meta?.icon ? (
                    <img src={wallet.meta.icon} alt={wallet.meta.name} className="h-10 w-10 rounded-lg" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7084FF]">
                      <WalletIcon />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-semibold text-[#1B1B1D]">{wallet.meta?.name || 'Wallet'}</div>
                    <div className="text-xs text-[#7A7B83]">{truncateAddress(wallet.address)}</div>
                  </div>
                </div>
                <ChevronRightIcon />
              </div>
            ))}
          </div>
        </div>

        <button
          className="border-primary text-primary mx-auto mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[16px] border bg-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          onClick={linkWallet}
        >
          <WalletIcon />
          Link New Wallet
        </button>
      </div>

      <WalletDetailDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} wallet={selectedWallet} />
    </>
  );
};

export default ProfileWallets;
