import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce, useIntersection } from 'react-use';

const unbornMoos = [320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 333];

const moos = Array.from(Array(333))
  .map((_, i) => `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/transparent/${i + 1}.png`)
  .filter((_, i) => !unbornMoos.includes(i + 1));

const keeks = Array.from(Array(3333)).map(
  (_, i) => `https://gmcafe.s3.us-east-2.amazonaws.com/keek/transparent/${i + 1}.png`
);

const PAGE = 30;

type Props = {
  addAsset: (_file: string) => void;
};

const Assets = ({ addAsset }: Props) => {
  const [hydrated, setHydrated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [assets, setAssets] = useState(moos.slice(0, PAGE));

  useEffect(() => {
    setHydrated(true);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  const loadMore = useCallback(() => {
    selectedIndex === 0 &&
      assets.length < moos.length &&
      setAssets(moos.slice(0, assets.length + PAGE));
    selectedIndex === 1 &&
      assets.length < keeks.length &&
      setAssets(keeks.slice(0, assets.length + PAGE));
  }, [selectedIndex]);

  const onClick = useCallback((idx: number) => {
    setSelectedIndex(idx);
    setAssets(idx === 0 ? moos.slice(0, PAGE) : keeks.slice(0, PAGE));
  }, []);

  useDebounce(() => intersection && intersection.isIntersecting && loadMore(), 150, [intersection]);

  if (!hydrated) return null;

  return (
    <Tab.Group
      as="div"
      className="flex h-full flex-col gap-4 rounded-xl bg-white p-4"
      selectedIndex={selectedIndex}
      onChange={onClick}
    >
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
          {assets.map((moo) => (
            <div className="flex" key={moo} onClick={() => addAsset(moo)}>
              <Image src={moo} width={300} height={300} alt="Moo" unoptimized />
            </div>
          ))}
          <div ref={ref} />
        </Tab.Panel>
        <Tab.Panel className="grid grid-cols-2 gap-4">
          {assets.map((keek) => (
            <div className="flex" key={keek} onClick={() => addAsset(keek)}>
              <Image src={keek} width={300} height={300} alt="Keek" unoptimized />
            </div>
          ))}
          <div ref={ref} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Assets;
