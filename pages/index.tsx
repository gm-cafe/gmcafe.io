// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import MemberCard, { members } from '../components/MemberCard';
import cloudsLeft from '../public/clouds_left.png';
import cloudsRight from '../public/clouds_right.png';
import polaroid from '../public/polaroid.mp4';

const Home: NextPage = () => {
  return (
    <main>
      <section className="w-full bg-banner-repeat bg-contain bg-bottom bg-repeat-x">
        <div className="relative mx-auto h-mobile max-w-screen-screen md:h-[1000px]">
          <img src="banner.png" className="h-full w-full object-contain" alt="Café Banner" />
          <Image src={cloudsLeft} layout="fill" alt="Clouds Left" objectFit="contain" />
          <Image src={cloudsRight} layout="fill" alt="Clouds Right" objectFit="contain" />
        </div>
      </section>
      <section className="bg-pink">
        <div className="mx-auto max-w-screen-screen px-10 py-12 text-xl font-bold text-white screen:px-0">
          Welcome to the world and characters of GMCafé, most succulent and tantalising
          establishment in the metaverse. Come grab a cowffee, chill and unwind in a place where
          art, authenticity and community are still important.
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto flex max-w-screen-screen flex-col px-10 py-12 md:flex-row screen:px-0">
          <div className="flex flex-col justify-center">
            <h1 className="text-left text-2xl font-semibold text-purple lg:text-4xl">About</h1>
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
            className="translate-y-12 md:w-[28rem]"
          >
            <source src={polaroid} />
          </video>
        </div>
      </section>
      <section className="bg-pink py-10 px-10 screen:px-0">
        <div className="mx-auto flex max-w-screen-screen flex-col gap-6 md:flex-row">
          {members.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
