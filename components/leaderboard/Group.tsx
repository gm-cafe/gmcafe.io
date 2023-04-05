import Image from 'next/image';
import { CollectionType, ParsedInfoByOwner } from '../../lib/util/types';
import Owner from './Owner';

import goldMedal from '../../public/leaderboard/gold_medal.png';
import silverMedal from '../../public/leaderboard/silver_medal.png';
import bronzeMedal from '../../public/leaderboard/bronze_medal.png';

type Props = {
  count: number;
  infoByOwner: ParsedInfoByOwner[];
  rank: number;
  type: CollectionType;
};

const Group = ({ count, infoByOwner, rank, type }: Props) => {
  const medal = rank <= 3 && (
    <Image
      src={rank === 1 ? goldMedal : rank === 2 ? silverMedal : bronzeMedal}
      layout="responsive"
      alt="Medal"
    />
  );

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-4">
      <div className="relative flex gap-2">
        <div className="absolute -left-9 -top-8 h-14 w-14">{medal}</div>
        <h3 className="ml-auto font-gmcafe text-2xl text-purple">{count} Moos</h3>
      </div>
      <div className="flex flex-col gap-2">
        {infoByOwner.map(({ owner, infos }) => (
          <Owner key={owner} owner={owner} infos={infos} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Group;
