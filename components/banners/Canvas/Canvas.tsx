import { useEffect, useRef, useState } from 'react';
import { Layer, Image as RKImage, Stage } from 'react-konva';
import Asset from '../Asset';
import { Asset as AssetType } from '../../../lib/util/banners';

type Props = {
  background?: HTMLImageElement;
  assets: AssetType[];
};

const Canvas = ({ background, assets }: Props) => {
  const [, setHydrated] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const canvasWidth = canvasRef.current?.clientWidth || 0;
  const canvasHeight = (canvasRef.current?.clientWidth || 0) / 3;

  console.log({ selectedAsset });

  return (
    <div ref={canvasRef}>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          <RKImage
            onMouseDown={() => setSelectedAsset(null)}
            width={canvasWidth}
            height={canvasHeight}
            image={background}
          />
          {assets.map((asset, i) => (
            <Asset
              key={`${asset}_${i}`}
              asset={asset}
              selected={selectedAsset === i}
              select={() => setSelectedAsset(i)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
