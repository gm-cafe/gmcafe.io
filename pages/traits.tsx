import type { GetServerSideProps, NextPage } from 'next';

import Filters from '../components/traits/Filters';
import { FilterProvider } from '../lib/providers/FilterProvider';
import Cards from '../components/traits/Cards';
import { EntryProvider } from '../lib/providers/EntryProvider';
import Toolbar from '../components/traits/Toolbar';
import { Moo } from '../lib/util/types';

type Props = {
  metadata: {
    moos: Moo[];
  };
};

const Home: NextPage<Props> = ({ metadata }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-background px-6 pb-12 pt-36 md:px-12 md:pt-44">
      <FilterProvider metadata={metadata}>
        <EntryProvider metadata={metadata}>
          <main className="grid w-full grid-cols-1 gap-x-8 md:grid-cols-[350px_1fr]">
            <Filters metadata={metadata} />
            <div className="flex flex-col gap-8">
              <Toolbar />
              <Cards />
            </div>
          </main>
        </EntryProvider>
      </FilterProvider>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const moos = await fetch('https://alpha.antistupid.com/metadata/gmoo/all-static.json')
    .then((res) => res.json() as Promise<Moo[]>)
    .then((moos: Moo[]) =>
      moos.map((moo) => ({
        ...moo,
        attributes: moo.attributes.filter((attribute) => !!attribute.trait_type),
      }))
    );

  const { id } = query;
  const parsedId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;
  const tokenId = !parsedId || parsedId < 1 || parsedId > moos.length ? undefined : parsedId;

  // Response is stale after 10s, but refetched between 10-59s
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {
      title: 'Good Morning Café',
      metaImage: tokenId
        ? `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/original/${tokenId}.png`
        : '/meta_banner.png',
      metaDescription: 'Browse and explore GMCafé Moos',
      metadata: {
        moos: moos,
      },
    },
  };
};
