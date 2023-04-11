import dynamic from 'next/dynamic';
import { Asset } from '../../../lib/util/banners';
import { Dispatch, SetStateAction } from 'react';

// https://github.com/konvajs/react-konva/issues/588
const NoSSRComponent = dynamic(() => import('./Canvas'), {
  ssr: false,
});

type Props = {
  background?: HTMLImageElement;
  assets: Asset[];
  setAssets: Dispatch<SetStateAction<Asset[]>>;
};

export default function NoSSR({ background, assets, setAssets }: Props) {
  return <NoSSRComponent background={background} assets={assets} setAssets={setAssets} />;
}
