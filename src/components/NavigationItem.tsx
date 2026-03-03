import Link from 'next/link';
import { ReactNode, Ref } from 'react';

type Props = {
  children: ReactNode | ReactNode[];
  href?: string;
  close?: () => void;
};

export const NavigationItem = (
  { children, href, close }: Props
) => {
  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      className="font-gmcafe uppercase cursor-pointer text-4xl text-center text-purple text-border-white md:text-left md:text-white md:text-2xl md:transition md:duration-500 md:hover:text-pink-light"
      onClick={close}
    >
      {children}
    </Link>
  )
};
