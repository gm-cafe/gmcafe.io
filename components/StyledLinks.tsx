import Link from 'next/link';
import { ReactNode } from 'react';

export const Discord = () => {
  return (
    <a
      className="font-semibold text-discord underline underline-offset-4"
      href="https://discord.gg/gmcafe"
      rel="noreferrer"
      target="_blank"
    >
      Discord
    </a>
  );
};

export const Twitter = () => {
  return (
    <a
      className="font-semibold text-twitter underline underline-offset-4"
      href="https://twitter.com/gmcafeNFT"
      rel="noreferrer"
      target="_blank"
    >
      Twitter
    </a>
  );
};

export const OpenSea = () => {
  return (
    <a
      className="font-semibold text-opensea underline underline-offset-4"
      href="https://opensea.io/collection/goodmorningcafe"
      rel="noreferrer"
      target="_blank"
    >
      OpenSea
    </a>
  );
};

type InternalProps = {
  href: string;
  children: ReactNode | ReactNode[];
};

export const Internal = ({ href, children }: InternalProps) => {
  return (
    <Link href={href}>
      <a className="font-semibold underline underline-offset-4">{children}</a>
    </Link>
  );
};
