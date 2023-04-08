import dynamic from 'next/dynamic';
import { Asset } from '../../../lib/util/banners';

// https://github.com/konvajs/react-konva/issues/588
const NoSSRComponent = dynamic(() => import('./Canvas'), {
  ssr: false,
});

type Props = {
  background?: HTMLImageElement;
  assets: Asset[];
};

export default function NoSSR({ background, assets }: Props) {
  return <NoSSRComponent background={background} assets={assets} />;
}
