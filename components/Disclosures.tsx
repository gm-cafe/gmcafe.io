import { useState } from 'react';
import Disclosure from './Disclosure';
import { Discord, Internal, OpenSea, Twitter } from './StyledLinks';

const Disclosures = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Disclosure index={0} open={open} setOpen={setOpen} question="How can I get a Genesis Moo?">
        <p>
          There are currently two ways now to obtain a moo and only one way to get an artist-issued
          moo. The first way is on the secondary market via <OpenSea />.
        </p>
        <p className="mt-2">
          The second, and only way to still get an original artist-issued Genesis moo, is via
          “Custom Moo”. Custom moos are designed by Ben using your ideas and inspiration and can be
          requested in the #support channel in the <Discord />.
        </p>
      </Disclosure>
      <Disclosure index={1} open={open} setOpen={setOpen} question="How do I migrate my Moo?">
        <p>
          Visit the <Internal href="/migrate">migration page</Internal> if you haven&apos;t yet
          moograted!
        </p>
      </Disclosure>
      <Disclosure
        index={2}
        open={open}
        setOpen={setOpen}
        question="What rights do I have to my Moo and Keek?"
      >
        <p>You are free to use your moo for personal use!</p>
        <p className="mt-2">
          For commercial use, there are some limitations.{' '}
          <Internal href="/rights">Learn More</Internal>
        </p>
      </Disclosure>
      <Disclosure index={3} open={open} setOpen={setOpen} question="Is there a roadmap?">
        <p>
          Does soft and tender moo art count? Let’s just say that the GMCafé team and community is
          continually creating and shaping this world as we go. Ben has been building this character
          set for over 10 years, so roadmaps are less important when basically your whole career has
          been dedicated to it.
        </p>
        <p className="mt-2">
          Our only realistic promise is original and passionate artistic expression and being part
          of this new phase of popular art culture.
        </p>
        <p className="mt-2">
          However, we have quite a few things in the pipeline:
          <ul className="list-inside list-disc">
            <li>Access to Ben's soon-to-be refreshed online drawing course</li>
            <li>Merch - we already have samples for plushies and hoodies!</li>
            <li>Trait-based art drops</li>
            <li>Dynamic NFTs with trait customisation</li>
            <li>Live streams, from art classes to simple hangouts</li>
          </ul>
        </p>
      </Disclosure>
    </>
  );
};

export default Disclosures;
