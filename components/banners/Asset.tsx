import { useEffect, useMemo, useRef } from 'react';
import { Image as RKImage, Transformer as TransformerComponent } from 'react-konva';
import { Asset as AssetType } from '../../lib/util/banners';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Image as ImageType } from 'konva/lib/shapes/Image';

type Props = {
  asset: AssetType;
  select: () => void;
  selected: boolean;
  front: boolean;
  move: (_x: number, _y: number) => void;
  resize: (_width: number) => void;
};

const Asset = ({ asset, select, selected, front, move, resize }: Props) => {
  const imageRef = useRef<ImageType>(null);
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

  useEffect(() => {
    front && imageRef.current?.moveToTop();
    front && tfRef.current?.moveToTop();
  }, [front]);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) {
      return;
    }
    img.addEventListener('dragend', () => move(img.x() || 0, img.y() || 0));
    img.addEventListener('transform', () => resize(img.width()));
  }, [image, move, resize]);

  return (
    <>
      <RKImage
        ref={imageRef}
        width={asset.width}
        height={asset.width}
        image={image}
        onClick={select}
        onDragStart={select}
        draggable
        x={asset.x}
        y={asset.y}
      />
      {selected && (
        <TransformerComponent
          ref={tfRef}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          keepRatio
          anchorSize={15}
        />
      )}
    </>
  );
};

export default Asset;
