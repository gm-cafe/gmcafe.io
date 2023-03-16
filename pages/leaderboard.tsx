import { NextPage } from 'next';
import HerdGroup from '../components/leaderboard/HerdGroup';
import useGetHerd from '../lib/hooks/useGetHerd';
import { HerdInfo, HerdInfoByOwner } from '../lib/util/types';

const Leaderboard: NextPage = () => {
  const herd = useGetHerd();

  const owners: Record<string, HerdInfo[]> = {};
  herd.forEach((moo) => {
    const { owner } = moo;
    if (owners[owner]) {
      owners[owner].push(moo);
    } else {
      owners[owner] = [moo];
    }
  });

  const herdInfoByOwner: HerdInfoByOwner[] = Object.entries(owners).map(([, herd]) => ({
    owner: herd[0].owner,
    herd,
  }));

  const herdInfoByCount: Record<number, HerdInfoByOwner[]> = {};
  herdInfoByOwner.forEach((herdInfo) => {
    const count = herdInfo.herd.length;
    if (herdInfoByCount[count]) {
      herdInfoByCount[count].push(herdInfo);
    } else {
      herdInfoByCount[count] = [herdInfo];
    }
  });

  const orderedHerdInfoByCount = Object.entries(herdInfoByCount)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .filter(([count]) => parseInt(count) > 1);

  return (
    <div className="min-h-screen bg-pink-background">
      <div className="flex w-full max-w-screen-md flex-col items-center gap-8 px-6 pt-44 pb-6 md:mx-auto">
        <h1 className="text-border-white font-gmcafe text-5xl text-purple">Leaderboard</h1>
        {orderedHerdInfoByCount.map(([count, herdByOwner], idx) => (
          <HerdGroup key={count} count={parseInt(count)} herdByOwner={herdByOwner} rank={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Leaderboard',
      metaImage: 'https://gmcafe.io/meta_image.png',
      metaDescription:
        'Welcome to the world and characters of GMCafé, most succulent and tantalising establishment in the metaverse.',
    },
  };
};
