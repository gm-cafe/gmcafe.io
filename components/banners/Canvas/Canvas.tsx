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
  const canvasHeight = canvasWidth / 3;

  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<StageType>(null);

  const resize = useCallback(() => {
    const oldWidth = canvasWidth;
    const newWidth = canvasRef.current?.clientWidth || 0;

    assets.forEach(({ ref: { current } }) => {
      if (!current) return;
      const width = (current.width() / oldWidth) * newWidth;
      current.width(width);
      current.height(width);
      current.x((current.x() / oldWidth) * newWidth);
      current.y((current.y() / oldWidth) * newWidth);
    });

    setCanvasWidth(newWidth);
  }, [canvasRef, assets, canvasWidth]);

  const unset = useCallback(
    (e: MouseEvent) =>
      e.target instanceof HTMLDivElement &&
      e.target.className.includes('unset-current-asset') &&
      setSelectedAsset(null),
    []
  );

  const deleteAsset = useCallback(() => {
    if (selectedAsset === null) return;
    setAssets(
      assets.map((asset, i) => (i === selectedAsset ? { ...asset, deleted: true } : asset))
    );
    setSelectedAsset(null);
  }, [assets, setAssets, selectedAsset, setSelectedAsset]);

  const keydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') deleteAsset();
    },
    [deleteAsset]
  );

  useEffect(() => {
    setHydrated(true);

    const canvas = canvasRef.current;
    canvas?.addEventListener('resize', resize);
    window.addEventListener('resize', resize);
    window.addEventListener('click', unset);
    window.addEventListener('keydown', keydown);

    return () => {
      canvas?.removeEventListener('resize', resize);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', unset);
      window.removeEventListener('keydown', keydown);
    };
  }, [resize, unset, keydown]);

  useEffect(() => {
    setCanvasWidth(canvasRef.current?.clientWidth || 0);
  }, [canvasRef]);

  useEffect(() => {
    const newAsset = assets.findIndex((asset) => asset.width === 0);

    if (newAsset < 0) return;

    const width = canvasWidth / 4;
    setAssets(
      assets.map((asset) => ({
        ...asset,
        width: asset.width === 0 ? width : asset.width,
      }))
    );
    assets[newAsset].ref.current?.move({ x: 0, y: canvasHeight - width });
    setSelectedAsset(newAsset);
  }, [assets, canvasWidth, canvasHeight, setAssets]);

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

  const moveForward = useCallback(
    () => assets[selectedAsset!].groupRef.current?.moveUp(),
    [selectedAsset, assets]
  );

  const moveBack = useCallback(() => {
    const group = assets[selectedAsset!].groupRef.current;
    if (!group) return;
    group.getZIndex() > 1 && group.moveDown();
  }, [selectedAsset, assets]);

  const flip = useCallback(() => {
    const image = assets[selectedAsset!].ref.current;
    if (!image) return;

    image.scaleX(image.scaleX() * -1);
  }, [selectedAsset, assets]);

  const initiateDownload = () => {
    setSelectedAsset(null);
    setDownload(true);
  };

  return (
    <>
      <div className="flex h-full flex-col gap-4" ref={canvasRef}>
        <div className="unset-current-asset relative flex-grow">
          <div className="absolute bottom-0 mt-auto flex gap-4">
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
              <CollectionIcon className="h-8 w-8 rotate-180" />
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
              />
            ))}
          </Layer>
        </Stage>
        <div className="unset-current-asset flex-grow">
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110"
            onClick={initiateDownload}
          >
            <SaveIcon className="h-8 w-8" />
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Canvas;
