import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RainbowKitProvider } from '../lib/providers/RainbowKitProvider';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitProvider>
      <div>
        <Toaster position="bottom-right" />
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RainbowKitProvider>
  );
}

export default MyApp;
