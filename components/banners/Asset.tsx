import { useEffect } from 'react';
import { Image as RKImage } from 'react-konva';
import { Asset as AssetType } from '../../lib/util/banners';

type Props = {
  asset: AssetType;
  select: () => void;
};

const Asset = ({ asset, select }: Props) => {
  const { init, imageRef } = asset;

  useEffect(() => {
    if (init) {
      asset.init = undefined;
      const image = imageRef.current;
      if (!image) return;
      init(image);
      image.cache();
      image.drawHitFromCache();
      select();
    }
  }, [imageRef, asset, init, select]);

  return (
    <RKImage
      ref={asset.imageRef}
      image={undefined} // what the fuck is this
      onPointerDown={select}
      onDragStart={select}
      draggable
    />
  );
};

export default Asset;
