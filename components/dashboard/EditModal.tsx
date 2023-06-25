import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Dialog } from '@headlessui/react';
import { toastSuccess } from '../../lib/util/toast';
import { CollectionType, Token } from '../../lib/util/types';
import Image from 'next/image';
import { useAccount, useSignMessage } from 'wagmi';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setToken: Function;
  token: Token;
  type: CollectionType;
};

const EditModal = ({ id, open, setOpen, setToken, token, type }: Props) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [errors, setErrors] = useState({} as any);
  const [tokenMetadata, setTokenMetadata] = useState<Token>();
  const [apiLoading, setApiLoading] = useState(false);

  const { address } = useAccount();

  const obj = {
    ...(type === 'gmoo' && { moo: id }),
    ...(type === 'keek' && { keek: id }),
    ...(tokenMetadata?.custom.canTitle && { title: title }),
    story: story,
  };

  const {
    signMessage,
    isLoading: signLoading,
    data,
    error: signError,
  } = useSignMessage({
    message: JSON.stringify(obj),
  });

  const loading = apiLoading || signLoading || !tokenMetadata;

  useEffect(() => {
    if (open) {
      const url = `https://api.gmcafe.io/metadata/info?${type === 'gmoo' ? 'moo' : 'keek'}=${id}`;
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setTitle(data.info.title || '');
          setStory(data.info.story || '');
          setTokenMetadata(data);
        });
    } else {
      setErrors({});
      setTitle('');
      setStory('');
      setTokenMetadata(undefined);
    }
  }, [open, id, type]);

  useEffect(() => {
    if (apiLoading && data) {
      setErrors({});
      fetch('https://api.gmcafe.io/customize', {
        method: 'POST',
        body: JSON.stringify({
          ...obj,
          sig: data,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          console.log('here');
          setApiLoading(false);
          setToken({ ...token, info: { ...token.info, title, story } });
          setOpen(false);
          toastSuccess(`Keekusaur #${token.id} has been updated!`);
        })
        .catch(() => {
          console.log('errored');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiLoading, data]);

  useEffect(() => {
    if (signError) {
      setApiLoading(false);
    }
  }, [signError]);

  const getError = (field: any) => {
    if (!field) {
      return null;
    }
    let error = '';
    switch (field.error) {
      case 'BAD_CHAR':
        error = `You cannot use the characters: ${field.chars}`;
        break;
      case 'BAD_WORD':
        error = `You cannot use the word(s): ${field.words.join(', ')}`;
        break;
      case 'NO_LETTER':
        error = 'Your name must contain a letter.';
        break;
      case 'TITLED':
        error = `This ${type === 'gmoo' ? 'Highland Cow' : 'Keekusaur'} cannot be renamed.`;
        break;
      default:
        error = 'Something went wrong.';
        break;
    }
    return error;
  };

  const onClick = () => {
    setApiLoading(true);
    fetch('https://api.gmcafe.io/customize', {
      method: 'POST',
      body: JSON.stringify({
        ...obj,
        owner: address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrors({
            ...errors,
            title: getError(data.error.title),
            story: getError(data.error.story),
          });
          setApiLoading(false);
        } else {
          if (data.dirty) {
            signMessage();
          } else {
            setOpen(false);
            toastSuccess(`Keekusaur #${token.id} has been updated!`);
            setApiLoading(false);
          }
        }
      });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto mt-12 max-h-[80%] w-full max-w-screen-sm overflow-y-auto rounded-xl bg-white p-8">
          <div className="flex justify-between">
            <Dialog.Title className="font-gmcafe text-4xl text-purple">
              {type === 'gmoo' ? 'Highland Cow' : 'Keekusaur'} #{id}
            </Dialog.Title>
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
            <label className="font-gmcafe text-xl text-purple" htmlFor="lockPrice">
              Name
            </label>
            <input
              className={classNames(
                { 'pointer-events-none opacity-50': loading || !tokenMetadata?.custom.canTitle },
                'rounded border-2 border-purple py-1 pl-2 text-purple placeholder:text-purple-50 focus-within:outline-0'
              )}
              value={tokenMetadata ? title : ' '}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a custom name for your Keek/Moo"
              maxLength={32}
              disabled={loading || !tokenMetadata?.custom.canTitle}
            />
            {errors.title && <span className="text-pink">{errors.title}</span>}
          </div>
          <div className="flex flex-col pt-4">
            <label className="font-gmcafe text-lg text-purple" htmlFor="lockPrice">
              Story
            </label>
            <textarea
              className={classNames(
                { 'pointer-events-none opacity-50': loading },
                'rounded border-2 border-purple py-1 pl-2 text-purple placeholder:text-purple-50 focus-within:outline-0'
              )}
              value={tokenMetadata ? story : ' '}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Enter a backstory for your Keek/Moo (i.e. Where are they from? What is their personality? What do they like?)"
              maxLength={512}
              disabled={loading}
            />
            {errors.story && <span className="text-pink">{errors.story}</span>}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className={classNames(
                { 'pointer-events-none opacity-50': loading },
                'cursor-pointer rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white'
              )}
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
