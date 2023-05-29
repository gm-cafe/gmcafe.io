import { createRef, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextImage from 'next/image';
import Graphics from '../components/banners/Graphics';
import Canvas from '../components/banners/Canvas';
import Assets from '../components/banners/Assets';
import {
  Asset,
  flipImage,
  isTopNode,
  loadImage,
  randomId,
  dataURIFromBlob,
  dataURIFromImage,
} from '../lib/util/banners';
import mooWalk from '../public/moo_walk.gif';

const MIME_JSON = 'application/json';

const Banners = () => {
  const [background, setBackground] = useState<HTMLImageElement>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();
  const [canvasWidth, setCanvasWidth] = useState(1500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  useEffect(() => {
    changeBackground('/banners/gm_purple.png');
  }, []);

  const changeBackground = (url: string) => {
    loadImage(url).then((img) => {
      setCanvasHeight(Math.round((canvasWidth * img.height) / img.width));
      setBackground(img);
    });
  };

  const addAsset = (url: string) => {
    loadImage(url).then((img) => {
      let { width, height } = img;
      let scale = 0.8 * Math.min(canvasWidth / width, canvasHeight / height);
      let asset: Asset = {
        id: randomId(),
        img,
        init(image) {
          image.image(img);
          image.offsetX(Math.round(width / 2));
          image.offsetY(Math.round(height / 2));
          image.x(Math.round(canvasWidth / 2));
          image.y(Math.round(canvasHeight / 2));
          image.scaleX(scale);
          image.scaleY(scale);
        },
        imageRef: createRef(),
      };
      setAssets([...assets, asset]);
    });
  };

  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = `image/*,${MIME_JSON}`;
    input.addEventListener('input', async () => {
      const blob = input.files?.[0] as Blob; // reeee
      if (blob.type === MIME_JSON) {
        let { bg, layers } = JSON.parse(await blob.text());
        changeBackground(bg);
        setAssets(
          (await Promise.all(
            layers.map(async (layer: any) => {
              // reee
              const { url, x, y, scale, rot, flip } = layer;
              const img = await loadImage(url);
              const asset: Asset = {
                id: randomId(),
                img,
                init(image) {
                  image.image(flip ? flipImage(img) : img);
                  image.x(x);
                  image.y(y);
                  image.offsetX(Math.round(img.width / 2));
                  image.offsetY(Math.round(img.height / 2));
                  image.scaleX(scale);
                  image.scaleY(scale);
                  image.rotation(rot);
                },
                imageRef: createRef(),
              };
              return asset;
            })
          )) as Asset[]
        ); // reee
      } else {
        addAsset(await dataURIFromBlob(blob));
      }
    });
    input.click();
  };

  return (
    <div className="flex h-screen flex-col items-center gap-2 bg-pink-background px-12 pb-12 pt-40">
      <div className="flex h-full w-full flex-wrap items-center justify-center lg:mx-auto lg:grid lg:min-h-0 lg:flex-grow lg:grid-cols-8 lg:flex-col lg:gap-x-4">
        <div className="order-2 h-3/4 min-h-0 w-3/6 min-w-0 pr-2 lg:order-none lg:col-span-2 lg:h-full lg:w-auto lg:p-0">
          <Assets addAsset={addAsset} />
        </div>
        <div className="order-1 h-auto min-h-0 w-full pb-4 min-w-0 lg:order-none lg:col-span-4 lg:h-full lg:w-auto lg:flex-col lg:p-0">
          <Canvas
            changeBackground={changeBackground}
            background={background}
            setAssets={setAssets}
            assets={assets}
            addAsset={addAsset}
            setSelectedAsset={setSelectedAsset}
            selectedAsset={selectedAsset}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </div>
        <div className="order-3 h-3/4 min-h-0 w-3/6 min-w-0 pl-2 lg:order-none lg:col-span-2 lg:h-full lg:w-auto lg:p-0">
          <Graphics
            addAsset={addAsset}
            changeBackground={changeBackground}
            uploadImage={uploadImage}
          />
        </div>
      </div>
      <div className="hidden w-full justify-end lg:flex">
        <p className="font-gmcafe text-purple">Inspired by our amoozing herd member, Tchoupi.</p>
      </div>
    </div>
  );
};

export default Banners;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      title: 'Banners',
      metaImage: '/banners/banner.png',
      metaDescription: 'Create amoozing banners featuring your Moos and Keeks!',
      twitterCard: 'summary_large_image',
    },
  };
};
