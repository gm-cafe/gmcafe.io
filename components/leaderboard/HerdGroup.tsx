import { HerdInfoByOwner } from '../../lib/util/types';
import Herd from './Herd';

type Props = {
  count: number;
  herdByOwner: HerdInfoByOwner[];
};

const HerdGroup = ({ count, herdByOwner }: Props) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-pink p-4">
      <h2 className="font-gmcafe text-2xl text-purple">{count}</h2>
      <div className="flex flex-col gap-2">
        {herdByOwner.map(({ owner, herd }) => (
          <Herd key={owner} owner={owner} herd={herd} />
        ))}
      </div>
    </div>
  );
};

export default HerdGroup;
