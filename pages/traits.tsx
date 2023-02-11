import type { GetServerSideProps, NextPage } from 'next';

import Filters from '../components/traits/Filters';
import { FilterProvider } from '../lib/providers/FilterProvider';
import Cards from '../components/traits/Cards';
import { EntryProvider } from '../lib/providers/EntryProvider';

type Props = {
  imageUrl: string;
};

const Home: NextPage<Props> = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-background px-6 pb-12 pt-36 md:px-12 md:pt-44">
      <FilterProvider>
        <EntryProvider>
          <main className="grid w-full grid-cols-1 gap-x-8 md:grid-cols-[350px_1fr]">
            <Filters />
            <Cards />
          </main>
        </EntryProvider>
      </FilterProvider>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const parsedId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;
  const tokenId = !parsedId || parsedId < 1 || parsedId > 10000 ? undefined : parsedId;

  return {
    props: {
      title: 'Good Morning Café',
      metaImage: tokenId
        ? `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/original/${tokenId}.png`
        : '/meta_banner.png',
      metaDescription: 'Browse and explore GMCafé Moos',
    },
  };
};
