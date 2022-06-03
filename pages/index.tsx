import type { NextPage } from 'next';
import Image from 'next/image';
import banner from '../public/banner.png';
import cloudsLeft from '../public/clouds_left.png'
import cloudsRight from '../public/clouds_right.png'

const Home: NextPage = () => {
  return (
    <main>
      <section className="relative mx-auto h-mobile w-full md:h-[1000px]">
        <Image
          src={banner}
          layout="fill"
          alt="Good Morning Café Banner"
          objectFit="cover"
          objectPosition="40% center"
          priority={true}
          quality={100}
        />
        <Image src={cloudsLeft} layout="fill" alt="Clouds Left" objectFit="cover" objectPosition="left center" />
        <Image src={cloudsRight} layout="fill" alt="Clouds Right" objectFit="cover" objectPosition="right center" />
      </section>
    </main>
  );
};

export default Home;
