import toast from 'react-hot-toast';
import CloseIcon from '@assets/shared/close.svg?react';
import CopyIcon from '@assets/shared/copy.svg?react';
import WalletIcon from '@assets/wallet.svg?react';
import { ConnectedWallet } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { appConfigs } from '@src/configs/app-configs';
import { useWallets } from '@src/hooks/use-wallets';
import { truncateAddress } from '@src/libs/utils/common';
import { useAccount, useBalance } from 'wagmi';

import Button from '../shared/button';
import { Drawer, DrawerContent } from '../shared/drawer';

interface WalletDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: ConnectedWallet | null;
}

const WalletDetailDrawer = ({ isOpen, onClose, wallet }: WalletDetailDrawerProps) => {
  const { wallets } = useWallets();
  const { address } = useAccount();
  const { setActiveWallet } = useSetActiveWallet();

  const { data: tokenBalance } = useBalance({
    address: wallet?.address as `0x${string}`,
    token: appConfigs.tokenContractAddress as `0x${string}`,
    query: { enabled: !!wallet },
  });

  const { data: nativeBalance } = useBalance({
    address: wallet?.address as `0x${string}`,
    query: { enabled: !!wallet },
  });

  const handleCopy = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      toast.success('Address copied!');
    }
  };

  const handleSetActive = async () => {
    if (!wallet) return;

    try {
      await setActiveWallet(wallet);
      toast.success('Active wallet updated');
      onClose();
    } catch (error) {
      console.error('Error setting active wallet:', error);
      toast.error('Failed to set active wallet');
    }
  };

  const handleUnlink = async () => {
    if (!wallet) return;

    try {
      await wallet.unlink();
      toast.success('Wallet unlinked successfully');
      onClose();
    } catch (error) {
      console.error('Error unlinking wallet:', error);
      toast.error('Failed to unlink wallet');
    }
  };

  const canUnlink = wallets.filter((w) => w.walletClientType !== 'privy').length > 1;
  const isActive = wallet?.address.toLowerCase() === address?.toLowerCase();

  if (!wallet) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose} container={document.getElementById('container')}>
      <DrawerContent className="absolute w-full bg-white">
        <div className="flex flex-col gap-6 px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1B1B1D]">Wallet Details</h2>
            <div onClick={onClose} className="cursor-pointer">
              <CloseIcon />
            </div>
          </div>

          {/* Wallet Info */}
          <div className="flex items-center gap-4 rounded-2xl border border-[#EAEAEA] p-5">
            {wallet.meta?.icon ? (
              <img src={wallet.meta.icon} alt={wallet.meta.name} className="h-12 w-12 rounded-lg" />
            ) : (
              <WalletIcon />
            )}
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="text-base font-semibold text-[#1B1B1D]">{wallet.meta?.name || 'Wallet'}</div>
                {isActive && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                    Active
                  </span>
                )}
              </div>
              <div className="text-sm text-[#7A7B83]">{truncateAddress(wallet.address)}</div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3 rounded-2xl bg-[#F5F5F7] p-4">
            <div className="text-sm font-semibold text-[#1B1B1D]">Wallet Address</div>
            <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-3">
              <div className="flex-1 break-all font-mono text-xs text-[#1B1B1D]">{wallet.address}</div>
              <div onClick={handleCopy} className="cursor-pointer">
                <CopyIcon />
              </div>
            </div>
          </div>

          {/* Balances */}
          <div className="flex flex-col gap-3 rounded-2xl bg-[#F5F5F7] p-4">
            <div className="text-sm font-semibold text-[#1B1B1D]">Balances</div>

            {/* USDT */}
            <div className="flex items-center justify-between py-2">
              <div className="text-sm text-[#7A7B83]">USDT</div>
              <div className="text-sm font-semibold text-[#1B1B1D]">
                {tokenBalance ? `${Number(tokenBalance.formatted).toFixed(2)} ${tokenBalance.symbol}` : '0.00'}
              </div>
            </div>

            {/* Native */}
            <div className="flex items-center justify-between border-t border-[#EAEAEA] py-2">
              <div className="text-sm text-[#7A7B83]">STM (Native)</div>
              <div className="text-sm font-semibold text-[#1B1B1D]">
                {nativeBalance ? `${Number(nativeBalance.formatted).toFixed(4)} ${nativeBalance.symbol}` : '0.00'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Make Active Button */}
            {!isActive && <Button onClick={handleSetActive}>Make Active Wallet</Button>}

            {/* Unlink Button */}
            <Button
              onClick={handleUnlink}
              disabled={!canUnlink}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {canUnlink ? 'Unlink Wallet' : 'Cannot unlink last wallet'}
            </Button>

            {!canUnlink && (
              <div className="text-center text-xs text-[#7A7B83]">You need at least one connected wallet</div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WalletDetailDrawer;
