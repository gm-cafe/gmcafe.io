import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RainbowKitProvider } from '../lib/providers/RainbowKitProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RainbowKitProvider>
  );
}

export default MyApp;
