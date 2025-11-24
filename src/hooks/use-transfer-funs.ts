import { useCallback, useMemo, useState } from 'react';
import { appConfigs } from '@src/configs/app-configs';
import { useAxios } from '@src/providers/axios-provider';
import { submitTransaction } from '@src/services/transaction/transaction.service';
import { ethers } from 'ethers';
import { useSwitchChain } from 'wagmi';

import { useApproval } from './use-approval';
import { useTransfer } from './use-transfer';

export function useTransferFunds() {
  const [isLoading, setIsLoading] = useState(false);
  const { allowanceToken, approveTokenAmount } = useApproval();
  const { switchChainAsync } = useSwitchChain();
  const { transfer } = useTransfer();
  const axios = useAxios();

  const transferFunds = useCallback(
    async (amount: number, qrPayload: string) => {
      try {
        setIsLoading(true);
        await switchChainAsync({ chainId: appConfigs.sominiaChainId });
        const amountEther = ethers.utils.parseEther(amount.toString());
        const amountWei = ethers.utils.formatUnits(amountEther, 'wei').toString();

        const allowance = await allowanceToken(appConfigs.transferContractAddress);
        const amountApproved = ethers.utils.formatEther(allowance);

        if (!amountApproved || Number(amountApproved) < amount) {
          const approveTxn = await approveTokenAmount(appConfigs.transferContractAddress, amountWei);
          await approveTxn.wait();
        }

        const transferTxn = await transfer(amountWei);
        const tx = await transferTxn.wait();
        const res = await submitTransaction(axios, {
          chainId: appConfigs.sominiaChainId,
          txHash: tx.transactionHash,
          qrPayload,
        });

        return res;
      } catch (error) {
        console.error('Log - transfer funds error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [allowanceToken, approveTokenAmount, transfer, axios]
  );

  return useMemo(() => {
    return {
      transferFunds,
      isPending: isLoading,
    };
  }, [allowanceToken, approveTokenAmount, transfer, isLoading]);
}
