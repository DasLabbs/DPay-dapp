import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import creditCardJson from '@assets/animation/card-credit.json';
import ArrowLeftIcon from '@assets/shared/arrow-left.svg?react';
import CloseIcon from '@assets/shared/close.svg?react';
import { useWallets } from '@privy-io/react-auth';
import { appConfigs } from '@src/configs/app-configs';
import { useTransferFunds } from '@src/hooks/use-transfer-funs';
import { EMVQRData } from '@src/libs/helpers/qr-paser';
import { truncateAddress } from '@src/libs/utils/common';
import routes from '@src/routes/routes';
import Lottie from 'lottie-react';
import { useAccount, useBalance } from 'wagmi';

import Button from '../../shared/button';
import { Drawer, DrawerContent } from '../../shared/drawer';

import ChooseWallet from './choose-wallet';

interface ConfirmTransactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: EMVQRData;
}

type Step = 'wallet-select' | 'confirm' | 'processing';

const ConfirmTransactionPopup = ({ isOpen, onClose, data }: ConfirmTransactionPopupProps) => {
  const { address } = useAccount();
  const [step, setStep] = useState<Step>('wallet-select');
  const { wallets } = useWallets();
  const navigate = useNavigate();

  const activeWallet = useMemo(() => {
    return wallets.find((wallet) => wallet.address === address);
  }, [wallets, address]);

  const { data: walletBalance } = useBalance({
    address: activeWallet?.address as `0x${string}`,
    token: appConfigs.tokenContractAddress as `0x${string}`,
  });

  // Calculate fee (0.5%)
  const amount = parseFloat(data.transactionAmount || '0');
  const fee = (amount * 0).toFixed(2);
  const totalAmount = (amount + parseFloat(fee)).toFixed(2);

  const { transferFunds } = useTransferFunds();

  const getErrorMessage = (error: any): string => {
    // User rejected transaction
    if (error?.code === 'ACTION_REJECTED' || error?.code === 4001) {
      return 'Transaction rejected by user';
    }

    // Insufficient funds
    if (error?.message?.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }

    // Network error
    if (error?.message?.includes('network')) {
      return 'Network error. Please check your connection';
    }

    // Gas estimation failed
    if (error?.message?.includes('gas')) {
      return 'Gas estimation failed. Please try again';
    }

    // Contract error
    if (error?.message?.includes('execution reverted')) {
      return 'Transaction failed. Contract execution reverted';
    }

    // Default error
    return error?.message || 'Transaction failed. Please try again';
  };

  const handleConfirmPayment = async () => {
    if (!data.merchantAccount || !data.transactionAmount) {
      toast.error('Invalid payment data');
      return;
    }

    try {
      setStep('processing');
      const res = await transferFunds(parseFloat(totalAmount), data.qrPayload);
      handleClose();

      navigate(routes.TX_STATUS, {
        state: {
          txHash: res.hash,
          amount: totalAmount,
          currency: data.transactionCurrency,
          merchantName: data.merchantName,
          merchantCity: data.merchantCity,
          fee,
          gasFee: res.totalFee,
          walletAddress: address,
          walletName: activeWallet?.meta?.name,
          walletIcon: activeWallet?.meta?.icon,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      setStep('confirm');
    }
  };

  const handleClose = () => {
    setStep('wallet-select');
    onClose();
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('wallet-select');
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose} container={document.getElementById('container')}>
      <DrawerContent className="absolute w-full bg-white">
        {/* Wallet Select Step */}
        {step === 'wallet-select' && <ChooseWallet onClose={handleClose} setStep={setStep} />}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <div className="flex flex-col gap-10 px-[24px] py-8">
            <div className="flex items-center justify-between">
              <div onClick={handleBack}>
                <ArrowLeftIcon />
              </div>
              <div onClick={handleClose}>
                <CloseIcon />
              </div>
            </div>

            {/* Payment Amount */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="text-base font-semibold text-[#7A7B83]">Pay Amount</div>
                <div className="text-[34px] font-bold leading-[41px] text-[#1B1B1D]">
                  {totalAmount} {data.transactionCurrency}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-base text-[#7A7B83]">Merchant Price</div>
                  <div className="text-base font-medium text-[#1B1B1D]">
                    {data.transactionAmount} {data.transactionCurrency}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-base text-[#7A7B83]">Fee (0.5%):</div>
                  <div className="text-base font-medium text-[#1B1B1D]">
                    {fee} {data.transactionCurrency}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Wallet Info */}
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-[#D7D7D7] px-5 py-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={activeWallet?.meta?.icon || ''} alt="Wallet" className="h-10 w-10 rounded-lg" />
                  <div className="flex flex-col">
                    <div className="text-base font-semibold text-[#1B1B1D]">
                      {activeWallet?.meta?.name || 'Your Wallet'}
                    </div>
                    <div className="text-base text-[#7A7B83]">
                      {address ? truncateAddress(address) : 'Not connected'}
                    </div>
                  </div>
                </div>
                <button
                  className="border-primary text-primary flex h-[32px] w-[73px] cursor-pointer items-center justify-center rounded-lg border text-xs font-semibold"
                  onClick={() => setStep('wallet-select')}
                >
                  Switch
                </button>
              </div>
              <div className="h-[1px] w-full bg-[#D7D7D7]"></div>
              <div className="flex w-full items-center justify-between">
                <div className="text-sm text-[#7A7B83]">Balance:</div>
                <div className="text-sm font-semibold text-[#1B1B1D]">
                  {walletBalance ? `${Number(walletBalance.formatted).toFixed(2)} ${walletBalance.symbol}` : '0.00'}
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirmPayment}
              disabled={
                !address ||
                !activeWallet ||
                (walletBalance ? Number(walletBalance.formatted) < parseFloat(totalAmount) : true)
              }
            >
              {walletBalance && Number(walletBalance.formatted) < parseFloat(totalAmount)
                ? 'Insufficient Balance'
                : 'Confirm Payment'}
            </Button>
          </div>
        )}

        {/* Processing Step */}
        {step === 'processing' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-base font-semibold text-[#1B1B1D]">Processing your payment…</div>
            <Lottie animationData={creditCardJson} loop={true} width={200} className="w-[200px]! object-cover" />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmTransactionPopup;
