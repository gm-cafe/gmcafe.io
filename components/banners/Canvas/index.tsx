import dynamic from 'next/dynamic';

// https://github.com/konvajs/react-konva/issues/588
const NoSSRComponent = dynamic(() => import('./Canvas'), {
  ssr: false,
});

import type { Props } from '../Canvas/Canvas';

export default function NoSSR(props: Props) {
  return <NoSSRComponent {...props} />;
}
