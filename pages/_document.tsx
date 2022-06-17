import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const description =
    'Welcome to the world and characters of GMCafé, most succulent and tantalising establishment in the metaverse.';
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        <meta name="description" content={description} />

        <meta property="og:url" content="https://gmcafe.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Good Morning Café" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/meta_image.png" />
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
