import { useEffect, useMemo, useRef } from 'react';
import { Image as RKImage, Transformer as TransformerComponent } from 'react-konva';
import { Asset as AssetType } from '../../lib/util/banners';
import { Transformer } from 'konva/lib/shapes/Transformer';

type Props = {
  asset: AssetType;
  select: () => void;
  selected: boolean;
};

const Asset = ({ asset, select, selected }: Props) => {
  const imageRef = useRef(null);
  const tfRef = useRef<Transformer>(null);

  const image = useMemo(() => {
    const image = new Image();
    image.src = asset.src;
    return image;
  }, [asset]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    // we need to attach transformer manually
    imageRef.current && tfRef.current?.nodes([imageRef.current]);
    tfRef.current?.getLayer()?.batchDraw();
  }, [selected]);

  return (
    <>
      <RKImage
        ref={imageRef}
        width={asset.width}
        height={asset.width}
        image={image}
        onClick={select}
        draggable
      />
      {selected && <TransformerComponent ref={tfRef} />}
    </>
  );
};

export default Asset;
