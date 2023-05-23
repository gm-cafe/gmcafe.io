import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CollectionType } from '../../lib/util/types';
import { useTokenURI } from '../../lib/hooks/useTokenURI';
import Image from 'next/image';
import { useSignMessage } from 'wagmi';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: CollectionType;
};

const EditModal = ({ id, open, setOpen, type }: Props) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  const [apiLoading, setApiLoading] = useState(false);

  const tokenURI = useTokenURI(type, id);

  useEffect(() => {
    setTitle(tokenURI?.info.title || '');
    setStory(tokenURI?.info.story || '');
  }, [tokenURI]);

  const obj = {
    ...(type === 'gmoo' && { moo: id }),
    ...(type === 'keek' && { keek: id }),
    title: title,
    story: story,
  };

  const {
    signMessage,
    isLoading: signLoading,
    data,
  } = useSignMessage({
    message: JSON.stringify(obj),
  });

  const loading = apiLoading || signLoading;

  const onClick = () => {
    setApiLoading(true);
    signMessage();
  };

  apiLoading &&
    data &&
    fetch('https://api.gmcafe.io/customize', {
      method: 'POST',
      body: JSON.stringify({
        ...obj,
        sig: data,
      }),
    });

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto mt-12 max-h-[80%] w-full max-w-screen-sm overflow-y-auto rounded-xl bg-white p-8">
          <div className="flex justify-between">
            <Dialog.Title className="font-gmcafe text-4xl text-purple">Edit</Dialog.Title>
            <div className="w-16">
              <Image
                className="rounded-full"
                src={`https://gmcafe.s3.us-east-2.amazonaws.com/${type}/jpg-256/${id}.jpg`}
                alt="Icon"
                unoptimized
                width={128}
                height={128}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-gmcafe text-lg text-purple" htmlFor="lockPrice">
              Name
            </label>
            <input
              className="rounded border-2 border-purple py-1 pl-2 text-purple placeholder:text-purple-light focus-within:outline-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a custom name for your Keek/Moo"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-gmcafe text-lg text-purple" htmlFor="lockPrice">
              Story
            </label>
            <textarea
              className="rounded border-2 border-purple py-1 pl-2 text-purple placeholder:text-purple-light focus-within:outline-0"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Enter a backstory for your Keek/Moo (i.e. Where are they from? What is their personality? What do they like?)"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="cursor-pointer rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white"
              disabled={loading}
              onClick={onClick}
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditModal;
