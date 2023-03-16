import { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider as _RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

type RainbowKitProviderProps = {
  children: ReactNode | ReactNode[];
};

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: '47434bfa14b446bab19576bdab9d5205' }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Good Morning Café',
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
  webSocketProvider,
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
    body: 'Hepta Slab',
  },
  shadows: {
    dialog: '', // seems to remove the modal dialog shadow
  },
});

export const RainbowKitProvider = ({ children }: RainbowKitProviderProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <_RainbowKitProvider chains={chains} theme={cafeTheme}>
        {children}
      </_RainbowKitProvider>
    </WagmiConfig>
  );
};
