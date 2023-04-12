import classNames from 'classnames';
import { NextPage } from 'next';
import { useState } from 'react';
import Group from '../components/leaderboard/Group';
import useGetHerd from '../lib/hooks/useGetHerd';
import useGetKeeks from '../lib/hooks/useGetKeeks';
import { gmooDeployer, keekDeployer } from '../lib/util/addresses';
import { ParsedMoo, ParsedInfoByOwner, ParsedInfo, CollectionType } from '../lib/util/types';

const getInfoByCount = (infos: ParsedInfo[]): Record<number, ParsedInfoByOwner[]> => {
  const owners: Record<`0x${string}`, ParsedMoo[]> = {};
  infos
    .filter(
      ({ owner }) =>
        gmooDeployer.toLowerCase() !== owner.toLowerCase() &&
        keekDeployer.toLowerCase() !== owner.toLowerCase()
    )
    .forEach((info) => {
      const { owner } = info;
      if (owners[owner]) {
        owners[owner].push(info);
      } else {
        owners[owner] = [info];
      }
    });

  const infoByOwner: ParsedInfoByOwner[] = Object.entries(owners).map(([owner, infos]) => ({
    owner: owner as `0x${string}`,
    infos,
  }));

  const infoByCount: Record<number, ParsedInfoByOwner[]> = {};
  infoByOwner.forEach((infoGroups) => {
    const count = infoGroups.infos.length;
    if (infoByCount[count]) {
      infoByCount[count].push(infoGroups);
    } else {
      infoByCount[count] = [infoGroups];
    }
  });

  return infoByCount;
};

const Leaderboard: NextPage = () => {
  const [selected, setSelected] = useState<CollectionType>('gmoo');

  const herd = useGetHerd();
  const keeks = useGetKeeks();

  const infos = selected === 'gmoo' ? herd : keeks;

  const infoByCount = getInfoByCount(infos);

  const orderedInfoByCount = Object.entries(infoByCount)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .filter(([count]) => parseInt(count) > (selected === 'gmoo' ? 1 : 10));

  return (
    <div className="min-h-screen bg-pink-background">
      <div className="flex w-full max-w-screen-md flex-col items-center gap-8 px-6 pb-6 pt-44 md:mx-auto">
        <h1 className="text-border-white font-gmcafe text-5xl text-purple">Leaderboard</h1>
        <div className="flex gap-2 rounded-xl bg-white p-2">
          <button
            className={classNames(
              'rounded-lg px-2 py-1 font-gmcafe text-xl transition-colors',
              { 'bg-purple text-white': selected === 'gmoo' },
              { 'bg-white text-purple hover:bg-purple-light/40': selected !== 'gmoo' }
            )}
            onClick={() => setSelected('gmoo')}
          >
            MOO
          </button>
          <button
            className={classNames(
              'rounded-lg px-2 py-1 font-gmcafe text-xl transition-colors',
              { 'bg-purple text-white': selected === 'keek' },
              { 'bg-white text-purple hover:bg-purple-light/40': selected !== 'keek' }
            )}
            onClick={() => setSelected('keek')}
          >
            KEEK
          </button>
        </div>
        {orderedInfoByCount.map(([count, infoByOwner], idx) => (
          <Group
            key={count}
            count={parseInt(count)}
            infoByOwner={infoByOwner}
            rank={idx + 1}
            type={selected}
          />
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
