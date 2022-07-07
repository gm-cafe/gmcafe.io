import Head from 'next/head';
import Image from 'next/image';
import highFive from '../public/high_five.png';

const Rights = () => {
  return (
    <>
      <Head>
        <title>Commercial Rights</title>
      </Head>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 bg-gray-100 pt-48 text-lg font-medium text-purple">
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
                Use the Moo art when you&apos;re on a marketplace that allows the purchase and sale
                of your Moo, so long as the marketplace cryptographically verifies that you are the
                owner.
              </li>
              <li>
                Use the Moo art when you&apos;re on a third party website or app that allows the
                inclusion, involvement, or participation of your Moo, so long as the website/app
                cryptographically verifies that you are the owner, and the art doesn&apos;t stay on
                the website/app after you&apos;ve left it. ie. Twitter.
              </li>
              <li>
                Use the Moo art to create your own merchandise, provided that you aren&apos;t
                earning more than $50,000 in revenue each year from doing so. Before which approval
                and agreement will be needed to protect the overall brand.
              </li>
            </ul>
            <p>
              The way we use and share imagery has changed drastically from the beginning of the
              internet. One of the main challenges brands face everyday is IP dilution, through
              theft or unapproved use. Generally speaking, low quality art reproduction negatively
              impacts brands as new followers are fooled to thinking it is the genuine article. This
              is why we place so much value on working with our artist to make solid choices for all
              Moo NFT holders.
            </p>
            <ul className="list-inside list-disc">
              <li>
                For any commercial use (including NFT derivatives), please contact the team via
                #support in the Discord.
              </li>
            </ul>
          </section>
        </main>
        <footer className="relative flex w-full items-center justify-center overflow-hidden bg-gray-100 pb-12 pt-4">
          <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-10 sm:flex-row sm:gap-8">
            <div className="w-60 sm:block sm:w-48 md:w-64 xl:w-88 2xl:w-96">
              <Image src={highFive} layout="responsive" alt="Moos High Five" />
            </div>
          </div>
          <div className="absolute bottom-0 flex w-full flex-col justify-end">
            <div className="h-20 w-full bg-[url('/fence.png')] bg-[length:400px_auto] bg-bottom bg-repeat-x" />
            <div className="flex h-10 items-end justify-center bg-grass pb-2">
              <p className="text-xs text-purple opacity-30">© 2022 Colefax Corp.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Rights;
