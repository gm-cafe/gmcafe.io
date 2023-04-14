import { useEffect, useMemo } from 'react';
import { Group, Image as RKImage, Transformer as TransformerComponent } from 'react-konva';
import { Asset as AssetType } from '../../lib/util/banners';

type Props = {
  asset: AssetType;
  select: () => void;
  selected: boolean;
};

const Asset = ({ asset, select, selected }: Props) => {
  const { ref: imageRef, groupRef, tfRef } = asset;

  const image = useMemo(() => {
    const image = new Image();
    image.src = asset.src;
    image.width = asset.width;
    image.height = asset.width;
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

  return !asset.deleted ? (
    <Group ref={groupRef}>
      <RKImage ref={imageRef} image={image} onClick={select} onDragStart={select} draggable />
      <TransformerComponent
        ref={tfRef}
        enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        keepRatio
        anchorSize={15}
        anchorCornerRadius={9999}
        rotationSnaps={[0, 90, 180, 270]}
        rotateAnchorOffset={25}
        visible={selected}
      />
    </Group>
  ) : null;
};

export default Asset;
