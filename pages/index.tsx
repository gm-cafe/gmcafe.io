// next/image over optimizes banner image on mobile
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import Image from 'next/image';
import mooPeek from '../public/moo_peek.png';
import randy from '../public/randy.png';
import genesisHighland from '../public/genesis_highland.png';
import phase2Brewing from '../public/phase2_brewing.png';
import faq from '../public/faq.png';
import squiggle from '../public/svgs/squiggle.svg';
import lockEm from '../public/lock_em.png';
import AnimatedPageSection from '../components/AnimatedPageSection';
import Head from 'next/head';
import Logo from '../components/Logo';
import Marquee from '../components/Marquee';
import Disclosure from '../components/Disclosure';
import Link from 'next/link';
import MemberCard, { members } from '../components/MemberCard';

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
            <div className="mx-auto w-[28rem] shrink-0 translate-y-[63px]">
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
        <section className="bg-two-tone-gray overflow-x-hidden">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 flex h-full">
              <div className="relative my-28 flex-1">
                <Image
                  src={genesisHighland}
                  layout="fill"
                  alt="Genesis Highland"
                  objectFit="contain"
                />
              </div>
              <div className="h-full w-16 translate-x-10 bg-[url('/svgs/squiggle.svg')] bg-contain bg-right bg-no-repeat" />
            </div>
            <div className="col-span-1 bg-gray-100 py-12 px-24 md:col-span-2 md:py-20">
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
                  className="rounded-full bg-pink px-4 pt-1 pb-0.5 font-gmcafe text-3xl uppercase text-white"
                  target="_blank"
                  rel="noreferrer"
                  href="https://etherscan.io"
                >
                  Cow Contract
                </a>
                <a
                  className="rounded-full bg-pink px-4 pt-1 pb-0.5 font-gmcafe text-3xl uppercase text-white"
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
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 flex h-full">
              <div className="relative my-32 flex-1">
                <Image
                  src={phase2Brewing}
                  layout="fill"
                  alt="Phase 2 Brewing"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-32 translate-x-20">
                <Image src={squiggle} layout="fill" objectFit="fill" alt="" />
              </div>
            </div>
            <div className="col-span-1 bg-gray-100 py-12 px-24 md:col-span-2 md:py-20">
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
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 flex h-full">
              <div className="relative my-32 flex-1">
                <Image src={lockEm} layout="fill" alt="Lock 'em in the Barn" objectFit="contain" />
              </div>
              <div className="relative w-32 translate-x-20">
                <Image src={squiggle} layout="fill" objectFit="fill" alt="" />
              </div>
            </div>
            <div className="col-span-1 bg-purple py-12 px-24 md:col-span-2 md:py-20">
              <h2 className="font-gmcafe text-5xl uppercase text-white">Moogration</h2>
              <p className="mt-6 text-lg font-medium text-white">
                We started our NFT journey here in the cafe as pure artistic expression, built upon
                the OpenSeas (ERC-1115) contract. Since then, we’ve all made many new friends and as
                a group investigated the best way to grow as a herd. It’s time to stand on our own
                four hooves.
              </p>
              <p className="mt-6 text-lg font-medium text-white">
                Over the coming weeks we will be executing our MOOgration from the existing basic
                contract supplied by OpenSea to our own ERC-712 GMOO contract, complete with
                additional features like “Barn Safety”, where moos can be safely &quot;locked
                up&quot; to help prevent theft.
              </p>
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-two-tone-gray overflow-x-hidden">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 flex h-full">
              <div className="relative my-48 flex-1">
                <Image src={faq} layout="fill" alt="FAQ" objectFit="contain" />
              </div>
              <div className="relative w-32 translate-x-20">
                <Image src={squiggle} layout="fill" objectFit="fill" alt="" />
              </div>
            </div>
            <div className="col-span-1 bg-gray-100 py-12 px-24 md:col-span-2 md:py-20">
              <Disclosure question="How can I get a Genesis Moo?">
                <p>
                  You can currently purchase Moos on
                  <a
                    className="ml-1.5 underline"
                    href="https://opensea.io/collection/goodmorningcafe"
                  >
                    OpenSea
                  </a>
                  . Once we migrate the Moos to their own contract, you&apos;ll be able to purchase
                  them across other marketplaces.
                </p>
                <p>
                  If you&apos;re interested in a custom Moo, you can open up a ticket in our
                  <a className="ml-1.5 mr-0.5 underline" href="https://discord.gg/gmcafe">
                    Discord
                  </a>
                  for information on pricing, etc.
                </p>
              </Disclosure>
              <Disclosure question="Will Moos be migrated to their own contract at some point?">
                <p>
                  Yes! We are almost set to start migrating. Head over to
                  <Link href="/checkin">
                    <a className="ml-1.5 mr-0.5 underline">Check In</a>
                  </Link>
                  for more details.
                </p>
              </Disclosure>
              <Disclosure question="What rights do I have to my Moo?">
                <p>???</p>
              </Disclosure>
              <Disclosure question="Is there a roadmap?">
                <p>
                  Does soft and tender moo art count? Let’s just say that we are creating a “new
                  menu” and it looks delicious. Stay close to
                  <a className="ml-1.5 mr-1 underline" href="https://twitter.com/gmcafeNFT">
                    Twitter
                  </a>
                  and
                  <a className="ml-1.5 mr-1 underline" href="https://discord.gg/gmcafe">
                    Discord
                  </a>
                  for announcements.
                </p>
              </Disclosure>
              <Disclosure question="When will Phase 2 launch?">
                <p>
                  Soon. Keep an eye on our
                  <a className="ml-1.5 mr-1 underline" href="https://twitter.com/gmcafeNFT">
                    Twitter
                  </a>
                  and
                  <a className="ml-1.5 mr-1 underline" href="https://discord.gg/gmcafe">
                    Discord
                  </a>
                  for updates.
                </p>
              </Disclosure>
              <Disclosure question="Will holding a Moo give perks for Phase 2?">
                <p>Yes! Mooooooooore details soon.</p>
              </Disclosure>
            </div>
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
        {/* <AnimatedPageSection className="bg-white py-4 2xl:px-0">
          <Marquee direction="left" />
          <Marquee direction="right" />
        </AnimatedPageSection>
        <AnimatedPageSection className="overflow-x-hidden bg-pink py-12 md:py-20">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center justify-center gap-16 px-10 sm:px-16 md:grid-cols-3 2xl:px-0">
            <div className="col-span-1 mx-16 overflow-hidden rounded-full md:mx-8">
              <Image src={moo} layout="responsive" alt="Moo" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-gmcafe text-5xl uppercase text-white">Genesis Collection</h2>
              <p className="mt-6 text-lg font-medium text-white">
                It is said that each Highland Cow chooses its owner using an unrelenting series of
                vacant stares and whispered moos that connects deeply with the inner personality of
                the beholder. Your Moo is your membership to “The Herd” - a succulent group of 333
                similarly minded individuals all MOOving together.
              </p>
              <p className="mt-6 text-lg font-medium text-white">
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
              <p className="mt-6 text-lg font-medium text-purple">
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
            <div className="col-span-1 row-start-1 mx-16 overflow-hidden rounded-full md:col-start-3 md:mx-8">
              <Image src={keeku} layout="responsive" alt="Keeku" />
            </div>
          </div>
        </AnimatedPageSection>
        <AnimatedPageSection className="bg-gray-50 py-12 md:py-20">
          <div className="mx-auto max-w-screen-2xl px-10 sm:px-16 md:grid-cols-5 2xl:px-0">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">Utility</h2>
            <p className="mt-6 text-lg font-medium text-purple">
              What about Utility?! “What sort of utility is more advantageous than cuteness”, I hear
              you say. We wholeheartedly agree. As we look forward to our MOOgration from our
              existing ERC1155 to our own ERC721 contract, we’re exploring many concepts and ideas
              such as holding our Moos in a safe barn to gain access to limited MooMerch, exclusive
              to loyal holders.
            </p>
            <p className="mt-6 text-lg font-medium text-purple">
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
        <AnimatedPageSection className="flex flex-col gap-8 bg-white md:flex-row md:gap-12">
          <div className="clip-home-section h-24 w-full bg-purple pl-10 md:h-auto md:w-2/5"></div>
          <div className="mx-auto max-w-screen-2xl flex-1 flex-col pb-16 md:py-16">
            <div className="mt-10">
              <Disclosure question="How can I get a Genesis Moo?">
                <p>
                  You can currently purchase Moos on
                  <a
                    className="ml-1.5 underline"
                    href="https://opensea.io/collection/goodmorningcafe"
                  >
                    OpenSea
                  </a>
                  . Once we migrate the Moos to their own contract, you&apos;ll be able to purchase
                  them across other marketplaces.
                </p>
                <p>
                  If you&apos;re interested in a custom Moo, you can open up a ticket in our
                  <a className="ml-1.5 mr-0.5 underline" href="https://discord.gg/gmcafe">
                    Discord
                  </a>
                  for information on pricing, etc.
                </p>
              </Disclosure>
              <Disclosure question="Will Moos be migrated to their own contract at some point?">
                <p>
                  Yes! We are almost set to start migrating. Head over to
                  <Link href="/checkin">
                    <a className="ml-1.5 mr-0.5 underline">Check In</a>
                  </Link>
                  for more details.
                </p>
              </Disclosure>
              <Disclosure question="What rights do I have to my Moo?">
                <p>???</p>
              </Disclosure>
              <Disclosure question="Is there a roadmap?">
                <p>
                  Does soft and tender moo art count? Let’s just say that we are creating a “new
                  menu” and it looks delicious. Stay close to
                  <a className="ml-1.5 mr-1 underline" href="https://twitter.com/gmcafeNFT">
                    Twitter
                  </a>
                  and
                  <a className="ml-1.5 mr-1 underline" href="https://discord.gg/gmcafe">
                    Discord
                  </a>
                  for announcements.
                </p>
              </Disclosure>
              <Disclosure question="When will Phase 2 launch?">
                <p>
                  Soon. Keep an eye on our
                  <a className="ml-1.5 mr-1 underline" href="https://twitter.com/gmcafeNFT">
                    Twitter
                  </a>
                  and
                  <a className="ml-1.5 mr-1 underline" href="https://discord.gg/gmcafe">
                    Discord
                  </a>
                  for updates.
                </p>
              </Disclosure>
              <Disclosure question="Will holding a Moo give perks for Phase 2?">
                <p>Yes! Mooooooooore details soon.</p>
              </Disclosure>
            </div>
          </div>
        </AnimatedPageSection> */}
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
