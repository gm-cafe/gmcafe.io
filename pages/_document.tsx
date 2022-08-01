import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="favicon.ico" type="image/x-icon" />

        <script defer data-domain="gmcafe.io" src="/js/script.js"></script>
      </Head>
      <body className="cursor font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
