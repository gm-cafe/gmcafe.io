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
import AnimatedPageSection from '../components/AnimatedPageSection';
import Head from 'next/head';
import Marquee from '../components/Marquee';
import MemberCard, { members } from '../components/MemberCard';
import Disclosures from '../components/Disclosures';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Good Morning Café</title>
      </Head>
      <main className="scroll-smooth pt-16">
        <section
          id="home"
          className="relative w-full animate-section bg-banner-repeat bg-contain bg-bottom bg-repeat-x"
        >
          <div className="relative mx-auto h-[60vh] max-h-[1000px] max-w-screen-screen md:mt-16 md:h-auto">
            <img
              src="banner.png"
              className="h-full max-h-[1000px] w-full animate-section object-cover object-bottom md:object-contain"
              alt="Café Banner"
            />
          </div>
          <img
            src="clouds_right.png"
            alt="Clouds Left"
            className="absolute bottom-0 h-full w-full object-cover object-bottom md:object-contain md:object-right"
          />
          <img
            src="clouds_left.png"
            alt="Clouds Right"
            className="absolute bottom-0 h-full w-full object-cover object-bottom md:object-contain md:object-left"
          />
        </section>
        <section className="bg-pink px-16 py-4 2xl:px-0">
          <div className="mx-auto flex max-w-screen-2xl flex-col-reverse xl:flex-row xl:gap-16">
            <div className="z-20 mx-auto w-[28rem] shrink-0 translate-y-[63px]">
              <Image src={mooPeek} layout="responsive" alt="Moo Peek" />
            </div>
            <div className="mt-12 flex flex-col">
              <h2 className="font-gmcafe text-8xl uppercase text-white">Howdy!</h2>
              <h1 className="font-gmcafe text-5xl text-white">
                Welcome to the characters of the Good Morning Café!
              </h1>
            </div>
            <div className="hidden w-48 shrink-0 translate-y-[100px] xl:block">
              <Image src={randy} layout="responsive" alt="Randy" />
            </div>
          </div>
        </section>
        <section className="bg-two-tone-gray overflow-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="flex h-full bg-white">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-88">
                  <Image src={genesisHighland} layout="responsive" alt="Genesis Highland" />
                </div>
              </div>
              <div className="squiggle min-w-[60px] bg-gray-100" />
            </div>
            <div className="col-span-1 h-full bg-gray-100 py-12 px-24 md:col-span-2 md:py-20">
              <h2 className="font-gmcafe text-5xl uppercase text-purple">The Moos</h2>
              <p className="mt-6 text-lg font-medium text-purple">
                It is said that each Highland Cow chooses its owner using a sophisticated series of
                vacant stares and whispered moos that connects deeply with the inner personality of
                the beholder. Your Moo is your membership to “The Herd” - a succulent group of 333
                similarly minded individuals all MOOving together.
              </p>
              <p className="mt-6 text-lg font-medium text-purple">
                Launched in September 2021, the Highland Cow Genesis collection started as cute
                artistic expression - a merging of multiple cultures all wrapped up in bovine floof.
                Each Moo is 1/1 and individually hand drawn by lifelong artist Ben Colefax, to
                create a truely unique blockchain dwelling entity.
              </p>
              <div className="mt-6 flex gap-8">
                <a
                  className="text-shadow rounded-full bg-pink-light px-4 pt-1 pb-0.5 font-gmcafe text-3xl uppercase text-white"
                  target="_blank"
                  rel="noreferrer"
                  href="https://etherscan.io"
                >
                  Cow Contract
                </a>
                <a
                  className="text-shadow rounded-full bg-pink-light px-4 pt-1 pb-0.5 font-gmcafe text-3xl uppercase text-white"
                  target="_blank"
                  rel="noreferrer"
                  href="https://etherscan.io"
                >
                  Buy on OpenSea
                </a>
              </div>
            </div>
          </div>
        </section>
        <AnimatedPageSection className="bg-white py-4 2xl:px-0">
          <Marquee direction="left" />
          <Marquee direction="right" />
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-gray overflow-x-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="flex h-full bg-white">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-88">
                  <Image src={phase2Brewing} layout="responsive" alt="Phase 2 Brewing" />
                </div>
              </div>
              <div className="squiggle bg-gray-100" />
            </div>
            <div className="col-span-1 h-full bg-gray-100 py-12 px-24 md:col-span-2 md:py-20">
              <h2 className="font-gmcafe text-5xl uppercase text-purple">Oink, Ney, or Rawr?</h2>
              <p className="mt-6 text-lg font-medium text-purple">
                The Moos are creatures of comfort, luxurious beasts who would prefer to graze
                endlessly on the cool green grassland of the café estate. However, some cows like to
                explore. They like to roll down hills, pet chickens, paint masterpieces,
                accidentally discover whole new species hidden in the earth for 1000’s of years..
              </p>
              <p className="mt-6 text-lg font-medium text-purple">
                Phase 2 is on the brew! A fresh new creature awaits their awakening.
              </p>
              <p className="mt-6 text-lg font-medium text-purple">
                Check the
                <a className="mx-1 font-semibold underline" href="https://discord.gg/gmcafe">
                  Discord
                </a>
                for more details.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-purple overflow-x-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="flex h-full bg-white">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-88">
                  <Image src={lockEm} layout="responsive" alt="Lock 'Em in the Barn" />
                </div>
              </div>
              <div className="squiggle bg-purple" />
            </div>
            <div className="col-span-1 h-full bg-purple py-12 px-24 md:col-span-2 md:py-20">
              <h2 className="font-gmcafe text-5xl uppercase text-white">Moogration</h2>
              <p className="mt-6 text-lg font-medium text-white">
                We started our NFT journey here in the cafe as pure artistic expression, built upon
                the OpenSeas (ERC-1155) contract. Since then, we’ve all made many new friends and as
                a group investigated the best way to grow as a herd. It’s time to stand on our own
                four hooves.
              </p>
              <p className="mt-6 text-lg font-medium text-white">
                Over the coming weeks we will be executing our MOOgration from the existing basic
                contract supplied by OpenSea to our own ERC-721 GMOO contract, complete with
                additional features like “Barn Safety”, where moos can be safely &quot;locked
                up&quot; to help prevent theft.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-gray overflow-x-hidden">
          <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="flex h-full bg-white">
              <div className="z-10 flex h-full flex-1 items-center bg-white">
                <div className="w-88">
                  <Image src={faq} layout="responsive" alt="FAQ" />
                </div>
              </div>
              <div className="squiggle min-w-[55px] bg-gray-100" />
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 py-12 px-24 md:col-span-2 md:py-20">
              <Disclosures />
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection id="team" className="bg-pink py-16 px-10 sm:px-16 2xl:px-0">
          <div className="relative mx-auto flex max-w-screen-2xl flex-col">
            <div className="absolute top-0 right-0 z-0 w-36 -translate-y-[100px]">
              <Image src={egg} layout="responsive" alt="Egg" />
            </div>
            <h2 className="font-gmcafe text-5xl uppercase text-white">Team</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {members.map((member) => (
                <MemberCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </AnimatedPageSection>
      </main>
      <footer className="relative flex w-full items-center justify-center bg-gray-100 pb-12 pt-4">
        <div className="mx-auto flex max-w-screen-2xl gap-8">
          <div className="flex flex-grow flex-col justify-end">
            <div className="flex gap-4">
              <a
                className="text-shadow rounded-full bg-pink-light px-5 pt-1 font-gmcafe text-3xl uppercase text-white"
                href="https://discord.gg/gmcafe"
              >
                Discord
              </a>
              <a
                className="text-shadow rounded-full bg-pink-light px-5 pt-1 font-gmcafe text-3xl uppercase text-white"
                href="https://twitter.com/gmcafeNFT"
              >
                Twitter
              </a>
              <a
                className="text-shadow rounded-full bg-pink-light px-5 pt-1 font-gmcafe text-3xl uppercase text-white"
                href="https://discord.gg/gmcafe"
              >
                OpenSea
              </a>
            </div>
            <h2 className="font-gmcafe text-10xl uppercase leading-none text-pink">
              Join the Herd
            </h2>
          </div>
          <div className="w-96 shrink-0">
            <Image src={highFive} layout="responsive" alt="Moos High Five" />
          </div>
        </div>
        <div className="absolute bottom-0 flex w-full flex-col justify-end">
          <div className="h-20 w-full bg-[url('/fence.png')] bg-[length:400px_auto] bg-bottom bg-repeat-x" />
          <div className="h-10 bg-grass" />
        </div>
      </footer>
    </>
  );
};

export default Home;
