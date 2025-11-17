import { createConfig } from '@privy-io/wagmi';
import { http } from 'viem';
import { somniaTestnet } from 'viem/chains';

export const networks = [somniaTestnet] as const;

export const wagmiConfig = createConfig({
  chains: networks,
  transports: {
    [somniaTestnet.id]: http(),
  },
});
