import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import completeJson from '@assets/animation/complete.json';
import ShareIcon from '@assets/shared/share.svg?react';
import SquareArrowOutUpRight from '@assets/square-arrow-out-right.svg?react';
import { appConfigs } from '@src/configs/app-configs';
import { truncateAddress } from '@src/libs/utils/common';
import routes from '@src/routes/routes';
import { format } from 'date-fns';
import { ethers } from 'ethers';
import html2canvas from 'html2canvas';
import Lottie from 'lottie-react';

import Button from '../shared/button';

interface TransactionState {
  txHash: string;
  amount: string;
  currency: string;
  merchantName?: string;
  merchantCity?: string;
  fee: string;
  gasFee?: string;
  walletAddress: string;
  walletName?: string;
  walletIcon?: string;
  timestamp: string;
}

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [txData, setTxData] = useState<TransactionState | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = location.state as TransactionState;
    if (state) {
      setTxData(state);
    } else {
      navigate(routes.HOME);
    }
  }, [location.state, navigate]);

  const handleBackToHome = () => {
    navigate(routes.HOME);
  };

  const handleViewOnExplorer = () => {
    if (txData?.txHash) {
      window.open(`${appConfigs.sominiaExplorerURL}/tx/${txData.txHash}`, '_blank');
    }
  };

  const handleShare = async () => {
    if (!receiptRef.current || !txData) return;

    try {
      setIsSharing(true);

      // Capture receipt as image
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error('Failed to generate receipt image');
          return;
        }

        const file = new File([blob], 'receipt.png', { type: 'image/png' });

        // Check if Web Share API is supported
        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'Payment Receipt',
              text: `Payment of ${txData.amount} ${txData.currency} - ${format(new Date(txData.timestamp), 'MMM dd, yyyy')}`,
              files: [file],
            });
            toast.success('Receipt shared successfully');
          } catch (error: any) {
            if (error.name !== 'AbortError') {
              console.error('Share error:', error);
              // Fallback to download
              downloadReceipt(canvas);
            }
          }
        } else {
          // Fallback to download if Web Share API not supported
          downloadReceipt(canvas);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Failed to share receipt:', error);
      toast.error('Failed to share receipt');
    } finally {
      setIsSharing(false);
    }
  };

  const downloadReceipt = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `receipt-${txData?.txHash.slice(0, 8)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Receipt downloaded');
  };

  if (!txData) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div ref={receiptRef} className="flex flex-col bg-white">
        <div className="flex flex-col items-center gap-4 pb-4 pt-8">
          <Lottie animationData={completeJson} loop={false} width={64} className="w-[64px]! object-cover" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-base font-semibold text-[#7A7B83]">Payment Successful</div>
            <div className="text-text text-[34px] font-bold leading-[41px]">
              {txData.amount} {txData.currency}
            </div>
          </div>
        </div>

        <div className="w-full p-6">
          <div className="flex flex-col gap-5 rounded-2xl border border-[#EAEAEA] p-5">
            <div className="flex flex-col gap-2">
              <div className="text-text text-xl font-semibold">Transaction Information</div>
              <div className="font-base text-[#7A7B83]">
                {format(new Date(txData.timestamp), 'h:mm aa, MM/dd/yyyy')}
              </div>
            </div>

            <div className="flex flex-col">
              {/* Transaction Hash */}
              <div className="flex items-start justify-between border-b border-dashed border-[#D7D7D7] py-4">
                <div className="text-base text-[#7A7B83]">Transaction Hash</div>
                <div className="flex items-center gap-2" onClick={handleViewOnExplorer}>
                  <div className="text-right text-base font-semibold text-[#1B1B1D]">
                    {truncateAddress(txData.txHash)}
                  </div>
                  <div className="text-primary">
                    <SquareArrowOutUpRight strokeWidth={1.75} width={20} height={20} />
                  </div>
                </div>
              </div>

              {/* Pay Amount */}
              <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] py-4">
                <div className="text-base text-[#7A7B83]">Pay Amount</div>
                <div className="text-base font-semibold text-[#1B1B1D]">
                  {txData.amount} {txData.currency}
                </div>
              </div>

              {/* Fee */}
              <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] py-4">
                <div className="text-base text-[#7A7B83]">Fee</div>
                <div className="text-base font-semibold text-[#1B1B1D]">
                  {txData.fee} {txData.currency}
                </div>
              </div>

              {/* Gas Fee */}
              {txData.gasFee && (
                <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] py-4">
                  <div className="text-base text-[#7A7B83]">Gas Fee</div>
                  <div className="text-base font-semibold text-[#1B1B1D]">
                    {ethers.utils.formatEther(txData.gasFee)} {appConfigs.sominiaNativeTokenSymbol}
                  </div>
                </div>
              )}

              {/* Wallet */}
              <div className="flex items-center justify-between py-4">
                <div className="text-base text-[#7A7B83]">From Wallet</div>
                <div className="flex items-center gap-2">
                  {txData.walletIcon && <img src={txData.walletIcon} alt="Wallet" className="h-6 w-6 rounded" />}
                  <div className="text-base font-semibold text-[#1B1B1D]">{truncateAddress(txData.walletAddress)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex w-full gap-3 px-6 pb-6">
        <Button onClick={handleBackToHome} className="flex-1">
          Back to Home
        </Button>
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="border-primary text-primary flex h-12 w-12 items-center justify-center rounded-xl border transition-all hover:bg-[#F5F7FF] disabled:opacity-50"
        >
          {isSharing ? (
            <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
          ) : (
            <ShareIcon width={20} height={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
