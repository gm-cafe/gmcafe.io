import Image from 'next/image';
import { Discord } from '../components/StyledLinks';
import highFive from '../public/high_five.png';

const Rights = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-100 pt-48 text-lg font-medium text-purple">
        <section className="mx-10 flex max-w-screen-xl flex-col gap-6 xl:mx-auto">
          <h1 className="text-center font-gmcafe text-7xl sm:text-8xl">Commercial Rights</h1>
          <p className="mt-8">
            The GMCafé is essentially over 30 years of artistic learnings and tribulations bundled
            into cute cows and dinosaurs. These Moos and Keeks are an important part of Ben&apos;s
            art journey - thank you for being here and making it possible now and into the future
            together.
          </p>
          <p>
            If you can&apos;t be bothered reading on - basically if you wanna utilize the Moos or
            Keeks for personal use, go right ahead! If it&apos;s for commercial use, please send Ben
            a message using the #support channel in the <Discord />.
          </p>
          <p className="font-semibold">
            What am I allowed to do with the art associated with my NFT?
          </p>
          <ul className="list-inside list-disc">
            <li>Use the GMCafé art for your own personal, non-commercial use</li>
            <li>
              Use the GMCafé art when you&apos;re on a marketplace that allows the purchase and sale
              of your NFT, so long as the marketplace cryptographically verifies that you are the
              owner
            </li>
            <li>
              Use the GMCafé art when you&apos;re on a third party website or app that allows the
              inclusion, involvement, or participation of your NFT, so long as the website/app
              cryptographically verifies that you are the owner, and the GMCafé art doesn&apos;t
              stay on the website/app after you&apos;ve left
            </li>
            <li>
              Use the GMCafé art to commercialize your own merchandise, provided that you
              aren&apos;t earning more than $50,000 in revenue each year from doing so, before which
              approval and agreement will be needed to protect the overall brand
            </li>
          </ul>
          <p className="font-semibold">
            What am I NOT allowed to do with the art associated with my NFT?
          </p>
          <ul className="list-inside list-disc">
            <li>Creating a GMCafé derivative collection without explicit permission</li>
            <li>Using the GMCafé art to market or sell third-party products</li>
            <li>
              Using the GMCafé art in connection with images of hatred, violence, or other
              inappropriate behavior
            </li>
            <li>
              Trying to trademark the GMCafé art, or otherwise acquire intellectual property rights
              in it
            </li>
          </ul>
          <p>
            The way we use and share imagery has changed drastically from the beginning of the
            internet. One of the main challenges brands face everyday is IP dilution, through theft
            or unapproved use. Generally speaking, low quality art reproduction negatively impacts
            brands as new followers are fooled to thinking it is the genuine article. This is why we
            place so much value on working with our artist to make solid choices for all Moo and
            Keek NFT holders.
          </p>
          <ul className="list-inside list-disc">
            <li>
              For any commercial use (including NFT derivatives), please contact the team via
              #support in the <Discord />.
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
  );
};

export default Rights;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Good Morning Café',
      metaImage: 'https://gmcafe.io/meta_image.png',
      metaDescription:
        'Welcome to the world and characters of GMCafé, most succulent and tantalising establishment in the metaverse.',
    },
  };
};
