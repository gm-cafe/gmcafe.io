// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import MemberCard, { members } from '../components/MemberCard';
import cloudsLeft from '../public/clouds_left.png';
import cloudsRight from '../public/clouds_right.png';
import polaroid from '../public/polaroid.mp4';
import AnimatedPageSection from '../components/AnimatedPageSection';
import Marquee from '../components/Marquee';

const Home: NextPage = () => {
  return (
    <main>
      <AnimatedPageSection className="w-full bg-banner-repeat bg-contain bg-bottom bg-repeat-x">
        <div className="relative mx-auto h-mobile max-w-screen-screen md:h-[1000px]">
          <img
            src="banner.png"
            className="h-full w-full object-cover 2xl:object-contain"
            alt="Café Banner"
          />
          <Image src={cloudsLeft} layout="fill" alt="Clouds Left" objectFit="cover" />
          <Image src={cloudsRight} layout="fill" alt="Clouds Right" objectFit="cover" />
        </div>
      </AnimatedPageSection>
      <AnimatedPageSection className="bg-white px-16 py-12 2xl:px-0">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="font-gmcafe text-4xl uppercase text-purple md:text-5xl">
            Good Morning, Patron!
          </h2>
          <p className="pt-4 text-lg font-bold text-purple md:text-xl">
            Welcome to the world and characters of GMCafé, most succulent and tantalising
            establishment in the metaverse. Come grab a cowffee, chill and unwind in a place where
            art, authenticity and community are still important.
          </p>
          <div className="mx-auto mt-2 grid max-w-screen-2xl">
            <div className="inline-flex flex-col justify-self-end">
              <span className="text-lg font-bold text-purple md:text-xl">Love,</span>
              <span className="font-gmcafe text-2xl text-purple md:text-3xl">Ben Colefax</span>
            </div>
          </div>
        </div>
      </AnimatedPageSection>
      <AnimatedPageSection className="bg-pink px-16 py-12 md:py-20 2xl:px-0">
        <div className="mx-auto flex max-w-screen-2xl flex-col justify-center">
          <h1 className="text-left font-gmcafe text-5xl uppercase text-white">About</h1>
          <p className="mt-4 text-left font-semibold text-white md:text-lg">
            The Good Morning Café is founded on the strong and sturdy pillars of tender cuteness,
            community connection and powerful cowffee. Each of the 333 ‘Genesis’ Highland Cows are
            lovingly drawn into existence by artist, Ben Colefax. It all started as an obsession
            with Parisian macarons, café vibes and the vision of a vast world of characters, all
            converging in one pastel flavoured metaverse café.
          </p>
          <p className="mt-6 text-left font-semibold text-white md:text-lg lg:mt-8">
            It is said that each Highland Cow chooses its owner, using a series of vacant stares and
            whispered moos that connects with the inner personality of the beholder. Your café
            character NFT is your membership to the Herd - a group of similarly minded individuals
            all mooving together.
          </p>
        </div>
      </AnimatedPageSection>
      <AnimatedPageSection className="bg-white py-10 2xl:px-0">
        <Marquee direction="left" />
        <Marquee direction="right" />
      </AnimatedPageSection>
      <AnimatedPageSection className="bg-pink">
        <div className="mx-auto max-w-screen-2xl px-16 py-12 md:py-20 2xl:px-0">
          <h2 className="font-gmcafe text-5xl uppercase text-white">Genesis Collection</h2>
          <p className="mt-6 text-lg font-semibold text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in.
            Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Non tellus orci ac
            auctor augue mauris augue neque gravida. Posuere ac ut consequat semper. Leo integer
            malesuada nunc vel risus commodo viverra maecenas. Ultrices sagittis orci a scelerisque
            purus semper eget. Justo nec ultrices dui sapien eget mi. In eu mi bibendum neque
            egestas congue quisque egestas diam. Arcu vitae elementum curabitur vitae nunc sed velit
            dignissim. Aliquet lectus proin nibh nisl condimentum id venenatis a. Arcu non odio
            euismod lacinia at. A diam maecenas sed enim ut sem viverra. Viverra orci sagittis eu
            volutpat odio facilisis mauris sit. Dignissim convallis aenean et tortor at risus
            viverra. Proin libero nunc consequat interdum varius sit.
          </p>
        </div>
      </AnimatedPageSection>
      <AnimatedPageSection className="bg-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-16 md:flex-row 2xl:px-0">
          <div className="basis-3/5">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">Phase Two</h2>
            <p className="mt-6 text-lg font-semibold text-purple">
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
          <div className="w-full basis-2/5 overflow-hidden rounded-lg md:mb-0 md:ml-12">
            <video
              autoPlay
              loop
              playsInline
              muted
              onContextMenu={(e) => e.preventDefault()}
              className="md:translate-y-12"
            >
              <source src={polaroid} />
            </video>
          </div>
        </div>
      </AnimatedPageSection>
      <AnimatedPageSection className="bg-pink py-16 px-16 2xl:px-0">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 lg:flex-row">
          {members.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </AnimatedPageSection>
    </main>
  );
};

export default Home;
