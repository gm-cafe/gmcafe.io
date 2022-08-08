import Head from 'next/head';
import { useContractRead } from 'wagmi';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Papa from 'papaparse';
import { TwitterIcon, DiscordIcon } from '../components/Icons';
import classNames from 'classnames';

const lazyMintedMoos = [
  206, 223, 235, 238, 300, 308, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 333,
];

const sheetId = '1fWX_s0XrbBIJcC0jenzwvQtiiOnT8yjc2c57kWxyJUA';

const description =
  'The Great Moogration is happening! Our precious Highland Cows are finally being migrated to their own custom contract with much more luxurious pastures to graze in.';

const MigrateRemaining = ({ contact }: { contact: Contact[] }) => {
  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getHerd',
  });

  const migratedMoos = data?.map((herd) => parseInt(herd.slice(3, 6), 16));
  const unmigratedMoos = Array.from(Array(333).keys())
    .map((i) => i + 1)
    .filter((i) => !migratedMoos?.includes(i) && !lazyMintedMoos.includes(i));

  return (
    <div className="min-h-screen bg-pink-background pt-36 pb-12 md:pt-40">
      <Head>
        <title>Remaining Moos</title>
        <meta property="og:image" content="/migrate/moo.png" />
        <meta name="twitter:image" content="/migrate/moo.png" />
        <meta name="description" content={description} key="desc" />
        <meta property="og:description" content={description} key="ogDesc" />
        <meta name="twitter:description" content={description} key="twitterDesc" />
      </Head>
      <div className="mx-auto flex max-w-screen-xl flex-wrap justify-center gap-4">
        {unmigratedMoos.map((id) => {
          const osToken = contact[id].osToken;
          const twitter = contact[id]?.twitter;
          const discord = contact[id]?.discordName;

          return (
            <a
              href={`https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/${osToken}`}
              target="_blank"
              rel="noreferrer"
              className="w-40 transition-transform hover:-translate-y-1"
              key={id}
            >
              <div className="relative">
                <Image
                  className={classNames('rounded-t-xl', {
                    'rounded-b-xl': !twitter && !discord,
                  })}
                  src={`https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg/${id}.jpg`}
                  layout="responsive"
                  width={800}
                  height={800}
                  alt={`Highland Cow #${id}`}
                />
                <span className="absolute top-0 right-0 rounded-bl-lg rounded-tr-xl bg-white px-2 font-gmcafe text-lg text-purple 2xl:text-2xl">
                  {id}
                </span>
              </div>
              {(twitter || discord) && (
                <div className="flex flex-col gap-2 rounded-b-xl bg-white p-2 items-center">
                  {twitter && (
                    <a
                      className="flex w-max max-w-full items-center rounded-full bg-twitter px-2 py-1 transition betterhover:hover:scale-105"
                      href={`https://twitter.com/${twitter}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <TwitterIcon className="h-3 w-3" fill="#ffffff" />
                      <p className="ml-1.5 overflow-hidden truncate whitespace-nowrap pr-0.5 font-default text-xs text-white">
                        {twitter}
                      </p>
                    </a>
                  )}
                  {discord && (
                    <span className="flex w-max max-w-full items-center rounded-full bg-discord px-2 py-1">
                      <DiscordIcon className="h-3 w-3" />
                      <p className="ml-1.5 overflow-hidden truncate whitespace-nowrap pr-0.5 font-default text-xs text-white">
                        {discord}
                      </p>
                    </span>
                  )}
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MigrateRemaining;

type Contact = {
  osToken: string;
  twitter?: string;
  discordName?: string;
  discordId?: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const gmooSheet = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=GMOO&range=AI:AJ`
  )
    .then((response) => response.text())
    .then((v) => Papa.parse<string[]>(v))
    .then(({ data }) => data);

  const contactSheet = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Contact&range=B:E`
  )
    .then((response) => response.text())
    .then((v) => Papa.parse<string[]>(v))
    .then(({ data }) => data);

  const contacts = gmooSheet.map<Contact>(([address, osToken]) => {
    const contact = contactSheet.find((row) => row[3] === address);
    return contact
      ? {
          osToken: osToken,
          twitter: contact[0],
          discordName: contact[1],
          discordId: contact[2],
        }
      : {
          osToken: osToken,
        };
  });

  return {
    props: {
      contact: contacts,
    },
  };
};
