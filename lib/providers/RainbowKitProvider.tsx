import { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider as _RainbowKitProvider,
  lightTheme,
  Theme
} from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';
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

  const cafeTheme = merge(lightTheme(), {
    colors: {
      accentColor: '#ff7dbd', // pink
      accentColorForeground: '#fff',
      closeButton: '#fff',
      closeButtonBackground: '#ff7dbd', // pink
      generalBorder: '#ffedf6', // light pink
      modalBackdrop: 'rgba(255,255,255,0.3)',
      modalText: '#ff7dbd', // pink
      modalTextSecondary: '#8946ab', // purple,
      menuItemBackground: '#ffedf6', // light pink
    },
    fonts: {
      body: 'Quicksand',
    },
    shadows: {
      dialog: '' // seems to remove the modal dialog shadow
    }
  } as Theme);

  return (
    <WagmiConfig client={wagmiClient}>
      <_RainbowKitProvider chains={chains} theme={cafeTheme}>{children}</_RainbowKitProvider>
    </WagmiConfig>
  );
};
