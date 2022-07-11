import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const description =
    'Welcome to the world and characters of GMCafé, most succulent and tantalising establishment in the metaverse.';
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <meta name="description" content={description} />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />

        <meta property="og:url" content="https://gmcafe.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Good Morning Café" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://gmcafe.io/meta_image.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@gmcafeNFT" />
        <meta name="twitter:title" content="Good Morning Café" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://gmcafe.io/meta_image.png" />

        <script defer data-domain="gmcafe.io" src="/js/script.js"></script>
      </Head>
      <body className="cursor font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
