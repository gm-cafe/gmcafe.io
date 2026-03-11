import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import AnchorLink from '@/src/components/AnchorLink';
import Marquee from '@/src/components/Marquee';
import MemberCard, { members } from '@/src/components/MemberCard';

import mooPeek from '@/public/home/welcome/moo_peek.png';
import randy from '@/public/home/welcome/randy_sparkle.png';
import genesisHighland from '@/public/home/moos/genesis_highland.png';
import keekusaurs from '@/public/home/keeks/keekusaurs.png';
import coffeeSpill from '@/public/home/moo-lock/coffee_spill.png';
import lockEm from '@/public/home/moo-lock/lock_em.png';
import cowla from '@/public/home/faq/cowla.png';
import faqImage from '@/public/home/faq/faq.png';
import egg from '@/public/home/team/egg.png';
import highFive from '@/public/home/footer/high_five.png';

export default function Home() {
  return (
    <div id="home" className="scroll-smooth pt-16">

      {/* Hero */}
      <section className="relative w-full bg-banner-repeat">
        <div className="relative mx-auto h-[60vh] max-h-[1000px] max-w-screen-2xl md:mt-12 md:h-auto">
          {/* next/image over-optimizes banner on mobile */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/home/hero/banner.jpg"
            className="h-full max-h-[600px] w-full object-cover object-bottom md:object-contain 2xl:max-h-[1000px]"
            alt="Café Banner"
          />
        </div>
        <div className="absolute top-0 hidden h-[125%] w-full min-w-[500px] flex-1 justify-center overflow-hidden md:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="max-w-[800px]" src="/home/hero/clouds_left.png" alt="Clouds Left" />
          <div className="min-w-[500px] flex-1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="max-w-[800px]" src="/home/hero/clouds_right.png" alt="Clouds Right" />
        </div>
      </section>

      {/* Howdy / Welcome */}
      <section className="bg-pink px-10 pb-4 pt-10 sm:px-16 2xl:px-0 2xl:pt-0">
        <div className="mx-auto flex max-w-screen-2xl flex-col-reverse xl:flex-row xl:gap-16">
          <div className="z-20 mx-auto w-72 shrink-0 translate-y-[49px] sm:w-[28rem] sm:translate-y-[67.5px]">
            <Image src={mooPeek} className="w-full h-auto" alt="Moo Peek" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-gmcafe text-8xl uppercase text-white">Howdy!</h2>
            <h1 className="font-gmcafe text-5xl text-white">
              Welcome to the characters of the Good Morning Café!
            </h1>
          </div>
          <div className="hidden w-48 shrink-0 translate-y-[130px] xl:block">
            <Image src={randy} className="w-full h-auto" alt="Randy" />
          </div>
        </div>
      </section>

      {/* The Moos */}
      <section className="bg-two-tone-gray overflow-hidden">
        <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
          <div className="hidden h-full bg-white md:flex">
            <div className="z-10 flex h-full flex-1 items-center bg-white">
              <div className="w-60 xl:w-80 2xl:w-88">
                <Image src={genesisHighland} className="w-full h-auto" alt="Genesis Highlands" />
              </div>
            </div>
            <div className="squiggle hidden min-w-[60px] border-r border-gray-100 bg-gray-100 md:block" />
          </div>
          <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 py-12 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">The Moos</h2>
            <p className="mt-6 font-medium text-purple xl:text-lg">
              It is said that each Highland Cow chooses its owner using a sophisticated series of
              vacant stares and whispered moos that connects deeply with the inner personality of
              the beholder. Your Moo is your membership to &quot;The Herd&quot; - a succulent group
              of 333 similarly minded individuals all MOOving together.
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
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-white py-4">
        <Marquee direction="left" type="gmoo" />
        <Marquee direction="right" type="keek" />
      </section>

      {/* The Keeks */}
      <section className="bg-two-tone-gray overflow-x-hidden">
        <div className="relative mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
          <div className="hidden h-full bg-white md:flex">
            <div className="z-10 flex h-full flex-1 items-center bg-white">
              <div className="w-60 xl:w-80 2xl:w-88">
                <Image src={keekusaurs} className="w-full h-auto" alt="Keekusaurs" />
              </div>
            </div>
            <div className="squiggle hidden min-w-[51px] border-r border-gray-100 bg-gray-100 md:block" />
          </div>
          <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 py-12 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
            <h2 className="font-gmcafe text-5xl uppercase text-purple">The Keeks</h2>
            <p className="mt-6 font-medium text-purple xl:text-lg">
              These tender Keekusaurs were frozen in mysteriously supercharged ice for a millennia,
              deep in a cave on the GMCafé Estate. After being discovered, the Moos of Kawa Valley
              graciously gave them the clothes (and traits) off their floofy backs and taught them
              to way of the Herd. If you look closely you will find a Keek that resonates with your
              soul and your inner personality. Your Keekusaur is your membership to &quot;The Keek
              Herd&quot; - a succulent group of 3333 similarly minded individuals all RAWRing nobly
              into the ether together.
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
      </section>

      {/* Coffee Spill (decorative) */}
      <div className="relative mx-auto max-w-screen-2xl">
        <div className="absolute -bottom-10 right-4 w-16 sm:bottom-4 sm:right-8 sm:w-24 2xl:right-0">
          <Image src={coffeeSpill} className="w-full h-auto" alt="Coffee Spill" />
        </div>
      </div>

      {/* Moo Lock */}
      <section className="bg-two-tone-purple overflow-x-hidden">
        <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
          <div className="hidden h-full bg-white md:flex">
            <div className="z-10 flex h-full flex-1 items-center bg-white">
              <div className="w-60 xl:w-80 2xl:w-88">
                <Image src={lockEm} className="w-full h-auto" alt="Lock 'Em in the Barn" />
              </div>
            </div>
            <div className="squiggle hidden min-w-[51px] border-r border-purple bg-purple md:block" />
          </div>
          <div className="col-span-1 flex h-full flex-col justify-center bg-purple px-10 py-12 md:col-span-2 md:py-20 md:pl-24 lg:pl-20 lg:pr-10 2xl:px-24">
            <h2 className="font-gmcafe text-5xl uppercase text-white">Moo Lock</h2>
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
              Head over to the{' '}
              <Link href="/dashboard" className="font-semibold underline">
                Dashboard
              </Link>{' '}
              to lock up your Moo and enjoy the peace of mind that your bovine is safe and sound.
            </p>
          </div>
        </div>
      </section>

      {/* Cowla (decorative, anchors FAQ) */}
      <div className="relative z-10 mx-auto max-w-screen-2xl">
        <div
          id="faq"
          className="absolute -top-12 right-4 z-10 w-16 sm:-top-24 sm:right-8 sm:w-28 2xl:right-0"
        >
          <Image src={cowla} className="w-full h-auto" alt="Cowla" />
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-two-tone-gray overflow-x-hidden">
        <div className="mx-auto grid min-h-[480px] max-w-screen-2xl grid-cols-1 items-center justify-center md:grid-cols-3 md:px-10 2xl:px-0">
          <div className="hidden h-full bg-white md:flex">
            <div className="z-10 flex h-full flex-1 items-center bg-white">
              <div className="w-60 xl:w-80 2xl:w-88">
                <Image src={faqImage} className="w-full h-auto" alt="FAQ" />
              </div>
            </div>
            <div className="squiggle hidden min-w-[54px] border-r border-gray-100 bg-gray-100 md:block" />
          </div>
          <div className="col-span-1 flex h-full flex-col justify-center bg-gray-100 px-10 pb-16 pt-12 sm:py-12 md:col-span-2 md:py-20 md:pl-20 lg:pl-14 lg:pr-10 2xl:px-24">
            <details className="group border-b border-purple/20 pb-2">
              <summary className="flex list-none items-start gap-2 py-2 font-gmcafe text-2xl text-purple xl:text-3xl [&::-webkit-details-marker]:hidden">
                <ChevronRightIcon className="mt-1 h-7 w-7 shrink-0 transition-transform group-open:rotate-90" />
                How can I get a Genesis Moo?
              </summary>
              <div className="mb-4 ml-9 text-purple">
                <p>
                  There are currently two ways now to obtain a moo and only one way to get an
                  artist-issued moo. The first way is on the secondary market via{' '}
                  <a
                    className="font-semibold underline"
                    href="https://opensea.io/collection/goodmorningcafe"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenSea
                  </a>
                  .
                </p>
                <p className="mt-2">
                  The second, and only way to still get an original artist-issued Genesis moo, is
                  via &quot;Custom Moo&quot;. Custom moos are designed by Ben using your ideas and
                  inspiration and can be requested in the #support channel in the{' '}
                  <a
                    className="font-semibold underline"
                    href="https://discord.gg/ABh8f99hBV"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Discord
                  </a>
                  .
                </p>
              </div>
            </details>
            <details className="group border-b border-purple/20 pb-2">
              <summary className="flex list-none items-start gap-2 py-2 font-gmcafe text-2xl text-purple xl:text-3xl [&::-webkit-details-marker]:hidden">
                <ChevronRightIcon className="mt-1 h-7 w-7 shrink-0 transition-transform group-open:rotate-90" />
                What rights do I have to my Moo and Keek?
              </summary>
              <div className="mb-4 ml-9 text-purple">
                <p>You are free to use your moo for personal use!</p>
                <p className="mt-2">
                  For commercial use, there are some limitations.{' '}
                  <Link href="/rights" className="font-semibold underline">
                    Learn More
                  </Link>
                </p>
              </div>
            </details>
            <details className="group border-b border-purple/20 pb-2">
              <summary className="flex list-none items-start gap-2 py-2 font-gmcafe text-2xl text-purple xl:text-3xl [&::-webkit-details-marker]:hidden">
                <ChevronRightIcon className="mt-1 h-7 w-7 shrink-0 transition-transform group-open:rotate-90" />
                Is there a roadmap?
              </summary>
              <div className="mb-4 ml-9 text-purple">
                <p>
                  Does soft and tender moo art count? Let&apos;s just say that the GMCafé team and
                  community is continually creating and shaping this world as we go. Ben has been
                  building this character set for over 10 years, so roadmaps are less important
                  when basically your whole career has been dedicated to it.
                </p>
                <p className="mt-2">
                  Our only realistic promise is original and passionate artistic expression and
                  being part of this new phase of popular art culture.
                </p>
                <p className="mt-2">However, we have quite a few things in the pipeline:</p>
                <ul className="mt-1 list-inside list-disc text-purple">
                  <li>Access to Ben&apos;s soon-to-be refreshed online drawing course</li>
                  <li>Merch - we already have samples for plushies and hoodies!</li>
                  <li>Trait-based art drops</li>
                  <li>Dynamic NFTs with trait customisation</li>
                  <li>Live streams, from art classes to simple hangouts</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-pink px-10 py-16 2xl:px-0">
        <div className="relative mx-auto flex max-w-screen-2xl flex-col">
          <div className="absolute right-0 top-0 z-0 w-36 -translate-y-[100px]">
            <Image src={egg} className="w-full h-auto" alt="Egg" />
          </div>
          <h2 className="font-gmcafe text-5xl uppercase text-white">Team</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {members.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative flex w-full items-center justify-center overflow-hidden bg-sky pb-12 pt-4">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-10 sm:flex-row sm:gap-8">
          <div className="flex flex-grow flex-col justify-end">
            <div className="flex gap-4">
              <AnchorLink href="https://discord.gg/ABh8f99hBV">Discord</AnchorLink>
              <AnchorLink href="https://twitter.com/gmcafeNFT">Twitter</AnchorLink>
              <AnchorLink href="https://opensea.io/collection/goodmorningcafe">Moos</AnchorLink>
              <AnchorLink href="https://opensea.io/collection/keeks">Keeks</AnchorLink>
            </div>
            <h2 className="text-border-white mt-2 text-center font-gmcafe text-6xl uppercase leading-none text-purple sm:mb-6 sm:mt-0 sm:text-left sm:text-7xl xl:mb-0 xl:text-9xl 2xl:text-10xl">
              Join the Herd
            </h2>
          </div>
          <div className="w-60 sm:block sm:w-48 md:w-64 xl:w-88 2xl:w-96">
            <Image src={highFive} className="w-full h-auto" alt="Moos High Five" />
          </div>
        </div>
        <div className="absolute bottom-0 flex w-full flex-col justify-end">
          <div className="h-24 w-full translate-y-[1px] bg-[url('/home/footer/fence.png')] bg-[length:300px_auto] bg-bottom bg-repeat-x xl:bg-[length:460px_auto]" />
          <div className="flex h-10 items-end justify-center bg-grass pb-2">
            <p className="text-xs text-purple opacity-30">© 2023 Colefax Corp.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
