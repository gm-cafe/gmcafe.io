// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import mooPeek from '../public/moo_peek.png';
import randy from '../public/randy.png';
import egg from '../public/egg.png';
import genesisHighland from '../public/genesis_highland.png';
import phase2Brewing from '../public/phase2_brewing.png';
import faq from '../public/faq.png';
import lockEm from '../public/lock_em.png';
import highFive from '../public/high_five.png';
import cowla from '../public/cowla.png';
import coffeeSpill from '../public/coffee_spill.png';
import AnimatedPageSection from '../components/AnimatedPageSection';
import Head from 'next/head';
import Marquee from '../components/Marquee';
import MemberCard, { members } from '../components/MemberCard';
import Disclosures from '../components/Disclosures';
import AnchorLink from '../components/AnchorLink';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Good Morning Café</title>
      </Head>
      <div id="home" className="scroll-smooth pt-16">
        <section className="relative w-full animate-section bg-banner-repeat bg-contain bg-bottom bg-repeat-x">
          <div className="relative mx-auto h-[60vh] max-h-[1000px] max-w-screen-screen md:mt-16 md:h-auto">
            <img
              src="banner.jpg"
              className="h-full max-h-[1000px] w-full animate-section object-cover object-bottom md:object-contain"
              alt="Café Banner"
            />
          </div>
          <img
            src="clouds_right.png"
            alt="Clouds Left"
            className="absolute top-0 h-full max-h-[1050px] w-full object-cover object-bottom md:h-auto md:object-contain md:object-right"
          />
          <img
            src="clouds_left.png"
            alt="Clouds Right"
            className="absolute top-0 h-full max-h-[1050px] w-full object-cover object-bottom md:h-auto md:object-contain md:object-left"
          />
        </section>
        <section className="bg-pink px-10 pt-10 pb-4 sm:px-16 2xl:px-0 2xl:pt-0">
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
                  <Image src={genesisHighland} layout="responsive" alt="Genesis Highland" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[60px] bg-gray-100 md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 py-12 px-10 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
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
                <AnchorLink href="https://etherscan.io">Cow Contract</AnchorLink>
                <AnchorLink href="https://opensea.io/collection/goodmorningcafe">
                  Buy on OpenSea
                </AnchorLink>
              </div>
            </div>
          </div>
        </section>
        <AnimatedPageSection className="bg-white py-4 2xl:px-0">
          <Marquee direction="left" />
          <Marquee direction="right" />
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-gray overflow-x-hidden">
          <div className="relative mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
            <div className="hidden h-full bg-white md:flex">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-60 xl:w-80 2xl:w-88">
                  <Image src={phase2Brewing} layout="responsive" alt="Phase 2 Brewing" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[51px] bg-gray-100 md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 py-12 px-10 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
              <h2 className="font-gmcafe text-5xl uppercase text-purple">Oink, Ney, or Rawr?</h2>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                The Moos are creatures of comfort, luxurious beasts who would prefer to graze
                endlessly on the cool green grassland of the café estate. However, some cows like to
                explore. They like to roll down hills, pet chickens, paint masterpieces,
                accidentally discover whole new species hidden in the earth for 1000’s of years..
              </p>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                Phase 2 is on the brew! A fresh new creature awaits their awakening.
              </p>
              <p className="mt-6 font-medium text-purple xl:text-lg">
                Check the
                <a className="mx-1 font-semibold underline" href="https://discord.gg/gmcafe">
                  Discord
                </a>
                for more details.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection>
          <div className="relative mx-auto max-w-screen-2xl">
            <div className="absolute right-4 -bottom-10 w-16 sm:right-8 sm:bottom-4 sm:w-24 2xl:right-0">
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
              <div className="squiggle hidden min-w-[51px] bg-purple md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-purple py-12 px-10 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
              <h2 className="font-gmcafe text-5xl uppercase text-white">Moogration</h2>
              <p className="mt-6 font-medium text-white xl:text-lg">
                We started our NFT journey here in the cafe as pure artistic expression, built upon
                the OpenSeas (ERC-1155) contract. Since then, we’ve all made many new friends and as
                a group investigated the best way to grow as a herd. It’s time to stand on our own
                four hooves.
              </p>
              <p className="mt-6 font-medium text-white xl:text-lg">
                Over the coming weeks we will be executing our MOOgration from the existing basic
                contract supplied by OpenSea to our own ERC-721 GMOO contract, complete with
                additional features like “Barn Safety”, where moos can be safely &quot;locked
                up&quot; to help prevent theft.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <section>
          <div className="relative z-10 mx-auto max-w-screen-2xl">
            <div className="absolute right-4 -top-12 z-10 w-16 sm:right-8 sm:-top-24 sm:w-28 2xl:right-0">
              <Image src={cowla} layout="responsive" alt="Coffee Spill" />
            </div>
          </div>
        </section>
        <AnimatedPageSection id="faq" className="bg-two-tone-gray overflow-x-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
            <div className="hidden h-full bg-white md:flex">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-60 xl:w-80 2xl:w-88">
                  <Image src={faq} layout="responsive" alt="FAQ" />
                </div>
              </div>
              <div className="squiggle hidden min-w-[54px] bg-gray-100 md:block" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 pt-12 pb-16 sm:py-12 md:col-span-2 md:py-20 md:pl-20 lg:pl-14 lg:pr-10 2xl:px-24">
              <Disclosures />
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection id="team" className="bg-pink py-16 px-10 2xl:px-0">
          <div className="relative mx-auto flex max-w-screen-2xl flex-col">
            <div className="absolute top-0 right-0 z-0 w-36 -translate-y-[100px]">
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
              <AnchorLink href="https://opensea.io/collection/goodmorningcafe">OpenSea</AnchorLink>
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
            <p className="text-xs text-purple opacity-30">© 2022 Colefax Corp.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
