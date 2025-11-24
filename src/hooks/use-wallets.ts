import { usePrivy, useWallets as usePrivyWallets } from '@privy-io/react-auth';

export function useWallets() {
  const { wallets: userWallets, ready } = usePrivyWallets();
  const { user } = usePrivy();

  console.log('useWallets user data:', user);

  const wallets = userWallets.filter((wallet) => {
    return user?.linkedAccounts.some((account) => {
      if (account.type === 'wallet' && account.address) {
        return account.address.toLowerCase() === wallet.address.toLowerCase();
      }
      return false;
    });
  });

  return { wallets, ready };
}
