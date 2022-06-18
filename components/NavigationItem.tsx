import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode, MouseEvent, forwardRef, Ref } from 'react';

type NavItemProps = {
  children: ReactNode | ReactNode[];
  href?: string;
  type?: 'desktop' | 'mobile';
  close?: () => void;
};

const NavigationItem = (
  { children, href, type = 'desktop', close }: NavItemProps,
  ref: Ref<HTMLAnchorElement>
) => {
  const isAnchor = href && href.startsWith('#');
  const isInternalLink = href && href.startsWith('/');

  const anchorOnClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    href && document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    close && close();
  };

  const className = classNames(
    'font-gmcafe uppercase',
    { 'text-xl text-white transition duration-500 hover:text-pink-light': type === 'desktop' },
    { 'p-4 text-center text-2xl text-purple': type === 'mobile' },
    { 'cursor-pointer': isAnchor }
  );

  const nextLink = (href: string) => (
    <Link href={href}>
      <a className={className} ref={ref} onClick={close}>
        {children}
      </a>
    </Link>
  );

  const anchorTag = (href: string) => (
    <a
      className={className}
      href={isAnchor ? undefined : href}
      onClick={isAnchor ? anchorOnClick : undefined}
    >
      {children}
    </a>
  );

  if (!href) {
    return null;
  }

  return isInternalLink ? nextLink(href) : anchorTag(href);
};

export default forwardRef(NavigationItem);
