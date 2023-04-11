import { useEffect, useState } from 'react';
import Backgrounds from '../components/banners/Backgrounds';
import Canvas from '../components/banners/Canvas';
import Assets from '../components/banners/Assets';
import { Asset } from '../lib/util/banners';

const Banners = () => {
  const [background, setBackground] = useState<HTMLImageElement>();
  const [assets, setAssets] = useState<Asset[]>([]);

  const changeBackground = (url: string) => {
    const image = new Image();
    image.src = url;
    setBackground(image);
  };

  const addAsset = (url: string) => setAssets([...assets, { src: url, width: 0, x: 0, y: 0 }]);

  useEffect(() => {
    changeBackground('/banners/gm_purple.png');
  }, []);

  return (
    <div className="flex h-screen items-center bg-pink-background px-12 pb-12 pt-40">
      <div className="mx-auto grid h-full w-full grid-cols-8 flex-col items-center justify-center gap-x-4">
        <div className="col-span-2 h-full min-h-0">
          <Assets addAsset={addAsset} />
        </div>
        <div className="col-span-4">
          <Canvas background={background} assets={assets} setAssets={setAssets} />
        </div>
        <div className="col-span-2 h-full min-h-0">
          <Backgrounds changeBackground={changeBackground} />
        </div>
      </div>
    </div>
  );
};

export default Banners;
