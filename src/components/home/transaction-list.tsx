import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwapIcon from '@assets/swap.svg?react';
import SwipeIcon from '@assets/swipe.svg?react';
import TransferIcon from '@assets/transfer.svg?react';
import { formatBalance, truncateAddress } from '@src/libs/utils/common';
import { useAxios } from '@src/providers/axios-provider';
import { getTransactionsHistory, TransactionResponse } from '@src/services/transaction/transaction.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import TransactionDetailDrawer from '../popup/transaction-detail/transaction-detail-popup';

const TransactionList = () => {
  const [selectedTx, setSelectedTx] = useState<TransactionResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', { page: 1, limit: 2 }],
    queryFn: () => getTransactionsHistory(axios, { page: 1, limit: 2 }),
  });

  const handleTxClick = (tx: TransactionResponse) => {
    setSelectedTx(tx);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTx(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 py-1">
        <div className="flex items-center gap-2">
          <SwapIcon />
          <div className="text-xl font-medium">Transactions</div>
        </div>
        <div className="flex w-full flex-col rounded-[32px] bg-[#F5F5F7] px-[24px]">
          <div className="flex items-center gap-4 border-b border-[#EAEAEA] py-6">
            <div className="h-[48px] w-[48px] animate-pulse rounded-xl bg-gray-300" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transactions?.items?.length) {
    return (
      <div className="flex flex-col gap-6 px-4 py-1">
        <div className="flex items-center gap-2">
          <SwapIcon />
          <div className="text-xl font-medium">Transactions</div>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-[32px] bg-[#F5F5F7] py-12">
          <div className="text-center text-sm text-gray-500">No transactions yet</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 px-4 py-1">
        <div className="flex items-center gap-2">
          <SwapIcon />
          <div className="text-xl font-medium">Transactions</div>
        </div>
        <div className="flex w-full flex-col rounded-[32px] bg-[#F5F5F7] px-[24px]">
          {transactions.items.map((tx) => (
            <div
              key={tx._id}
              onClick={() => handleTxClick(tx)}
              className={`flex cursor-pointer items-center gap-4 border-b border-[#EAEAEA] py-6 transition-opacity hover:opacity-80`}
            >
              <TransferIcon />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[15px] font-medium">{truncateAddress(tx.hash)}</h1>
                  <div
                    className={`text-xs font-medium capitalize ${
                      tx.status === 'confirmed'
                        ? 'text-green-600'
                        : tx.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {tx.status}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-right text-sm font-medium">${formatBalance(tx.formattedAmount)}</div>
                  <div className={`text-xs font-medium text-[#1B1B1D] opacity-50`}>
                    {format(new Date(tx.createdAt), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            className="flex items-center justify-center gap-2 py-6"
            onClick={() => {
              navigate('/history');
            }}
          >
            <SwipeIcon />
            <div className="text-[12px] font-medium">Swipe up to see all transactions</div>
          </div>
        </div>
      </div>

      <TransactionDetailDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} transaction={selectedTx} />
    </>
  );
};

export default TransactionList;
