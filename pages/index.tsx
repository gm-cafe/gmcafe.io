// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import MemberCard, { members } from '../components/MemberCard';
import banner from '../public/banner.png';
import cloudsLeft from '../public/clouds_left.png';
import cloudsRight from '../public/clouds_right.png';

const Home: NextPage = () => {
  return (
    <main>
      <section className="relative mx-auto h-mobile w-full max-w-screen-screen md:h-[1000px]">
        <img
          src="banner.png"
          className="block h-full w-full object-cover object-[40%_center] md:hidden"
          alt="Café Banner"
        />
        <Image
          className="hidden md:block"
          src={banner}
          layout="fill"
          alt="Good Morning Café Banner"
          objectFit="cover"
          objectPosition="40% center"
          priority={true}
          quality={100}
        />
        <Image
          src={cloudsLeft}
          layout="fill"
          alt="Clouds Left"
          objectFit="cover"
          objectPosition="left center"
        />
        <Image
          src={cloudsRight}
          layout="fill"
          alt="Clouds Right"
          objectFit="cover"
          objectPosition="right center"
        />
      </section>
      <section className="bg-pink">
        <div className="mx-auto max-w-screen-screen px-10 pt-12 text-xl font-bold text-white screen:px-0">
          Welcome to the world and characters of GMCafé, most succulent and tantalising
          establishment in the metaverse. Come grab a cowffee, chill and unwind in a place where
          art, authenticity and community are still important.
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
