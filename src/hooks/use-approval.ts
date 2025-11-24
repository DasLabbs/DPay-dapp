import { useCallback, useMemo } from 'react';
import abiToken from '@src/abis/abi-token.json';
import { appConfigs } from '@src/configs/app-configs';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { useEthersProvider } from './use-ethers-provider';

export function useApproval() {
  const provider = useEthersProvider();
  const { address } = useAccount();

  const approveTokenAmount = useCallback(
    async (contractAddress: string, amount: string) => {
      try {
        const approveToken = new ethers.Contract(appConfigs.tokenContractAddress, abiToken, provider);
        return await approveToken.approve(contractAddress, amount);
      } catch (error) {
        console.error('Log - approve token amount error:', error);
        throw error;
      }
    },
    [address, provider]
  );

  const allowanceToken = useCallback(
    async (contractAddress: string) => {
      try {
        const contractToken = new ethers.Contract(appConfigs.tokenContractAddress, abiToken, provider);
        return await contractToken.allowance(address, contractAddress);
      } catch (error) {
        console.error('Log - allowance token error:', error);
        throw error;
      }
    },
    [address, provider]
  );

  return useMemo(() => {
    return {
      approveTokenAmount,
      allowanceToken,
    };
  }, [approveTokenAmount, allowanceToken]);
}
