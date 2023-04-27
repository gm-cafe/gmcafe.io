// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import mooPeek from '../public/moo_peek.png';
import randy from '../public/randy_sparkle.png';
import egg from '../public/egg.png';
import genesisHighland from '../public/genesis_highland.png';
import keekusaurs from '../public/keekusaurs.png';
import faq from '../public/faq.png';
import lockEm from '../public/lock_em.png';
import highFive from '../public/high_five.png';
import cowla from '../public/cowla.png';
import coffeeSpill from '../public/coffee_spill.png';
import AnimatedPageSection from '../components/AnimatedPageSection';
import Marquee from '../components/Marquee';
import MemberCard, { members } from '../components/MemberCard';
import Disclosures from '../components/Disclosures';
import AnchorLink from '../components/AnchorLink';
import useGetHerd from '../lib/hooks/useGetHerd';
import Link from 'next/link';

const Home: NextPage = () => {
  const herd = useGetHerd();

  const lockedCount = herd.filter((moo) => moo.locked).length;
  const unlockedCount = herd.length - lockedCount;

  return (
    <>
      <div id="home" className="scroll-smooth pt-16">
        <section className="relative w-full animate-section bg-banner-repeat bg-contain bg-bottom bg-repeat-x">
          <div className="relative mx-auto h-[60vh] max-h-[1000px] max-w-screen-screen md:mt-12 md:h-auto">
            <img
              src="banner.jpg"
              className="h-full max-h-[600px] w-full animate-section object-cover object-bottom md:object-contain 2xl:max-h-[1000px]"
              alt="Café Banner"
            />
          </div>
          <div className="absolute top-0 hidden h-[125%] w-full min-w-[500px] flex-1 justify-center overflow-hidden md:flex">
            <img className="max-w-[800px]" src="clouds_left.png" alt="Clouds Left" />
            <div className="min-w-[500px] flex-1"></div>
            <img className="max-w-[800px]" src="clouds_right.png" alt="Clouds Right" />
          </div>
        </section>
        <section className="bg-pink px-10 pb-4 pt-10 sm:px-16 2xl:px-0 2xl:pt-0">
          <div className="mx-auto flex max-w-screen-2xl flex-col-reverse xl:flex-row xl:gap-16">
            <div className="z-20 mx-auto w-72 shrink-0 translate-y-[49px] sm:w-[28rem] sm:translate-y-[67.5px]">
              <Image src={mooPeek} layout="responsive" alt="Moo Peek" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-gmcafe text-8xl uppercase text-white">Howdy!</h2>
              <h1 className="font-gmcafe text-5xl text-white">
                Welcome to the characters of the Good Morning Café!
              </h1>
            </div>
            <div className="hidden w-48 shrink-0 translate-y-[130px] xl:block">
              <Image src={randy} layout="responsive" alt="Randy" />
            </div>
          </div>
        </section>
        <section className="bg-two-tone-gray overflow-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
            <div className="hidden h-full bg-white md:flex">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-60 xl:w-80 2xl:w-88">
                  <Image src={genesisHighland} layout="responsive" alt="Genesis Highlands" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[60px] border-r border-gray-100 bg-gray-100 md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 py-12 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
              <h2 className="font-gmcafe text-5xl uppercase text-purple">The Moos</h2>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                It is said that each Highland Cow chooses its owner using a sophisticated series of
                vacant stares and whispered moos that connects deeply with the inner personality of
                the beholder. Your Moo is your membership to “The Herd” - a succulent group of 333
                similarly minded individuals all MOOving together.
              </p>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                Launched in September 2021, the Highland Cow Genesis collection started as cute
                artistic expression - a merging of multiple cultures all wrapped up in bovine floof.
                Each Moo is 1/1 and individually hand drawn by lifelong artist Ben Colefax, to
                create a truely unique blockchain dwelling entity.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 lg:gap-8">
                <AnchorLink href="https://etherscan.io/address/0xe43d741e21d8bf30545a88c46e4ff5681518ebad">
                  Cow Contract
                </AnchorLink>
                <AnchorLink href="https://opensea.io/collection/goodmorningcafe">
                  Buy on OpenSea
                </AnchorLink>
                <AnchorLink href="/migrate">Migrate your Cow</AnchorLink>
              </div>
            </div>
          </div>
        </section>
        <AnimatedPageSection className="bg-white py-4 2xl:px-0">
          <Marquee direction="left" type="gmoo" />
          <Marquee direction="right" type="keek" />
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-gray overflow-x-hidden">
          <div className="relative mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
            <div className="hidden h-full bg-white md:flex">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-60 xl:w-80 2xl:w-88">
                  <Image src={keekusaurs} layout="responsive" alt="Keekusaurs" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[51px] border-r border-gray-100 bg-gray-100 md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 py-12 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
              <h2 className="font-gmcafe text-5xl uppercase text-purple">The Keeks</h2>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                These tender Keekusaurs were frozen in mysteriously supercharged ice for a
                millennia, deep in a cave on the GMCafé Estate. After being discovered, the Moos of
                Kawa Valley graciously gave them the clothes (and traits) off their floofy backs and
                taught them to way of the Herd. If you look closely you will find a Keek that
                resonates with your soul and your inner personality. Your Keekusaur is your
                membership to “The Keek Herd” - a succulent group of 3333 similarly minded
                individuals all RAWRing nobly into the ether together.
              </p>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                Launched in March 2023, &apos;The Keekusaurs&apos; is a follow up collection to the
                Moo&apos;s - bringing a new character into the fold. Adopt a precious and tender
                Keekusaur to join the world and future of the Good Morning Café as we share moist
                succulence far and wide.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 lg:gap-8">
                <AnchorLink href="https://etherscan.io/address/0x01298589d7c2bD82f54Ca84060d58967772123F2">
                  Keek Contract
                </AnchorLink>
                <AnchorLink href="https://opensea.io/collection/keeks">Buy on OpenSea</AnchorLink>
              </div>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection>
          <div className="relative mx-auto max-w-screen-2xl">
            <div className="absolute -bottom-10 right-4 w-16 sm:bottom-4 sm:right-8 sm:w-24 2xl:right-0">
              <Image src={coffeeSpill} layout="responsive" alt="Coffee Spill" />
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-purple overflow-x-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
            <div className="hidden h-full bg-white md:flex">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-60 xl:w-80 2xl:w-88">
                  <Image src={lockEm} layout="responsive" alt="Lock 'Em in the Barn" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[51px] border-r border-purple bg-purple md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-purple px-10 py-12 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="font-gmcafe text-5xl uppercase text-white">Moo Lock</h2>
                <div className="flex flex-wrap gap-4">
                  <span className="rounded-full bg-pink px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
                    {lockedCount} Locked Moos
                  </span>
                  <span className="rounded-full bg-green-light px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
                    {unlockedCount} Free Range Moos
                  </span>
                </div>
              </div>
              <p className="mt-6 font-medium text-white xl:text-lg">
                Locking your Moo in the barn will add a layer of protection against the scares in
                the Web3 world. If you accidentally give permission for someone to access your Moo
                (i.e. signing a setApprovalForAll transaction), this special feature will help
                ensure your Highland Cow stays safely in your wallet!
              </p>
              <p className="mt-6 font-medium text-white xl:text-lg">
                Advanced Moo Lock is coming soon, which will enable custom password security and
                allow you to set a backup rescue wallet in case your main wallet is compromised.
              </p>
              <p className="mt-6 font-medium text-white xl:text-lg">
                Head over to the
                <Link href="/dashboard">
                  <a className="mx-1 font-semibold underline">Dashboard</a>
                </Link>
                to lock up your Moo and enjoy the peace of mind that your bovine is safe and sound.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <section>
          <div className="relative z-10 mx-auto max-w-screen-2xl">
            <div
              id="faq"
              className="absolute -top-12 right-4 z-10 w-16 sm:-top-24 sm:right-8 sm:w-28 2xl:right-0"
            >
              <Image src={cowla} layout="responsive" alt="Coffee Spill" />
            </div>
          </div>
        </section>
        <AnimatedPageSection className="bg-two-tone-gray overflow-x-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
            <div className="hidden h-full bg-white md:flex">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-60 xl:w-80 2xl:w-88">
                  <Image src={faq} layout="responsive" alt="FAQ" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[54px] border-r border-gray-100 bg-gray-100 md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 pb-16 pt-12 sm:py-12 md:col-span-2 md:py-20 md:pl-20 lg:pl-14 lg:pr-10 2xl:px-24">
              <Disclosures />
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection id="team" className="bg-pink px-10 py-16 2xl:px-0">
          <div className="relative mx-auto flex max-w-screen-2xl flex-col">
            <div className="absolute right-0 top-0 z-0 w-36 -translate-y-[100px]">
              <Image src={egg} layout="responsive" alt="Egg" />
            </div>
            <h2 className="font-gmcafe text-5xl uppercase text-white">Team</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {members.map((member) => (
                <MemberCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </AnimatedPageSection>
      </div>
      <footer className="relative flex w-full items-center justify-center overflow-hidden bg-sky pb-12 pt-4">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-10 sm:flex-row sm:gap-8">
          <div className="flex flex-grow flex-col justify-end">
            <div className="flex gap-4">
              <AnchorLink href="https://discord.gg/gmcafe">Discord</AnchorLink>
              <AnchorLink href="https://twitter.com/gmcafeNFT">Twitter</AnchorLink>
              <AnchorLink href="https://opensea.io/collection/goodmorningcafe">Moos</AnchorLink>
              <AnchorLink href="https://opensea.io/collection/keeks">Keeks</AnchorLink>
            </div>
            <h2 className="text-border-white mt-2 text-center font-gmcafe text-6xl uppercase leading-none text-purple sm:mb-6 sm:mt-0 sm:text-left sm:text-7xl xl:mb-0 xl:text-9xl 2xl:text-10xl">
              Join the Herd
            </h2>
          </div>
          <div className="w-60 sm:block sm:w-48 md:w-64 xl:w-88 2xl:w-96">
            <Image src={highFive} layout="responsive" alt="Moos High Five" />
          </div>
        </div>
        <div className="absolute bottom-0 flex w-full flex-col justify-end">
          <div className="h-24 w-full translate-y-[1px] bg-[url('/fence.png')] bg-[length:300px_auto] bg-bottom bg-repeat-x xl:bg-[length:460px_auto]" />
          <div className="flex h-10 items-end justify-center bg-grass pb-2">
            <p className="text-xs text-purple opacity-30">© 2023 Colefax Corp.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Good Morning Café',
      metaImage: 'https://gmcafe.io/meta_image.png',
      metaDescription:
        'Welcome to the world and characters of GMCafé, most succulent and tantalising establishment in the metaverse.',
    },
  };
};
