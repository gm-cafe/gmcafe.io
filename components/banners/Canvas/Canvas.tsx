import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Image as RKImage, Stage } from 'react-konva';
import Asset from '../Asset';
import { Asset as AssetType } from '../../../lib/util/banners';
import { CollectionIcon, SaveIcon, SwitchHorizontalIcon, TrashIcon } from '@heroicons/react/solid';
import { Stage as StageType } from 'konva/lib/Stage';

type Props = {
  background?: HTMLImageElement;
  assets: AssetType[];
  setAssets: Dispatch<SetStateAction<AssetType[]>>;
};

const Canvas = ({ background, assets, setAssets }: Props) => {
  const [, setHydrated] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [download, setDownload] = useState(false);

  const [canvasWidth, setCanvasWidth] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<StageType>(null);

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
  }, [assets, canvasWidth, setAssets]);

  useEffect(() => {
    const stage = stageRef.current;
    if (selectedAsset !== null || !download || !stage) return;

    setDownload(false);
    const downloadURI = (uri: string, name: string) => {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    downloadURI(stage.toDataURL({ pixelRatio: 1500 / canvasWidth }), 'banner.png');
  }, [selectedAsset, download, canvasWidth]);

  const canvasHeight = canvasWidth / 3;

  const moveForward = useCallback(
    () => assets[selectedAsset!].groupRef.current?.moveUp(),
    [selectedAsset, assets]
  );

  const moveBack = useCallback(() => {
    const group = assets[selectedAsset!].groupRef.current;
    if (!group) return;
    group.getZIndex() > 1 && group.moveDown();
  }, [selectedAsset, assets]);

  const deleteAsset = () => {
    if (selectedAsset === null) return;
    setAssets(assets.filter((_, i) => i !== selectedAsset));
    setSelectedAsset(null);
  };

  const flip = useCallback(() => {
    const image = assets[selectedAsset!].ref.current;
    if (!image) return;

    image.scaleX(image.scaleX() * -1);
  }, [selectedAsset, assets]);

  const move = (i: number) => (x: number, y: number) =>
    setAssets(assets.map((asset, j) => (i === j ? { ...asset, x, y } : asset)));

  const resizeAsset = (i: number) => (width: number) =>
    setAssets(assets.map((asset, j) => (i === j ? { ...asset, width } : asset)));

  const initiateDownload = () => {
    setSelectedAsset(null);
    setDownload(true);
  };

  return (
    <div className="flex flex-col gap-4" ref={canvasRef}>
      <div className="flex gap-4">
        <button
          className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
          onClick={moveForward}
          disabled={selectedAsset === null}
        >
          <CollectionIcon className="h-8 w-8" />
          Move forward
        </button>
        <button
          className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
          onClick={moveBack}
          disabled={selectedAsset === null}
        >
          <CollectionIcon className="h-8 w-8" />
          Move back
        </button>
        <button
          className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
          onClick={flip}
          disabled={selectedAsset === null}
        >
          <SwitchHorizontalIcon className="h-8 w-8" />
          Flip
        </button>
        <button
          className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
          onClick={deleteAsset}
          disabled={selectedAsset === null}
        >
          <TrashIcon className="h-8 w-8" />
          Delete
        </button>
      </div>
      <Stage width={canvasWidth} height={canvasHeight} ref={stageRef}>
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
              move={move(i)}
              resize={resizeAsset(i)}
            />
          ))}
        </Layer>
      </Stage>
      <div>
        <button
          className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110"
          onClick={initiateDownload}
        >
          <SaveIcon className="h-8 w-8" />
          Download
        </button>
      </div>
    </div>
  );
};

export default Canvas;
