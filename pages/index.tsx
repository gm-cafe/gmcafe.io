// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import MemberCard, { members } from '../components/MemberCard';
import cloudsLeft from '../public/clouds_left.png';
import cloudsRight from '../public/clouds_right.png';
import polaroid from '../public/polaroid.mp4';
import { metadata } from '../lib/constants';

const Home: NextPage = () => {
  const moo = metadata[Math.floor(Math.random() * metadata.length)];
  const phaseTwo = metadata[Math.floor(Math.random() * metadata.length)];

  return (
    <main>
      <section className="w-full bg-banner-repeat bg-contain bg-bottom bg-repeat-x">
        <div className="relative mx-auto h-mobile max-w-screen-screen md:h-[1000px]">
          <img
            src="banner.png"
            className="h-full w-full object-cover screen:object-contain"
            alt="Café Banner"
          />
          <Image src={cloudsLeft} layout="fill" alt="Clouds Left" objectFit="cover" />
          <Image src={cloudsRight} layout="fill" alt="Clouds Right" objectFit="cover" />
        </div>
      </section>
      <section className="bg-pink px-10 py-12 screen:px-0">
        <h2 className="mx-auto max-w-screen-screen text-center font-gmcafe text-4xl text-white md:text-6xl">
          GOOD MORNING CAFE
        </h2>
        <div className="mx-auto max-w-screen-screen pt-4 text-lg font-bold text-white md:text-2xl">
          Welcome to the world and characters of GMCafé, most succulent and tantalising
          establishment in the metaverse. Come grab a cowffee, chill and unwind in a place where
          art, authenticity and community are still important.
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto flex max-w-screen-screen flex-col px-10 py-12 lg:flex-row screen:px-0">
          <div className="flex flex-col justify-center">
            <h1 className="text-left font-gmcafe text-5xl uppercase text-purple">About</h1>
            <p className="text-light-purple mt-4 text-left font-semibold md:text-lg">
              The Good Morning Café is founded on the strong and sturdy pillars of tender cuteness,
              community connection and powerful cowffee. Each of the 333 ‘Genesis’ Highland Cows are
              lovingly drawn into existence by artist, Ben Colefax. It all started as an obsession
              with Parisian macarons, café vibes and the vision of a vast world of characters, all
              converging in one pastel flavoured metaverse café.
            </p>
            <p className="text-light-purple mt-6 text-left font-semibold md:text-lg lg:mt-8">
              It is said that each Highland Cow chooses its owner, using a series of vacant stares
              and whispered moos that connects with the inner personality of the beholder. Your café
              character NFT is your membership to the Herd - a group of similarly minded individuals
              all mooving together.
            </p>
          </div>
          <video
            autoPlay
            loop
            playsInline
            muted
            onContextMenu={(e) => e.preventDefault()}
            className="translate-y-12 md:w-[40rem]"
          >
            <source src={polaroid} />
          </video>
        </div>
      </section>
      <section className="bg-pink">
        <div className="mx-auto flex max-w-screen-screen flex-col items-center px-10 py-12 md:flex-row md:py-20 screen:px-0">
          <div className="mb-12 w-full overflow-hidden rounded-lg md:mb-0 md:mr-12 md:basis-1/5">
            <Image
              src={moo.imageUrl}
              layout="responsive"
              alt={moo.token}
              width={2000}
              height={2000}
            />
          </div>
          <div className="basis-4/5">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">Genesis Collection</h2>
            <p className="mt-6 text-lg font-semibold text-white">
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
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto flex max-w-screen-screen flex-col-reverse items-center px-10 py-12 md:flex-row md:py-20 screen:px-0">
          <div className="basis-4/5">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">Phase Two Collection</h2>
            <p className="mt-6 text-lg font-semibold text-black">
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
          <div className="mb-12 w-full basis-1/5 overflow-hidden rounded-lg md:mb-0 md:ml-12">
            <Image
              src={phaseTwo.imageUrl}
              layout="responsive"
              alt={phaseTwo.token}
              width={2000}
              height={2000}
            />
          </div>
        </div>
      </section>
      <section className="bg-pink py-16 px-10 screen:px-0">
        <div className="mx-auto flex max-w-screen-screen flex-col gap-6 lg:flex-row">
          {members.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
