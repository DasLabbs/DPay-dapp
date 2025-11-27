import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@assets/back.svg?react';
import TransferIcon from '@assets/transfer.svg?react';
import TransactionDetailDrawer from '@src/components/popup/transaction-detail/transaction-detail-popup';
import { truncateAddress } from '@src/libs/utils/common';
import { useAxios } from '@src/providers/axios-provider';
import { getTransactionsHistory, TransactionResponse } from '@src/services/transaction/transaction.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

interface GroupedTransactions {
  [key: string]: TransactionResponse[];
}

const History = () => {
  const navigate = useNavigate();
  const [selectedTx, setSelectedTx] = useState<TransactionResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const axios = useAxios();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['transactions-history'],
    queryFn: ({ pageParam = 1 }) => getTransactionsHistory(axios, { page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleTxClick = (tx: TransactionResponse) => {
    setSelectedTx(tx);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTx(null);
  };

  const allTransactions = data?.pages.flatMap((page) => page.items) || [];

  // Group transactions by month
  const groupedTransactions: GroupedTransactions = allTransactions.reduce((acc, tx) => {
    const monthYear = format(new Date(tx.createdAt), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(tx);
    return acc;
  }, {} as GroupedTransactions);

  return (
    <>
      <div className="flex h-full w-full flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-[#E5E5E5] px-4 py-4">
          <div onClick={() => navigate(-1)} className="absolute left-4 cursor-pointer">
            <BackIcon />
          </div>
          <h1 className="text-xl font-semibold text-[#1B1B1D]">History</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            // Loading skeleton
            <div className="flex flex-col">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-[#EAEAEA] px-6 py-6">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : allTransactions.length === 0 ? (
            // Empty state
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
              <div className="text-6xl">📭</div>
              <div className="text-center">
                <div className="text-lg font-semibold text-[#1B1B1D]">No transactions yet</div>
                <div className="text-sm text-[#7A7B83]">Your transaction history will appear here</div>
              </div>
            </div>
          ) : (
            // Transaction list grouped by month
            <div className="flex flex-col">
              {Object.entries(groupedTransactions).map(([monthYear, txs]) => (
                <div key={monthYear}>
                  {/* Month header */}
                  <div className="sticky top-0 z-10 bg-white px-6 py-4 text-base font-semibold text-[#1B1B1D]">
                    {monthYear}
                  </div>

                  {/* Transactions in this month */}
                  {txs.map((tx) => (
                    <div
                      key={tx._id}
                      onClick={() => handleTxClick(tx)}
                      className="flex cursor-pointer items-center gap-4 px-6 py-6 transition-opacity hover:opacity-80"
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
                        <div className="flex flex-col items-end gap-1">
                          <div className="text-right text-sm font-medium">${tx.formattedAmount}</div>
                          <div className="text-xs font-medium text-[#1B1B1D] opacity-50">
                            {format(new Date(tx.createdAt), 'MMM dd, HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Load more trigger */}
              {hasNextPage && (
                <div ref={ref} className="flex items-center justify-center py-6">
                  {isFetchingNextPage ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#7084FF] border-t-transparent" />
                      <span className="text-sm text-[#7A7B83]">Loading more...</span>
                    </div>
                  ) : (
                    <div className="text-sm text-[#7A7B83]">Scroll to load more</div>
                  )}
                </div>
              )}

              {/* End of list */}
              {/* {!hasNextPage && allTransactions.length > 0 && (
                <div className="flex items-center justify-center py-6">
                  <div className="text-sm text-[#7A7B83]">No more transactions</div>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>

      <TransactionDetailDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} transaction={selectedTx} />
    </>
  );
};

export default History;
