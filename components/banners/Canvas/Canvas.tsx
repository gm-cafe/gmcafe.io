import {
  createRef,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { Layer, Group, Image as RKImage, Stage, Transformer as RKTransformer } from 'react-konva';
import type { Transformer as KonvaTransformerType } from 'konva/lib/shapes/Transformer';
import type { Stage as KonvaStageType } from 'konva/lib/Stage';
import Asset from '../Asset';
import {
  Asset as AssetType,
  flipImage,
  isTopNode,
  loadImage,
  randomId,
  dataURIFromBlob,
  dataURIFromImage,
} from '../../../lib/util/banners';
import { CollectionIcon, SaveIcon, SwitchHorizontalIcon, TrashIcon } from '@heroicons/react/solid';

export type Props = {
  canvasWidth: number;
  canvasHeight: number;
  changeBackground(url: string): void;
  background?: HTMLImageElement;
  setSelectedAsset(asset?: AssetType): void;
  selectedAsset?: AssetType;
  setAssets: Dispatch<SetStateAction<AssetType[]>>;
  assets: AssetType[];
  addAsset(url: string): void;
};

const MIME_JSON = 'application/json';
const HEX_PURPLE = '#8946ab';

const Canvas = ({
  changeBackground,
  background,
  setAssets,
  assets,
  setSelectedAsset,
  selectedAsset,
  addAsset,
  canvasWidth,
  canvasHeight,
}: Props) => {
  const [, setHydrated] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [scale, setScale] = useState(1);

  const trRef = useRef<KonvaTransformerType>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<KonvaStageType>(null);

  const resize = useCallback(() => {
    const { clientWidth } = canvasRef.current!;
    setWidth(clientWidth);
    setHeight((clientWidth * canvasHeight) / canvasWidth);
    setScale(clientWidth / canvasWidth);
  }, [canvasRef, canvasWidth, canvasHeight]);

  const unset = useCallback(
    (e: globalThis.MouseEvent) =>
      e.target instanceof HTMLDivElement &&
      e.target.className.includes('unset-current-asset') &&
      setSelectedAsset(),
    []
  );

  const deleteLayer = () => {
    if (!selectedAsset) return;
    let i = assets.findIndex((x) => x.imageRef === selectedAsset.imageRef); // because force update breaks identity
    selectedAsset.imageRef!.current?.destroy(); // force delete
    assets.splice(i, 1);
    setAssets(assets);
    setSelectedAsset(assets.at(Math.min(i, assets.length - 1)));
  };

  const keydown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedAsset) return;
      const image = selectedAsset.imageRef.current!;
      const dp = 1;
      const dr = 1;
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          return deleteLayer();
        case 'ArrowLeft':
          return image.x(image.x() - dp);
        case 'ArrowRight':
          return image.x(image.x() + dp);
        case 'ArrowUp':
          return image.y(image.y() - dp);
        case 'ArrowDown':
          return image.y(image.y() + dp);
        case 'a':
          return image.rotation(image.rotation() - dr);
        case 'z':
          return image.rotation(image.rotation() + dr);
        case 'f':
          return flipLayer();
      }
    },
    [selectedAsset]
  );

  useEffect(() => {
    setHydrated(true);
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('click', unset);
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', unset);
      window.removeEventListener('keydown', keydown);
    };
  }, [resize, unset, keydown]);

  const download = async (e: MouseEvent) => {
    const copy = stageRef.current!.clone();
    copy.scaleX(1);
    copy.scaleY(1);
    copy.width(canvasWidth);
    copy.height(canvasHeight);
    const a = document.createElement('a');
    if (e.altKey) {
      // save serialized?
      const json = {
        bg: await dataURIFromImage(background!),
        layers: await Promise.all(
          assets
            .filter((x) => x.imageRef.current)
            .sort((a, b) => a.imageRef.current!.zIndex() - b.imageRef.current!.zIndex())
            .map(async ({ img, imageRef }) => {
              const image = imageRef.current!;
              return {
                url: await dataURIFromImage(img),
                x: image.x(),
                y: image.y(),
                scale: image.scaleX(),
                rot: image.rotation(),
                flip: image.image() !== img,
              };
            })
        ),
      };
      let blob = new Blob([JSON.stringify(json, null, '\t')], { type: MIME_JSON });
      a.download = 'banner.json';
      a.href = await dataURIFromBlob(blob);
    } else {
      a.download = 'banner.png';
      a.href = copy.toDataURL();
    }
    a.click();
  };

  const moveForward = useCallback(() => {
    if (!selectedAsset) return;
    selectedAsset.imageRef.current!.moveUp();
    setSelectedAsset({ ...selectedAsset }); // force update
  }, [selectedAsset]);

  const moveBack = useCallback(() => {
    if (!selectedAsset) return;
    selectedAsset.imageRef.current!.moveDown();
    setSelectedAsset({ ...selectedAsset }); // force update
  }, [selectedAsset]);

  const flipLayer = useCallback(() => {
    if (!selectedAsset) return;
    const { img, imageRef } = selectedAsset;
    const image = imageRef.current!;
    image.image(image.image() === img ? flipImage(img) : img);
  }, [selectedAsset]);

  useLayoutEffect(() => {
    if (trRef.current && selectedAsset && selectedAsset.imageRef.current) {
      trRef.current.nodes([selectedAsset.imageRef.current]); // associate transformer with current selection
    }
  }, [trRef, selectedAsset]);

  return (
    <>
      <div className="flex h-full flex-col justify-center gap-4" ref={canvasRef}>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
            onClick={moveForward}
            disabled={
              !(
                selectedAsset &&
                selectedAsset.imageRef.current &&
                !isTopNode(selectedAsset.imageRef.current)
              )
            }
          >
            <CollectionIcon className="h-8 w-8" />
            <span className="hidden md:block">Move forward</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
            onClick={moveBack}
            disabled={
              !(
                selectedAsset &&
                selectedAsset.imageRef.current &&
                selectedAsset.imageRef.current.zIndex() > 0
              )
            }
          >
            <CollectionIcon className="h-8 w-8 rotate-180" />
            <span className="hidden md:block">Move back</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
            onClick={flipLayer}
            disabled={!selectedAsset}
          >
            <SwitchHorizontalIcon className="h-8 w-8" />
            <span className="hidden md:block">Flip</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
            onClick={deleteLayer}
            disabled={!selectedAsset}
          >
            <TrashIcon className="h-8 w-8" />
            <span className="hidden md:block">Delete</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 lg:hidden"
            onClick={download}
          >
            <SaveIcon className="h-8 w-8" />
            <span className="hidden md:block"> Save Banner</span>
          </button>
        </div>
        <Stage ref={stageRef} width={width} height={height} scaleX={scale} scaleY={scale}>
          <Layer>
            <RKImage
              onMouseDown={() => setSelectedAsset()}
              width={canvasWidth}
              height={canvasHeight}
              image={background}
            />
            <Group>
              {assets.map((asset, i) => (
                <Asset key={asset.id} asset={asset} select={() => setSelectedAsset(asset)} />
              ))}
            </Group>
            {selectedAsset && (
              <RKTransformer
                ref={trRef}
                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                keepRatio
                //useSingleNodeRotation={true}
                anchorSize={15}
                anchorStroke={HEX_PURPLE}
                borderStroke={HEX_PURPLE}
                flipEnabled={false}
                anchorCornerRadius={9999}
                rotationSnaps={[0, 90, 180, 270]}
                rotateAnchorOffset={25}
              />
            )}
          </Layer>
        </Stage>
        <div className="hidden gap-4 lg:flex">
          <button
            className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110"
            onClick={download}
          >
            <SaveIcon className="h-8 w-8" />
            Save Banner
          </button>
        </div>
      </div>
    </>
  );
};

export default Canvas;
