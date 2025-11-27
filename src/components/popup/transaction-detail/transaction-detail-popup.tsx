import CloseIcon from '@assets/shared/close.svg?react';
import SquareArrowOutUpRight from '@assets/square-arrow-out-right.svg?react';
import Button from '@src/components/shared/button';
import { Drawer, DrawerContent } from '@src/components/shared/drawer';
import { appConfigs } from '@src/configs/app-configs';
import { truncateAddress } from '@src/libs/utils/common';
import { TransactionResponse } from '@src/services/transaction/transaction.service';
import { format } from 'date-fns';
import { ethers } from 'ethers';

interface TransactionDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionResponse | null;
}

const TransactionDetailDrawer = ({ isOpen, onClose, transaction }: TransactionDetailDrawerProps) => {
  if (!transaction) return null;

  const handleViewOnExplorer = () => {
    window.open(`${appConfigs.sominiaExplorerURL}/tx/${transaction.hash}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} container={document.getElementById('container')}>
      <DrawerContent className="absolute w-full bg-white">
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1B1B1D]">Transaction Details</h2>
            <div onClick={onClose} className="cursor-pointer">
              <CloseIcon />
            </div>
          </div>

          {/* Transaction Info */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#EAEAEA] p-5">
            {/* Transaction Hash */}
            <div className="flex items-start justify-between border-b border-dashed border-[#D7D7D7] pb-4">
              <div className="text-base text-[#7A7B83]">Transaction Hash</div>
              <div className="flex items-center gap-2" onClick={handleViewOnExplorer}>
                <div className="text-base font-semibold">{truncateAddress(transaction.hash)}</div>
                <div className="text-primary cursor-pointer">
                  <SquareArrowOutUpRight strokeWidth={1.75} width={20} height={20} />
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] pb-4">
              <div className="text-base text-[#7A7B83]">Amount</div>
              <div className="text-base font-semibold text-[#1B1B1D]">{transaction.formattedAmount} USDT</div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] pb-4">
              <div className="text-base text-[#7A7B83]">Status</div>
              <div className={`text-base font-semibold capitalize ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </div>
            </div>

            {/* From */}
            <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] pb-4">
              <div className="text-base text-[#7A7B83]">From</div>
              <div className="text-base font-semibold text-[#1B1B1D]">{truncateAddress(transaction.from)}</div>
            </div>

            {/* To */}
            <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] pb-4">
              <div className="text-base text-[#7A7B83]">To</div>
              <div className="text-base font-semibold text-[#1B1B1D]">{truncateAddress(transaction.to)}</div>
            </div>

            {/* Gas Fee */}
            <div className="flex items-center justify-between border-b border-dashed border-[#D7D7D7] pb-4">
              <div className="text-base text-[#7A7B83]">Gas Fee</div>
              <div className="text-base font-semibold text-[#1B1B1D]">
                {ethers.utils.formatUnits(transaction.totalFee)} {appConfigs.sominiaNativeTokenSymbol}
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center justify-between">
              <div className="text-base text-[#7A7B83]">Date & Time</div>
              <div className="text-base font-semibold text-[#1B1B1D]">
                {format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm:ss')}
              </div>
            </div>
          </div>

          {/* View on Explorer Button */}
          <Button onClick={handleViewOnExplorer}>
            View on Explorer
            <SquareArrowOutUpRight strokeWidth={2} width={18} height={18} />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TransactionDetailDrawer;
