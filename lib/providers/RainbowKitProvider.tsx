import { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider as _RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

type RainbowKitProviderProps = {
  children: ReactNode | ReactNode[];
};

export const RainbowKitProvider = ({ children }: RainbowKitProviderProps) => {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.rinkeby],
    [infuraProvider({ infuraId: process.env.INFURA_KEY }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Good Morning Café',
    chains,
  });

  const wagmiClient = createClient({
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <_RainbowKitProvider chains={chains}>{children}</_RainbowKitProvider>
    </WagmiConfig>
  );
};
