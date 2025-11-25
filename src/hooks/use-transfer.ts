import { useCallback } from 'react';
import sendTxABI from '@src/abis/abi-send-tx.json';
import { appConfigs } from '@src/configs/app-configs';
import { useWriteContract } from 'wagmi';

export function useTransfer() {
  const { writeContractAsync } = useWriteContract();

  const transfer = useCallback(
    async (amount: string) => {
      try {
        const hash = await writeContractAsync({
          address: appConfigs.transferContractAddress as `0x${string}`,
          abi: sendTxABI,
          functionName: 'transferFunds',
          args: [appConfigs.tokenContractAddress as `0x${string}`, BigInt(amount)],
        });

        return hash;
      } catch (error) {
        console.error('Transfer error:', error);
        throw error;
      }
    },
    [writeContractAsync]
  );

  return {
    transfer,
  };
}
