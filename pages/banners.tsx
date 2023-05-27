import { createRef, useEffect, useState } from 'react';
import Graphics from '../components/banners/Graphics';
import Canvas from '../components/banners/Canvas';
import Assets from '../components/banners/Assets';
import { Asset } from '../lib/util/banners';
import NextImage from 'next/image';
import mooWalk from '../public/moo_walk.gif';
import { GetServerSideProps } from 'next';

const Banners = () => {
  const [background, setBackground] = useState<HTMLImageElement>();
  const [assets, setAssets] = useState<Asset[]>([]);

  const changeBackground = (url: string) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous';
    setBackground(image);
  };

  const addAsset = (url: string) =>
    setAssets([
      ...assets,
      {
        src: url,
        width: 0,
        x: 0,
        y: 0,
        deleted: false,
        ref: createRef(),
        groupRef: createRef(),
        tfRef: createRef(),
        flip: false,
      },
    ]);

  useEffect(() => {
    changeBackground('/banners/gm_purple.png');
  }, []);

  return (
    <div className="flex h-screen flex-col items-center gap-2 bg-pink-background px-12 pb-12 pt-40">
      <div className="mx-auto hidden min-h-0 w-full flex-grow grid-cols-8 flex-col items-center justify-center gap-x-4 md:grid">
        <div className="col-span-2 h-full min-h-0">
          <Assets addAsset={addAsset} />
        </div>
        <div className="col-span-4 flex h-full flex-col">
          <Canvas background={background} assets={assets} setAssets={setAssets} />
        </div>
        <div className="col-span-2 h-full min-h-0">
          <Graphics addAsset={addAsset} changeBackground={changeBackground} />
        </div>
      </div>
      <div className="hidden w-full justify-end md:flex">
        <p className="font-gmcafe text-purple">Inspired by our amoozing herd member, Tchoupi.</p>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:hidden">
        <h1 className="text-center font-gmcafe text-4xl text-purple">
          For the most succulent viewing pleasures, please open this page on desktop.
        </h1>
        <div className="w-40">
          <NextImage src={mooWalk} layout="responsive" alt="Moo Walk" />
        </div>
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
