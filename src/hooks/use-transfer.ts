import { useCallback, useMemo } from 'react';
import sendTxABI from '@src/abis/abi-send-tx.json';
import { appConfigs } from '@src/configs/app-configs';
import { ethers } from 'ethers';

import { useEthersProvider } from './use-ethers-provider';

export function useTransfer() {
  const provider = useEthersProvider();

  const transfer = useCallback(
    async (amount: string) => {
      const transferTxn = new ethers.Contract(appConfigs.transferContractAddress, sendTxABI, provider);
      return await transferTxn.transferFunds(appConfigs.tokenContractAddress, amount);
    },
    [provider]
  );

  return useMemo(() => {
    return {
      transfer,
    };
  }, [transfer]);
}
