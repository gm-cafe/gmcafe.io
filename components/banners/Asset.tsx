import { useEffect, useMemo } from 'react';
import { Group, Image as RKImage, Transformer as TransformerComponent } from 'react-konva';
import { Asset as AssetType } from '../../lib/util/banners';

type Props = {
  asset: AssetType;
  select: () => void;
  selected: boolean;
  move: (_x: number, _y: number) => void;
  resize: (_width: number) => void;
};

const Asset = ({ asset, select, selected, move, resize }: Props) => {
  const { ref: imageRef, groupRef, tfRef } = asset;

  const image = useMemo(() => {
    const image = new Image();
    image.src = asset.src;
    image.crossOrigin = 'anonymous';
    return image;
  }, [asset]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    // we need to attach transformer manually
    imageRef.current && tfRef.current?.nodes([imageRef.current]);
    tfRef.current?.getLayer()?.batchDraw();
  }, [selected, imageRef, tfRef]);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) {
      return;
    }
    img.addEventListener('dragend', () => move(img.x() || 0, img.y() || 0));
    img.addEventListener('transform', () => resize(img.width()));
  }, [image, move, resize, imageRef]);

  return !asset.deleted ? (
    <Group ref={groupRef}>
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
          anchorCornerRadius={9999}
          rotationSnaps={[0, 90, 180, 270]}
          rotateAnchorOffset={25}
        />
      )}
    </Group>
  ) : null;
};

export default Asset;
