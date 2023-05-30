import { createRef, useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Graphics from '../components/banners/Graphics';
import Canvas from '../components/banners/Canvas';
import Assets from '../components/banners/Assets';
import { Asset, loadImage, randomId, dataURIFromBlob, assetFromJSON } from '../lib/util/banners';

const MIME_JSON = 'application/json';

const Banners = () => {
  const [background, setBackground] = useState<HTMLImageElement>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();
  const [canvasWidth] = useState(1500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  const changeBackground = useCallback(
    (url: string) => {
      loadImage(url).then((img) => {
        setCanvasHeight(Math.round((canvasWidth * img.height) / img.width));
        setBackground(img);
      });
    },
    [canvasWidth]
  );

  useEffect(() => {
    changeBackground('/banners/gm_purple.png');
  }, [changeBackground]);

  const addAsset = (url: string) => {
    loadImage(url).then((img) => {
      let { width, height } = img;
      let scale = Math.min((0.4 * canvasWidth) / width, (0.8 * canvasHeight) / height);
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
        const { bg, layers } = JSON.parse(await blob.text());
        changeBackground(bg);
        setAssets(await Promise.all(layers.map(assetFromJSON)));
      } else {
        addAsset(await dataURIFromBlob(blob));
      }
    });
    input.click();
  };

  return (
    <div className="flex h-screen flex-col items-center gap-2 bg-pink-background px-4 pt-32 md:px-12 md:pb-6 md:pt-40 lg:pb-12">
      <div className="flex h-full w-full flex-wrap items-center justify-center lg:mx-auto lg:grid lg:min-h-0 lg:flex-grow lg:grid-cols-8 lg:flex-col lg:gap-x-4">
        <div className="_retain order-2 h-2/3 min-h-0 w-3/6 min-w-0 pb-4 pr-2 lg:order-none lg:col-span-2 lg:h-full lg:w-auto lg:p-0">
          <Assets addAsset={addAsset} />
        </div>
        <div className="order-1 h-auto min-h-0 w-full min-w-0 pb-4 pt-2 lg:order-none lg:col-span-4 lg:h-full lg:w-auto lg:flex-col lg:p-0">
          <Canvas
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
        <div className="_retain order-3 h-2/3 min-h-0 w-3/6 min-w-0 pb-4 pl-2 lg:order-none lg:col-span-2 lg:h-full lg:w-auto lg:p-0">
          <Graphics
            addAsset={addAsset}
            changeBackground={changeBackground}
            uploadImage={uploadImage}
          />
        </div>
      </div>
      <div className="hidden w-full justify-end lg:flex">
        <p className="font-gmcafe text-purple">
          Inspired by our amoozing herd member,{' '}
          <a
            className="underline underline-offset-4"
            href="https://twitter.com/ToudeMoune"
            rel="noreferrer"
            target="_blank"
          >
            Tchoupi
          </a>
          .
        </p>
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
