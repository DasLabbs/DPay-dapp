export const appConfigs = {
  apiURL: import.meta.env.VITE_API_URL as string,
  privyAppId: import.meta.env.VITE_PRIVY_APP_ID as string,
  privyClientId: import.meta.env.VITE_PRIVY_CLIENT_ID as string,
  tokenContractAddress: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS as string,
  transferContractAddress: import.meta.env.VITE_TRANSFER_CONTRACT_ADDRESS as string,
  sominiaChainId: Number(import.meta.env.VITE_SOMNIA_CHAIN_ID) as number,
  sominiaExplorerURL: import.meta.env.VITE_SOMINIA_EXPLORER_URL as string,
  sominiaNativeTokenSymbol: import.meta.env.VITE_SOMINIA_NATIVE_TOKEN_SYMBOL as string,
};
