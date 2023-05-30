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
  randomId,
  dataURIFromBlob,
  dataURIFromImage,
  assetFromJSON,
} from '../../../lib/util/banners';
import {
  CollectionIcon,
  SaveIcon,
  SwitchHorizontalIcon,
  DuplicateIcon,
  TrashIcon,
} from '@heroicons/react/solid';

export type Props = {
  canvasWidth: number;
  canvasHeight: number;
  background?: HTMLImageElement;
  setSelectedAsset(_asset?: AssetType): void;
  selectedAsset?: AssetType;
  setAssets: Dispatch<SetStateAction<AssetType[]>>;
  assets: AssetType[];
  addAsset(_url: string): void;
};

const MIME_JSON = 'application/json';
const HEX_PURPLE = '#8946ab';
const PASTE_OFFSET = 10;

async function JSONFromAsset(asset: AssetType): Promise<any> {
  const { img, imageRef } = asset;
  const image = imageRef.current!;
  return {
    url: await dataURIFromImage(img),
    x: image.x(),
    y: image.y(),
    scale: image.scaleX(),
    rot: image.rotation(),
    flip: image.image() !== img,
  };
}

const Canvas = ({
  background,
  setAssets,
  assets,
  setSelectedAsset,
  selectedAsset,
  addAsset,
  canvasWidth,
  canvasHeight,
}: Props) => {
  const [hydrated, setHydrated] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [scale, setScale] = useState(1);

  const trRef = useRef<KonvaTransformerType>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<KonvaStageType>(null);

  useLayoutEffect(() => {
    if (trRef.current && selectedAsset && selectedAsset.imageRef.current) {
      trRef.current.nodes([selectedAsset.imageRef.current]); // associate transformer with current selection
    }
  }, [trRef, selectedAsset]);

  const resize = useCallback(() => {
    const { clientWidth } = canvasRef.current!;
    setWidth(clientWidth);
    setHeight((clientWidth * canvasHeight) / canvasWidth);
    setScale(clientWidth / canvasWidth);
  }, [canvasRef, canvasWidth, canvasHeight]);

  const unset = useCallback(
    (e: globalThis.MouseEvent) => {
      for (let node = e.target; node instanceof Node; node = node.parentNode) {
        if (node instanceof HTMLElement && node.classList.contains('_retain')) {
          return;
        }
      }
      setSelectedAsset();
    },
    [setSelectedAsset]
  );

  const deleteLayer = useCallback(() => {
    if (!selectedAsset) return;
    const i = assets.findIndex((x) => x.imageRef === selectedAsset.imageRef); // because force update breaks identity
    selectedAsset.imageRef!.current?.destroy(); // force delete
    assets.splice(i, 1);
    setAssets(assets);
    setSelectedAsset(assets.at(Math.min(i, assets.length - 1)));
  }, [selectedAsset, assets, setAssets, setSelectedAsset]);

  const handleCut = useCallback(
    async (e: ClipboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (!selectedAsset) return;
      deleteLayer();
      const json = await JSONFromAsset(selectedAsset);
      json.id = selectedAsset.id;
      navigator.clipboard.writeText(
        await dataURIFromBlob(new Blob([JSON.stringify(json)], { type: MIME_JSON }))
      );
    },
    [selectedAsset, deleteLayer]
  );

  const handleCopy = useCallback(
    async (e: ClipboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (!selectedAsset) return;
      const json = await JSONFromAsset(selectedAsset);
      json.id = selectedAsset.id;
      navigator.clipboard.writeText(
        await dataURIFromBlob(new Blob([JSON.stringify(json)], { type: MIME_JSON }))
      );
    },
    [selectedAsset]
  );

  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const dt = e.clipboardData;
      if (!dt) return;
      for (const item of dt.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          return addAsset(await dataURIFromBlob(item.getAsFile() as Blob));
        }
      }
      const data = dt.getData('text/plain');
      try {
        if (data.startsWith('data:')) {
          const res = await fetch(data);
          const json = await res.json();
          const asset0 = assets.find((x) => x.id === json.id);
          if (asset0) json.url = asset0.img; // use same image
          json.x = Math.round(canvasWidth / 2); // center it?
          json.y = Math.round(canvasHeight / 2);
          const asset = await assetFromJSON(json);
          setAssets([...assets, asset]);
        } else {
          addAsset(new URL(data).toString());
        }
      } catch (ignored) {}
    },
    [assets, setAssets, addAsset, canvasWidth, canvasHeight]
  );

  const flipLayer = useCallback(() => {
    if (!selectedAsset) return;
    const { img, imageRef } = selectedAsset;
    const image = imageRef.current!;
    image.image(image.image() === img ? flipImage(img) : img);
  }, [selectedAsset]);

  const cloneLayer = useCallback(() => {
    if (!selectedAsset) return;
    const { img, imageRef } = selectedAsset;
    const image0 = imageRef.current!;
    const asset: AssetType = {
      id: randomId(),
      img,
      init(image) {
        image.setAttrs(image0.getAttrs());
        image.x(image0.x() + PASTE_OFFSET);
        image.y(image0.y() + PASTE_OFFSET);
      },
      imageRef: createRef(),
    };
    setAssets([...assets, asset]);
  }, [selectedAsset, assets, setAssets]);

  const keydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
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
        case 'd':
          return cloneLayer();
      }
    },
    [selectedAsset, deleteLayer, flipLayer, cloneLayer]
  );

  useEffect(() => {
    setHydrated(true);
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', unset);
    window.addEventListener('keydown', keydown);
    window.addEventListener('cut', handleCut);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', unset);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('cut', handleCut);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('paste', handlePaste);
    };
  }, [handleCut, handleCopy, handlePaste, resize, unset, keydown]);

  useLayoutEffect(resize, [hydrated, resize]);

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
            .map(JSONFromAsset)
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
  }, [selectedAsset, setSelectedAsset]);

  const moveBack = useCallback(() => {
    if (!selectedAsset) return;
    selectedAsset.imageRef.current!.moveDown();
    setSelectedAsset({ ...selectedAsset }); // force update
  }, [selectedAsset, setSelectedAsset]);

  return (
    <>
      <div className="flex h-full flex-col justify-center gap-4" ref={canvasRef} tabIndex={0}>
        <div className="unset-current-asset flex gap-4">
          <button
            className="_retain flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50 md:pr-3 lg:pr-2 xl:pr-3"
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
            <span className="hidden md:block lg:hidden xl:block">Forward</span>
          </button>
          <button
            className="_retain flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50 md:pr-3 lg:pr-2 xl:pr-3"
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
            <span className="hidden md:block lg:hidden xl:block">Back</span>
          </button>
          <button
            className="_retain flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50 md:pr-3 lg:pr-2 xl:pr-3"
            onClick={flipLayer}
            disabled={!selectedAsset}
          >
            <SwitchHorizontalIcon className="h-8 w-8" />
            <span className="hidden md:block lg:hidden xl:block">Flip</span>
          </button>
          <button
            className="_retain flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50 md:pr-3 lg:pr-2 xl:pr-3"
            onClick={cloneLayer}
            disabled={!selectedAsset}
          >
            <DuplicateIcon className="h-8 w-8" />
            <span className="hidden md:block lg:hidden xl:block">Duplicate</span>
          </button>
          <button
            className="_retain flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-2 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50 md:pr-3 lg:pr-2 xl:pr-3"
            onClick={deleteLayer}
            disabled={!selectedAsset}
          >
            <TrashIcon className="h-8 w-8" />
            <span className="hidden md:block lg:hidden xl:block">Delete</span>
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-purple py-1.5 pl-2 pr-2 font-gmcafe text-purple text-white transition-all hover:scale-110 md:pr-3 lg:pr-2 xl:hidden xl:pr-3"
            onClick={download}
          >
            <SaveIcon className="h-8 w-8" />
            <span className="hidden md:block">Save</span>
          </button>
        </div>
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          scaleX={scale}
          scaleY={scale}
          className="_retain"
        >
          <Layer>
            <RKImage
              onPointerDown={() => setSelectedAsset()}
              width={canvasWidth}
              height={canvasHeight}
              image={background}
            />
            <Group>
              {assets.map((asset) => (
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
                rotateAnchorOffset={15}
              />
            )}
          </Layer>
        </Stage>
        <div className="unset-current-asset hidden gap-4 xl:flex">
          <button
            className="flex items-center gap-2 rounded-lg bg-purple py-1.5 pl-2 pr-3 font-gmcafe text-white transition-all hover:scale-110"
            onClick={download}
          >
            <SaveIcon className="h-8 w-8" />
            Save Your Masterpiece
          </button>
        </div>
      </div>
    </>
  );
};

export default Canvas;
