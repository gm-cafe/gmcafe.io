import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { UploadIcon } from '@heroicons/react/solid';

const backgrounds = [
  { file: 'gm_pink.png', alt: 'GM Pink Background' },
  { file: 'gm_purple.png', alt: 'GM Purple Background' },
  { file: 'moo_pink.png', alt: 'Moo Pink Background' },
  { file: 'moo_purple.png', alt: 'Moo Purple Background' },
  { file: 'plain_light_pink.png', alt: 'Plain Light Pink Background' },
  { file: 'plain_pink.png', alt: 'Plain Pink Background' },
  { file: 'spots_pink.png', alt: 'Pink Spots Background' },
];

const objects = [
  { file: 'coffee.png', alt: 'Coffee' },
  { file: 'coffee_spill.png', alt: 'Coffee Spill' },
  { file: 'coffee_pink.png', alt: '' },
  { file: 'cocoa.png', alt: '' },
  { file: 'cowla.png', alt: 'Cowla' },
  { file: 'frappe.png', alt: '' },
  { file: 'randy.png', alt: 'Randy Standing' },
  { file: 'randy_sit.png', alt: 'Randy Sitting' },
  { file: 'egg.png', alt: 'Egg' },
  { file: 'drumstick.png', alt: '' },
  { file: 'cupcake.png', alt: '' },
  { file: 'baguette.png', alt: '' },
  { file: 'watermelon.png', alt: '' },
  { file: 'banana.png', alt: '' },
  { file: 'cabbage.png', alt: '' },
  { file: 'mug_plant.png', alt: '' },
  { file: 'camera.png', alt: '' },
  { file: 'game_moo.png', alt: '' },
  { file: 'moo_plush.png', alt: '' },
  { file: 'poo.png', alt: '' },
  { file: 'mustache.png', alt: '' },
  { file: 'sunglasses.png', alt: '' },
  { file: 'squad_shades.png', alt: '' },
  { file: 'pixel_shades.png', alt: '' },
  { file: 'monocle.png', alt: '' },
  { file: 'table_cloth.png', alt: 'Pink Table Cloth' },
  { file: 'fence.png', alt: 'White Fence with Grass' },
  { file: 'portal.png', alt: 'Portal' },
  { file: 'gold_medal.png', alt: 'Gold Moodel' },
  { file: 'gacha.png', alt: 'Gachapon' },
];

type Props = {
  addAsset: (_file: string) => void;
  changeBackground: (_file: string) => void;
  uploadImage: () => void;
};

const Graphics = ({ addAsset, changeBackground, uploadImage }: Props) => {
  const [hydrated, setHydrated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const onClick = useCallback((idx: number) => {
    setSelectedIndex(idx);
  }, []);

  if (!hydrated) return null;

  return (
    <Tab.Group
      as="div"
      className="flex h-full flex-col gap-4 rounded-xl bg-white p-2 md:p-4"
      selectedIndex={selectedIndex}
      onChange={onClick}
    >
      <div className="flex min-h-0 flex-col">
        <div className="mb-2 flex flex-col gap-3">
          <button
            className="flex items-center gap-2 rounded-lg bg-purple-light py-1 pl-2 pr-3 font-gmcafe text-purple transition-all hover:bg-pink-light"
            onClick={uploadImage}
          >
            <UploadIcon className="h-8 w-8" />
            Upload Image
          </button>
          <Tab.List className="flex flex-col gap-2 font-gmcafe text-xl md:flex-row lg:flex-col xl:flex-row">
            <Tab>
              {({ selected }) => (
                <div
                  className={classNames(
                    'rounded-lg px-2 uppercase transition-colors',
                    { 'bg-purple text-white': selected },
                    { 'bg-white text-purple': !selected }
                  )}
                >
                  Backgrounds
                </div>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <div
                  className={classNames(
                    'rounded-lg px-2 uppercase transition-colors',
                    { 'bg-purple text-white': selected },
                    { 'bg-white text-purple': !selected }
                  )}
                >
                  Objects
                </div>
              )}
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels className="flex flex-col overflow-y-auto overflow-x-hidden">
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-2 md:gap-4">
              {backgrounds.map(({ file, alt }) => (
                <div
                  className="flex cursor-pointer transition-transform duration-300 hover:scale-95"
                  key={file}
                  onClick={() => changeBackground(`/banners/${file}`)}
                >
                  <Image
                    src={`/banners/${file}`}
                    width={900}
                    height={300}
                    objectFit="contain"
                    alt={alt}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-2 overflow-y-auto overflow-x-hidden md:gap-4">
              {objects.map(({ file, alt }) => (
                <div
                  className="flex cursor-pointer transition-transform duration-300 hover:scale-95"
                  key={file}
                  onClick={() => addAsset(`/banners/${file}`)}
                >
                  <Image
                    src={`/banners/${file}`}
                    width={300}
                    height={300}
                    objectFit="contain"
                    alt={alt}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default Graphics;
