import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { RainbowKitProvider } from '../lib/providers/RainbowKitProvider';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export type PageProps = {
  title?: string;
  metaImage?: string;
  metaDescription?: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { title, metaImage, metaDescription, ...props } = pageProps;
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {metaImage && <meta property="og:image" content={metaImage} />}
        {metaImage && <meta name="twitter:image" content={metaImage} />}
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaDescription && <meta property="og:description" content={metaDescription} />}
        {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      </Head>
      <RainbowKitProvider>
        <div>
          <Toaster position="bottom-right" />
        </div>
        <Layout>
          <Component {...props} />
        </Layout>
      </RainbowKitProvider>
    </>
  );
}

export default MyApp;
