import {createRef, Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useRef, useState, MouseEvent} from 'react';
import { Layer, Group, Image as RKImage, Stage, Transformer as RKTransformer } from 'react-konva';
import type {Transformer as KonvaTransformerType} from 'konva/lib/shapes/Transformer';
import type {Stage as KonvaStageType} from 'konva/lib/Stage';
import Asset from '../Asset';
import { Asset as AssetType, flipImage, isTopNode, loadImage, randomId, dataURIFromBlob } from '../../../lib/util/banners';
import { CollectionIcon, SaveIcon, SwitchHorizontalIcon, TrashIcon, UploadIcon } from '@heroicons/react/solid';

async function serializeImage(img: HTMLImageElement): Promise<string> {
  let {src} = img;
  if (src.startsWith('blob:')) {
    let {width, height} = img;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d')!; // reee
    ctx.drawImage(img, 0, 0);
    let blob = await new Promise(ful => canvas.toBlob(ful)); // reeeeee
    return dataURIFromBlob(blob as Blob);
  }
  return src;
}

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

const Canvas = ({ changeBackground, background, setAssets, assets, setSelectedAsset, selectedAsset, addAsset, canvasWidth, canvasHeight }: Props) => {
  const [, setHydrated] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [scale, setScale] = useState(1); 

  const trRef = useRef<KonvaTransformerType>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<KonvaStageType>(null);
  
  const resize = useCallback(() => {
    const {clientWidth} = canvasRef.current!;
    setWidth(clientWidth);
    setHeight(clientWidth * canvasHeight / canvasWidth);
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
    let i = assets.findIndex(x => x.imageRef === selectedAsset.imageRef);
    selectedAsset.imageRef!.current?.destroy(); // force delete
    assets.splice(i, 1);
    setAssets(assets);
    setSelectedAsset(assets.at(Math.min(i, assets.length-1)));
  };

  const keydown = useCallback((e: KeyboardEvent) => {
    if (!selectedAsset) return;
    const image = selectedAsset.imageRef.current!;
    const dp = 1;
    const dr = 5;
    switch (e.key) {
      case 'Delete':
      case 'Backspace':  return deleteLayer();
      case 'ArrowLeft':  return image.x(image.x() - dp);
      case 'ArrowRight': return image.x(image.x() + dp);
      case 'ArrowUp':    return image.y(image.y() - dp);
      case 'ArrowDown':  return image.y(image.y() + dp);
      case 'a':          return image.rotation(image.rotation() - dr);
      case 'z':          return image.rotation(image.rotation() + dr);
      case 'f':          return flipLayer();
    }
  }, [selectedAsset]);

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

  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = `image/*,${MIME_JSON}`;
    input.addEventListener('input', async () => {
      const blob = input.files?.[0] as Blob; // reeee
      if (blob.type === MIME_JSON) {
        let {bg, layers} = JSON.parse(await blob.text());
        changeBackground(bg);
        setAssets(await Promise.all(layers.map(async (layer: any) => { // reee
          const {url, x, y, scale, rot, flip} = layer;
          const img = await loadImage(url);
          const asset : AssetType = {
            id: randomId(),
            img,
            init(image) {
              image.image(flip ? flipImage(img) : img);
              image.x(x);
              image.y(y);
              image.offsetX(Math.round(img.width/2));
              image.offsetY(Math.round(img.height/2));
              image.scaleX(scale);
              image.scaleY(scale);
              image.rotation(rot);
            },
            imageRef: createRef(),
          };
          return asset;
        })) as AssetType[]); // reee
      } else {
        const url = URL.createObjectURL(input.files?.[0] as Blob); // File is a Blob!
        addAsset(url);
        URL.revokeObjectURL(url);
      }
    });
    input.click();
  };

  const download = async (e: MouseEvent) => {
    const copy = stageRef.current!.clone();
    copy.scaleX(1);
    copy.scaleY(1);
    copy.width(canvasWidth);
    copy.height(canvasHeight);

    const a = document.createElement('a');
    if (e.altKey) { // save serialized?
      const json = {
        bg: await serializeImage(background!),
        layers: await Promise.all(assets
          .filter(x => x.imageRef.current)
          .sort((a, b) => a.imageRef.current!.zIndex() - b.imageRef.current!.zIndex())
          .map(async ({img, imageRef})=> {
            const image = imageRef.current!;
            return {
              url: await serializeImage(img),
              x: image.x(),
              y: image.y(),
              scale: image.scaleX(),
              rot: image.rotation(),
              flip: image.image() !== img,
            }
          }))
      };
      let blob = new Blob([JSON.stringify(json, null, '\t')], {type: MIME_JSON});
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
    setSelectedAsset({...selectedAsset}); // trigger
  }, [selectedAsset]);

  const moveBack = useCallback(() => {
  if (!selectedAsset) return;
    selectedAsset!.imageRef.current!.moveDown();
    setSelectedAsset({...selectedAsset}); // trigger
  }, [selectedAsset]);

  const flipLayer = useCallback(() => {
    const {img, imageRef} = selectedAsset!;
    imageRef.current!.image(imageRef.current!.image() === img ? flipImage(img) : img);
  }, [selectedAsset]);

  useLayoutEffect(() => {
    if (trRef.current && selectedAsset && selectedAsset.imageRef.current) {
      trRef.current.nodes([selectedAsset.imageRef.current]);
    }
  }, [trRef, selectedAsset]);

  return (
    <>
      <div className="flex h-full flex-col gap-4" ref={canvasRef}>
        <div className="unset-current-asset relative flex-grow">
          <div className="absolute bottom-0 mt-auto flex gap-4">
            <button
              className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
              onClick={moveForward}
              disabled={!(selectedAsset && selectedAsset.imageRef.current && !isTopNode(selectedAsset.imageRef.current))}
            >
              <CollectionIcon className="h-8 w-8" />
              Move forward
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
              onClick={moveBack}
              disabled={!(selectedAsset && selectedAsset.imageRef.current && selectedAsset.imageRef.current.zIndex() > 0)}
            >
              <CollectionIcon className="h-8 w-8 rotate-180" />
              Move back
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
              onClick={flipLayer}
              disabled={!selectedAsset}
            >
              <SwitchHorizontalIcon className="h-8 w-8" />
              Flip
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110 disabled:opacity-50"
              onClick={deleteLayer}
              disabled={!selectedAsset}
            >
              <TrashIcon className="h-8 w-8" />
              Delete
            </button>
          </div>
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
              {assets.map((asset, i) => <Asset 
                key={asset.id}
                asset={asset}
                select={() => setSelectedAsset(asset)}
              />)}
            </Group>
            {selectedAsset && <RKTransformer ref={trRef}
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
            />}
          </Layer>
        </Stage>
        <div className="unset-current-asset flex-grow">
          <div className="absolute mt-auto flex gap-4">
            <button
              className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110"
              onClick={download}
            >
              <SaveIcon className="h-8 w-8" />
              Save Banner
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-2 pr-3 font-gmcafe text-purple transition-all hover:scale-110"
              onClick={uploadImage}
            >
              <UploadIcon className="h-8 w-8" />
              Upload Image
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
