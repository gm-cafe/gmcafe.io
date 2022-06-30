// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import MemberCard, { members } from '../components/MemberCard';
import cloudsLeft from '../public/clouds_left.png';
import cloudsRight from '../public/clouds_right.png';
import mooPeek from '../public/moo_peek.png';
import moo from '../public/moos/ben.png';
import keeku from '../public/keeku.png';
import AnimatedPageSection from '../components/AnimatedPageSection';
import Marquee from '../components/Marquee';
import Head from 'next/head';
import Disclosure from '../components/Disclosure';
import Logo from '../components/Logo';

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
          <div className="relative mx-auto h-[60vh] max-w-screen-screen md:h-[1000px]">
            <img
              src="banner.png"
              className="h-full w-full animate-section object-cover 2xl:object-contain"
              alt="Café Banner"
            />
            <Image src={cloudsLeft} layout="fill" alt="Clouds Left" objectFit="cover" />
            <Image src={cloudsRight} layout="fill" alt="Clouds Right" objectFit="cover" />
          </div>
          <div className="absolute -bottom-20 my-6 mx-6 sm:mx-12 md:hidden">
            <h2 className="rounded-lg bg-white px-4 pt-3 pb-2 font-gmcafe text-4xl uppercase text-purple">
              Good Morning
            </h2>
            <h2 className="inline-flex bg-white px-4 pb-3 font-gmcafe text-4xl uppercase text-purple">
              Patron!
            </h2>
          </div>
        </section>
        <AnimatedPageSection
          id="about"
          className="bg-white px-10 pt-12 pb-40 sm:px-16 md:pb-28 2xl:px-0"
        >
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="hidden font-gmcafe text-4xl uppercase text-purple md:block md:text-5xl">
              Good Morning, Patron!
            </h2>
            <p className="pt-4 text-lg font-light text-purple md:text-xl">
              Welcome to the world and characters of GMCafé, most succulent and tantalising
              establishment in the metaverse. Come grab a cowffee, chill and unwind in a place where
              art, authenticity and community are still important.
            </p>
            <div className="mx-auto mt-6 grid max-w-screen-2xl">
              <div className="inline-flex flex-col md:justify-self-end">
                <span className="text-lg font-bold text-purple md:text-xl">Love,</span>
                <span className="font-gmcafe text-2xl text-purple md:text-3xl">Ben Colefax</span>
              </div>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-pink px-10 sm:px-16 2xl:px-0">
          <div className="relative mx-auto flex max-w-screen-2xl flex-col justify-center py-12 md:py-20">
            <div className="absolute top-0 left-0 w-48 -translate-y-[7.5rem] -translate-x-[20px] md:w-64 md:-translate-y-40 md:translate-x-0">
              <Image src={mooPeek} layout="responsive" alt="Moo Peek" />
            </div>
            <h1 className="text-left font-gmcafe text-5xl uppercase text-white">About</h1>
            <p className="mt-4 text-left font-light text-white md:text-lg">
              The Good Morning Café is founded on the sturdy pillars of art, tender cuteness, humble
              commoonity and powerful cowffee. Lovingly drawn into existence by Ben Colefax, these
              kawaii inspired characters started with a deep love of Parisian macarons, café vibes
              and a lifelong vision that has converged into one pastel flavoured café.
            </p>
            <p className="mt-6 text-left font-light text-white md:text-lg lg:mt-8">
              As the ‘GMCafé’ brand expands to include more tantalisingly succulent characters, we
              invite you to be immersed by our mission to create a safe space for all, with art
              appreciation and chill community vibes at it’s cute core.
            </p>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-white py-4 2xl:px-0">
          <Marquee direction="left" />
          <Marquee direction="right" />
        </AnimatedPageSection>
        <AnimatedPageSection className="overflow-x-hidden bg-pink py-12 md:py-20">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center gap-16 px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 mx-8 overflow-hidden rounded-full">
              <Image src={moo} layout="responsive" alt="Moo" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-gmcafe text-5xl uppercase text-white">Genesis Collection</h2>
              <p className="mt-6 text-lg font-light text-white">
                It is said that each Highland Cow chooses its owner using an unrelenting series of
                vacant stares and whispered moos that connects deeply with the inner personality of
                the beholder. Your Moo is your membership to “The Herd” - a succulent group of 333
                similarly minded individuals all MOOving together.
              </p>
              <p className="mt-6 text-lg font-light text-white">
                Launched in September 2021, the Highland Cow Genesis collection started as simple
                artistic expression - a merging of multiple cultures all wrapped up in bovine floof.
                Each Moo is 1/1 and individually hand drawn, colour matched, line-work sharpened, to
                create a truely unique Ethereum blockchain dwelling entity.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-white py-12 md:py-20">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center gap-16 px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-gmcafe text-5xl uppercase text-purple">Phase Two</h2>
              <p className="mt-6 text-lg font-light text-purple">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat
                in. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Non tellus orci
                ac auctor augue mauris augue neque gravida. Posuere ac ut consequat semper. Leo
                integer malesuada nunc vel risus commodo viverra maecenas. Ultrices sagittis orci a
                scelerisque purus semper eget. Justo nec ultrices dui sapien eget mi. In eu mi
                bibendum neque egestas congue quisque egestas diam. Arcu vitae elementum curabitur
                vitae nunc sed velit dignissim. Aliquet lectus proin nibh nisl condimentum id
                venenatis a. Arcu non odio euismod lacinia at. A diam maecenas sed enim ut sem
                viverra. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Dignissim
                convallis aenean et tortor at risus viverra. Proin libero nunc consequat interdum
                varius sit.
              </p>
            </div>
            <div className="col-span-1 row-start-1 m-8 overflow-hidden rounded-full md:col-start-3">
              <Image src={keeku} layout="responsive" alt="Keeku" />
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-gray-50 py-12 md:py-20">
          <div className="mx-auto max-w-screen-2xl px-10 sm:px-16 md:grid-cols-5 2xl:px-0">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">Utility</h2>
            <p className="mt-6 text-lg font-light text-purple">
              What about Utility?! “What sort of utility is more advantageous than cuteness”, I hear
              you say. We wholeheartedly agree. As we look forward to our MOOgration from our
              existing ERC1155 to our own ERC721 contract, we’re exploring many concepts and ideas
              such as holding our Moos in a safe barn to gain access to limited MooMerch, exclusive
              to loyal holders.
            </p>
            <p className="mt-6 text-lg font-light text-purple">
              Along with the continual creation of new social assets, we are always exploring
              innovative ways to share the café story with virgin eyes and ears in ways that excite
              and delight audiences across web 2, web 3 and the rest.
            </p>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection id="team" className="bg-pink py-16 px-10 sm:px-16 2xl:px-0">
          <div className="mx-auto flex max-w-screen-2xl flex-col">
            <h2 className="font-gmcafe text-5xl uppercase text-white">Team</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {members.map((member) => (
                <MemberCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-white py-16 px-10 sm:px-16 2xl:px-0">
          <div className="mx-auto max-w-screen-2xl flex-col">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">FAQ</h2>
            <div className="mt-10">
              <Disclosure question="How big is the collection?" answer="250k sneks" />
            </div>
            <div className="mt-10">
              <Disclosure question="How big is the collection?" answer="250k sneks" />
            </div>
            <div className="mt-10">
              <Disclosure question="How big is the collection?" answer="250k sneks" />
            </div>
            <div className="mt-10">
              <Disclosure question="How big is the collection?" answer="250k sneks" />
            </div>
            <div className="mt-10">
              <Disclosure question="How big is the collection?" answer="250k sneks" />
            </div>
            <div className="mt-10">
              <Disclosure question="How big is the collection?" answer="250k sneks" />
            </div>
          </div>
        </AnimatedPageSection>
      </main>
      <footer className="flex h-24 w-full items-center justify-center bg-gray-100 py-20">
        <div className="w-36">
          <Logo color="#D1D5DB" />
        </div>
      </footer>
    </>
  );
};

export default Home;
