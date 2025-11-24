import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClientProvider } from '@tanstack/react-query';

import { appConfigs } from './configs/app-configs';
import { wagmiConfig } from './configs/wagmi-config';
import queryClient from './libs/client/query-client';
import { AxiosProvider } from './providers/axios-provider';
import AppRoutes from './routes/app-routes';

import './App.css';

function App() {
  return (
    <PrivyProvider appId={appConfigs.privyAppId} clientId={appConfigs.privyClientId}>
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <AppRoutes />
          </WagmiProvider>
        </QueryClientProvider>
      </AxiosProvider>
    </PrivyProvider>
  );
}

export default App;
