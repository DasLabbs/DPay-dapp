import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { appConfigs } from '@src/configs/app-configs';
import { useAxios } from '@src/providers/axios-provider';
import { submitTransaction } from '@src/services/transaction/transaction.service';
import { parseUnits } from 'viem';
import { usePublicClient, useSwitchChain } from 'wagmi';

import { useTokenApproval } from './use-approval';
import { useTransfer } from './use-transfer';

export function useTransferFunds() {
  const [isLoading, setIsLoading] = useState(false);

  const { switchChainAsync } = useSwitchChain();
  const { transfer } = useTransfer();
  const axios = useAxios();
  const publicClient = usePublicClient();

  const { approve, needsApproval, refetchAllowance } = useTokenApproval(appConfigs.transferContractAddress);

  const transferFunds = useCallback(
    async (amount: number, qrPayload: string) => {
      try {
        setIsLoading(true);

        // Switch to correct chain
        await switchChainAsync({ chainId: appConfigs.sominiaChainId });

        const amountStr = amount.toString();

        // Check if approval needed
        if (needsApproval(amountStr)) {
          toast.loading('Requesting approval...', { id: 'approval' });

          const approveHash = await approve(amountStr);

          // Wait for approval transaction to be mined
          toast.loading('Confirming approval...', { id: 'approval' });
          await publicClient?.waitForTransactionReceipt({ hash: approveHash });

          toast.success('Approval confirmed!', { id: 'approval' });

          // Refetch allowance
          await refetchAllowance();
        }

        // Execute transfer
        toast.loading('Processing transfer...', { id: 'transfer' });

        const amountInWei = parseUnits(amountStr, 6); // USDT = 6 decimals
        const txHash = await transfer(amountInWei.toString());

        // Wait for transfer transaction to be mined
        toast.loading('Confirming transfer...', { id: 'transfer' });
        await publicClient?.waitForTransactionReceipt({ hash: txHash });

        toast.success('Transfer confirmed!', { id: 'transfer' });

        // Submit to backend
        const res = await submitTransaction(axios, {
          chainId: appConfigs.sominiaChainId,
          txHash: txHash,
          qrPayload,
        });

        toast.success('Payment successful!');
        return res;
      } catch (error: any) {
        console.error('Transfer funds error:', error);
        toast.dismiss();

        if (error?.code === 4001 || error?.code === 'ACTION_REJECTED') {
          toast.error('Transaction rejected');
        } else {
          toast.error(error?.shortMessage || error?.message || 'Transfer failed');
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [approve, needsApproval, transfer, switchChainAsync, axios, publicClient, refetchAllowance]
  );

  return {
    transferFunds,
    isPending: isLoading,
  };
}
