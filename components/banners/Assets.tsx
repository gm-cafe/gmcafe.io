import { Tab } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce, useIntersection } from 'react-use';

const unbornMoos = [320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 333];

type AssetData = {
  id: number;
  url: string;
};

const moos = Array.from(Array(333))
  .map((_, i) => ({
    id: i + 1,
    url: `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/transparent/${i + 1}.png`,
  }))
  .filter((_, i) => !unbornMoos.includes(i + 1));

const keeks = Array.from(Array(3333)).map((_, i) => ({
  id: i + 1,
  url: `https://gmcafe.s3.us-east-2.amazonaws.com/keek/transparent/${i + 1}.png`,
}));

const PAGE = 30;

type Props = {
  addAsset: (_file: string) => void;
};

const Assets = ({ addAsset }: Props) => {
  const [hydrated, setHydrated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [size, setSize] = useState(PAGE);
  const [search, setSearch] = useState('');

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
    selectedIndex === 0 && size < moos.length && setSize(size + PAGE);
    selectedIndex === 1 && size < keeks.length && setSize(size + PAGE);
  }, [selectedIndex, size]);

  const onClick = useCallback((idx: number) => {
    setSelectedIndex(idx);
    setSize(PAGE);
  }, []);

  useDebounce(() => intersection && intersection.isIntersecting && loadMore(), 150, [intersection]);

  const filter = useCallback(
    (assets: AssetData[]) => {
      const searches = search
        .split(' ')
        .map((s) => s.trim())
        .filter((s) => !!s);

      const filtered =
        searches.length === 0
          ? assets
          : assets.filter(({ id }) => searches.includes(id.toString()));

      return filtered.slice(0, size);
    },
    [search, size]
  );

  if (!hydrated) return null;

  return (
    <Tab.Group
      as="div"
      className="flex h-full flex-col gap-4 rounded-xl bg-white p-4"
      selectedIndex={selectedIndex}
      onChange={onClick}
    >
      <h2 className="border-b border-purple-light pb-2 font-gmcafe text-2xl uppercase text-purple">
        Assets
      </h2>
      <div className="flex h-full flex-col overflow-y-scroll">
        <div className="mb-2 flex gap-4 p-1">
          <div className="flex min-w-0 flex-grow gap-2 rounded border border-purple px-1.5 py-1 text-purple">
            <SearchIcon className="h-6 w-6 shrink-0" />
            <input
              className="min-w-0 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
        <Tab.Panels className="flex flex-col">
          <Tab.Panel className="grid grid-cols-2 gap-4">
            {filter(moos).map(({ url }) => (
              <div className="flex" key={url} onClick={() => addAsset(url)}>
                <Image src={url} width={300} height={300} alt="Moo" unoptimized />
              </div>
            ))}
            <div ref={ref} />
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 gap-4">
            {filter(keeks).map(({ url }) => (
              <div className="flex" key={url} onClick={() => addAsset(url)}>
                <Image src={url} width={300} height={300} alt="Keek" unoptimized />
              </div>
            ))}
            <div ref={ref} />
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default Assets;
