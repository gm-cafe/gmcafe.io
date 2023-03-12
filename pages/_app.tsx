import '../styles/globals.css';
import '../styles/mint.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RainbowKitProvider } from '../lib/providers/RainbowKitProvider';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export type PageProps = {
  title?: string;
  metaImage?: string;
  metaDescription?: string;
  twitterCard?: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { title, metaImage, metaDescription, twitterCard, ...props } = pageProps;
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {metaImage && <meta property="og:image" content={metaImage} />}
        {metaImage && <meta name="twitter:image" content={metaImage} />}
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaDescription && <meta property="og:description" content={metaDescription} />}
        {metaDescription && <meta name="twitter:description" content={metaDescription} />}
        <meta name="twitter:card" content={twitterCard || 'summary'} />
      </Head>
      <RainbowKitProvider>
        <div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                color: '#8946ab',
              },
            }}
          />
        </div>
        <Layout>
          <Component {...props} />
        </Layout>
      </RainbowKitProvider>
    </>
  );
}

export default MyApp;
