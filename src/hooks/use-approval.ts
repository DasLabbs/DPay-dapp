import { useCallback, useState } from 'react';
import abiToken from '@src/abis/abi-token.json';
import { appConfigs } from '@src/configs/app-configs';
import { parseUnits } from 'viem';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useAccount } from 'wagmi';

export function useTokenApproval(spenderAddress: string) {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  // Check current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: appConfigs.tokenContractAddress as `0x${string}`,
    abi: abiToken,
    functionName: 'allowance',
    args: [address, spenderAddress],
    query: {
      enabled: !!address && !!spenderAddress,
    },
  });

  // Wait for approval transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Approve function
  const approve = useCallback(
    async (amount: string) => {
      try {
        const hash = await writeContractAsync({
          address: appConfigs.tokenContractAddress as `0x${string}`,
          abi: abiToken,
          functionName: 'approve',
          args: [spenderAddress as `0x${string}`, parseUnits(amount, 6)],
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error('Approve error:', error);
        throw error;
      }
    },
    [writeContractAsync, spenderAddress]
  );

  // Check if needs approval
  const needsApproval = useCallback(
    (amount: string) => {
      if (!allowance) return true;
      const requiredAmount = parseUnits(amount, 6);
      return BigInt(allowance.toString()) < requiredAmount;
    },
    [allowance]
  );

  return {
    approve,
    allowance,
    needsApproval,
    isConfirming,
    isSuccess,
    refetchAllowance,
  };
}
