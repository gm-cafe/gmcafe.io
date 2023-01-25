import { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode | ReactNode[];
};

const AnchorLink = ({ href, children }: Props) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default AnchorLink;
