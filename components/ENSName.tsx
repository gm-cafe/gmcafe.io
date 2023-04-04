import classNames from 'classnames';
import { CSSProperties } from 'react';
import { useEnsName, useEnsAvatar } from 'wagmi';

type Props = {
  address?: `0x${string}`;
  className?: string;
  style?: CSSProperties;
};

const ENSName = ({ address, className, style }: Props) => {
  const { data: ensName } = useEnsName({
    address: address,
    enabled: !!address,
  });

  const { data: ensAvatar } = useEnsAvatar({
    address: address,
    enabled: !!address,
  });

  return (
    <div style={style} className={classNames('flex items-center gap-1', className)}>
      {ensName && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="h-4 w-4 rounded-full" src={ensAvatar || '/ens.png'} alt="ENS Avatar" />
      )}
      <p className="truncate">{ensName || address}</p>
    </div>
  );
};

export default ENSName;
