import { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider as _RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';

type RainbowKitProviderProps = {
  children: ReactNode | ReactNode[];
};

export const RainbowKitProvider = ({ children }: RainbowKitProviderProps) => {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.rinkeby],
    [apiProvider.infura(process.env.INFURA_KEY), apiProvider.fallback()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Good Morning Café',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiProvider client={wagmiClient}>
      <_RainbowKitProvider chains={chains}>{children}</_RainbowKitProvider>
    </WagmiProvider>
  );
};
