import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Keek = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-pink-background pb-4 pt-32 md:pt-36">
      <div className="flex items-center gap-4">
        <div className="w-16 md:w-32">
          <Image src="/coffee_spill.png" alt="" width={700} height={800} />
        </div>
        <h1 className="font-gmcafe text-4xl text-purple md:text-5xl">Coming soon...</h1>
        <div className="md:w-14" />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Link href={`/moo/${Math.round(Math.random() * 333)}`}>
          <a className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-gmcafe text-2xl text-purple transition-transform hover:scale-110 md:text-3xl">
            <div className="h-8 w-8 md:h-10 md:w-10">
              <Image src="/mint/dice.png" width={100} height={100} alt="" />
            </div>
            Moo Profile
          </a>
        </Link>
        <Link href="/traits">
          <a className="mx-auto flex items-center gap-2 rounded-full bg-white px-4 py-2 font-gmcafe text-2xl text-purple transition-transform hover:scale-110 md:text-3xl">
            <div className="h-8 w-8 md:h-10 md:w-10">
              <Image src="/migrate/cup.png" width={100} height={100} alt="" />
            </div>
            Traits
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Keek;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const tokenId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;

  if (!tokenId || tokenId < 1) {
    return {
      redirect: {
        destination: '/keek/1',
        permanent: false,
      },
    };
  } else if (tokenId > 3333) {
    return {
      redirect: {
        destination: '/keek/3333',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: tokenId,
    },
  };
};
