'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { NavigationItem } from './NavigationItem';
import Link from 'next/link';
import { DiscordIcon, NavigationLogo, OpenSeaIcon, TwitterIcon } from './Icons';
import { useState } from 'react';

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const desktopNavigationItems = (
    <div className="hidden h-16 bg-pink md:block">
      <div className="mx-auto flex h-full max-w-screen-2xl">
        <div className="flex flex-grow basis-0 items-center justify-evenly">
          <NavigationItem href="/">Home</NavigationItem>
          <NavigationItem href="/#faq">FAQ</NavigationItem>
          <NavigationItem href="/#team">Team</NavigationItem>
        </div>
        <div className="w-52" />
        <div className="flex flex-grow basis-0 items-center justify-evenly">
          <NavigationItem href="/dashboard">Dashboard</NavigationItem>
          <NavigationItem href="/traits">Traits</NavigationItem>
          <NavigationItem href="/banners">Banners</NavigationItem>
        </div>
      </div>
    </div>
  );

  const mobileNavigationItems = (
    <div className="flex h-16 justify-end bg-pink px-4 md:hidden">
      <div className="flex items-center">
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <XMarkIcon className="m-1 h-10 w-10 text-white"/>
          ) : (
            <Bars3Icon className="m-1 h-10 w-10 text-white" />
          )}
        </button>
        {open && (
          <div className="mobile-nav-height absolute left-0 top-0 z-20 mt-16 flex w-screen origin-top-right flex-col gap-4 overflow-y-hidden bg-[url('/navigation/mobile_nav.jpg')] bg-cover bg-bottom bg-no-repeat focus:outline-none">
            <div className="h-24 shrink-0">
              <div className="h-full flex-grow bg-[url('/navigation/awning.svg')] bg-repeat-x">
                <div className="h-[5px] w-full bg-purple opacity-30" />
              </div>
            </div>
            <NavigationItem href="/" close={close}>
              Home
            </NavigationItem>
            <NavigationItem href="/#faq" close={close}>
              FAQ
            </NavigationItem>
            <NavigationItem href="/#team" close={close}>
              Team
            </NavigationItem>
            <NavigationItem href="/dashboard" close={close}>
              Dashboard
            </NavigationItem>
            <NavigationItem href="/traits" close={close}>
              Traits
            </NavigationItem>
            <NavigationItem href="/banners" close={close}>
              Banners
            </NavigationItem>
            <div className="flex justify-center space-x-3">
              <a
                className="flex h-10 w-10 items-center rounded-full bg-white p-1.5"
                href="https://discord.gg/ABh8f99hBV"
              >
                <DiscordIcon fill="#8946ab" />
              </a>
              <a
                className="flex h-10 w-10 items-center rounded-full bg-white p-1.5"
                href="https://twitter.com/gmcafeNFT"
              >
                <TwitterIcon fill="#8946ab" />
              </a>
              <a
                className="flex h-10 w-10 items-center rounded-full bg-white p-1.5"
                href="https://opensea.io/collection/goodmorningcafe"
              >
                <OpenSeaIcon fill="#8946ab" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <nav className="absolute z-30 flex w-full flex-col">
      {desktopNavigationItems}
      {mobileNavigationItems}
      <Link href="/" className="absolute left-0 right-0 z-20 mx-auto" onClick={close}>
        <NavigationLogo className="absolute left-0 right-0 z-20 mx-auto h-32" />
      </Link>
      <div className="absolute bottom-0 h-1.5 w-full translate-y-1.5 bg-purple opacity-30 md:hidden" />
      <div className="absolute bottom-0 z-10 hidden h-20 w-full translate-y-20 md:flex">
        <div className="flex-grow bg-[url('/navigation/awning.svg')] bg-[length:auto_100%] bg-right bg-repeat-x">
          <div className="h-[5px] w-full bg-purple opacity-30" />
        </div>
        <div className="flex-grow bg-[url('/navigation/awning.svg')] bg-[length:auto_100%] bg-repeat-x">
          <div className="h-[5px] w-full bg-purple opacity-30" />
        </div>
      </div>
    </nav>
  );
};
