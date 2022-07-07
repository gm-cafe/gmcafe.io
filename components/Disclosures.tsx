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
          moo. The first way is on the secondary market via <OpenSea />. Once we migrate the
          Highland Cows to their own contract, you&apos;ll be able to purchase them across other
          reputable marketplaces.
        </p>
        <p className="mt-2">
          The second, and only way to still get an original artist-issued Genesis moo, is via
          “Custom Moo”. Custom moos are designed by Ben using your ideas and inspiration and can be
          requested in the #support channel in the <Discord />.
        </p>
      </Disclosure>
      <Disclosure
        index={1}
        open={open}
        setOpen={setOpen}
        question="Will Moos be migrated to their own contract?"
      >
        <p>
          Yes! We are almost set to start migrating. Head over to{' '}
          <Internal href="/checkin">Check In</Internal> for more details.
        </p>
      </Disclosure>
      <Disclosure
        index={2}
        open={open}
        setOpen={setOpen}
        question="What rights do I have to my Moo?"
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
      </Disclosure>
      <Disclosure index={4} open={open} setOpen={setOpen} question="When will Phase 2 launch?">
        <p>
          Phase 2 will soon be added to the menu and we hope it’s delicious. Stay close to{' '}
          <Twitter /> and <Discord /> for announcements and updates.
        </p>
      </Disclosure>
      <Disclosure
        index={5}
        open={open}
        setOpen={setOpen}
        question="Will holding a Moo give perks for Phase 2?"
      >
        <p>
          Emphatically, yes. We have been slowly but surely piecing together more Herd Perks for our
          floofy community using our new contract. MOOoore details soon.
        </p>
      </Disclosure>
    </>
  );
};

export default Disclosures;
