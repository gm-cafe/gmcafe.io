import Head from 'next/head';

const Rights = () => {
  return (
    <>
      <Head>
        <title>Commercial Rights</title>
      </Head>
      <main className="min-h-screen bg-gray-100 pt-48 text-lg font-medium text-purple">
        <section className="mx-10 flex max-w-screen-xl flex-col gap-6 xl:mx-auto">
          <h1 className="text-center font-gmcafe text-8xl">Commercial Rights</h1>
          <p className="mt-8">
            The GMCafé is essentially over 30 years of artistic learnings and tribulations bundled
            into cute cows. These moos are an important part of Ben&apos;s art journey - thank you
            for being here and making it possible now and into the future together.
          </p>
          <p>
            If you can&apos;t be bothered reading on - basically if you wanna use the Moos for
            personal, go right ahead! If it&apos;s for commercial use, please send Ben a message
            using #support in the Discord.
          </p>
          <p>How to use the Moo art for your own personal, non-commercial use:</p>
          <ul className="list-inside list-disc">
            <li>
              Use the Moo art when you&apos;re on a marketplace that allows the purchase and sale of
              your Moo, so long as the marketplace cryptographically verifies that you are the
              owner.
            </li>
            <li>
              Use the Moo art when you&apos;re on a third party website or app that allows the
              inclusion, involvement, or participation of your Moo, so long as the website/app
              cryptographically verifies that you are the owner, and the art doesn&apos;t stay on
              the website/app after you&apos;ve left it. ie. Twitter.
            </li>
            <li>
              Use the Moo art to create your own merchandise, provided that you aren&apos;t earning
              more than $50,000 in revenue each year from doing so. Before which approval and
              agreement will be needed to protect the overall brand.
            </li>
          </ul>
          <p>
            The way we use and share imagery has changed drastically from the beginning of the
            internet. One of the main challenges brands face everyday is IP dilution, through theft
            or unapproved use. Generally speaking, low quality art reproduction negatively impacts
            brands as new followers are fooled to thinking it is the genuine article. This is why we
            place so much value on working with our artist to make solid choices for all Moo NFT
            holders.
          </p>
          <ul className="list-inside list-disc">
            <li>
              For any commercial use (including NFT derivatives), please contact the team via
              #support in the Discord.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Rights;
