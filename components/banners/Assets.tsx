import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';

const unbornMoos = [320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330];

const moos = Array.from(Array(333))
  .map((_, i) => `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/transparent/${i + 1}.png`)
  .filter((_, i) => !unbornMoos.includes(i + 1));

const keeks = Array.from(Array(3333)).map(
  (_, i) => `https://gmcafe.s3.us-east-2.amazonaws.com/keek/transparent/${i + 1}.png`
);

type Props = {
  addAsset: (_file: string) => void;
};

const Assets = ({ addAsset }: Props) => {
  return (
    <Tab.Group as="div" className="flex h-full flex-col gap-4 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between border-b border-purple-light pb-2">
        <h2 className="font-gmcafe text-2xl uppercase text-purple">Assets</h2>
        <Tab.List className="flex gap-2 font-gmcafe text-xl">
          <Tab>
            {({ selected }) => (
              <button
                className={classNames(
                  'rounded-lg px-2 uppercase transition-colors',
                  { 'bg-purple text-white': selected },
                  { 'bg-white text-purple': !selected }
                )}
              >
                Moos
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <button
                className={classNames(
                  'rounded-lg px-2 uppercase transition-colors',
                  { 'bg-purple text-white': selected },
                  { 'bg-white text-purple': !selected }
                )}
              >
                Keeks
              </button>
            )}
          </Tab>
        </Tab.List>
      </div>
      <Tab.Panels className="h-full overflow-y-auto">
        <Tab.Panel className="grid grid-cols-2 gap-4">
          {moos.map((moo) => (
            <div className="flex" key={moo} onClick={() => addAsset(moo)}>
              <Image src={moo} width={300} height={300} alt="Moo" />
            </div>
          ))}
        </Tab.Panel>
        <Tab.Panel className="grid grid-cols-2 gap-4">
          {keeks.map((keek) => (
            <div className="flex" key={keek} onClick={() => addAsset(keek)}>
              <Image src={keek} width={300} height={300} alt="Keek" />
            </div>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Assets;
