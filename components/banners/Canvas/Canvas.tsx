import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Image as RKImage, Stage } from 'react-konva';
import Asset from '../Asset';
import { Asset as AssetType } from '../../../lib/util/banners';
import { CollectionIcon, TrashIcon } from '@heroicons/react/solid';

type Props = {
  background?: HTMLImageElement;
  assets: AssetType[];
  setAssets: Dispatch<SetStateAction<AssetType[]>>;
};

const Canvas = ({ background, assets, setAssets }: Props) => {
  const [, setHydrated] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [frontAsset, setFrontAsset] = useState<number | null>(null);

  const [canvasWidth, setCanvasWidth] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);

  const resize = useCallback(() => {
    const oldWidth = canvasWidth;
    const newWidth = canvasRef.current?.clientWidth || 0;

    setAssets(
      assets.map((asset) => ({
        ...asset,
        width: (asset.width / oldWidth) * newWidth,
        x: (asset.x / oldWidth) * newWidth,
      }))
    );

    setCanvasWidth(newWidth);
  }, [canvasRef, assets, setAssets, canvasWidth]);

  useEffect(() => {
    setHydrated(true);

    const canvas = canvasRef.current;
    canvas?.addEventListener('resize', resize);
    window.addEventListener('resize', resize);

    return () => {
      canvas?.removeEventListener('resize', resize);
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  useEffect(() => {
    setCanvasWidth(canvasRef.current?.clientWidth || 0);
  }, [canvasRef]);

  useEffect(() => {
    const newAsset = assets.findIndex((asset) => asset.width === 0);

    if (newAsset < 0) return;

    setAssets(
      assets.map((asset) => ({
        ...asset,
        width: asset.width === 0 ? canvasWidth / 4 : asset.width,
      }))
    );
    setFrontAsset(newAsset);
  }, [assets, canvasWidth, setAssets]);

  const canvasHeight = canvasWidth / 3;

  const moveToFront = useCallback(() => {
    setFrontAsset(selectedAsset);
  }, [selectedAsset]);

  const deleteAsset = () => {
    if (selectedAsset === null) return;
    setAssets(assets.filter((_, i) => i !== selectedAsset));
    setSelectedAsset(null);
  };

  const move = (i: number) => (x: number, y: number) =>
    setAssets(assets.map((asset, j) => (i === j ? { ...asset, x, y } : asset)));

  const resizeAsset = (i: number) => (width: number) =>
    setAssets(assets.map((asset, j) => (i === j ? { ...asset, width } : asset)));

  return (
    <div className="flex flex-col gap-4" ref={canvasRef}>
      <div className="flex gap-4">
        <button
          className="flex items-center gap-2 rounded-lg bg-white p-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
          onClick={moveToFront}
          disabled={selectedAsset === null}
        >
          <CollectionIcon className="h-8 w-8" />
          Move to front
        </button>
        <button
          className="flex items-center gap-2 rounded-lg bg-white p-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
          onClick={deleteAsset}
          disabled={selectedAsset === null}
        >
          <TrashIcon className="h-8 w-8" />
          Delete
        </button>
      </div>
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
              front={frontAsset === i}
              move={move(i)}
              resize={resizeAsset(i)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
