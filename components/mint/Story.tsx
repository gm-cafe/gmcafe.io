type Props = {
  advance: (_steps?: number) => void;
};

const Story = ({ advance }: Props) => {
  return (
    <div className="mb-24 mt-4 flex min-h-0 w-full flex-grow flex-col items-center gap-4 md:mb-32">
      <div className="flex flex-col gap-1 md:gap-2 overflow-y-auto rounded-lg bg-white p-4 text-purple text-sm">
        <h1 className="font-gmcafe md:text-xl uppercase">As the Story Goes...</h1>
        <p>
          One glorious morning as a misty haze glistened over the lush green fields of Kawa Valley,
          one inquisitive Moo strayed from the Herd in the café, almost as if something was calling
          him to explore.
        </p>
        <p>
          Trotting out to the far ends of the pastures, he found an opening to a mysterious cave.
          Despite the warning sign, he ventured deep inside. Meanwhile, other Moos were grazing
          nearby when there was an unerring rumbling - they stampeded towards the sound to
          investigate!
        </p>
        <p>
          Crashing through the earth beneath their hooves, the Moos fell into a glittering chamber.
          As the dust settled, there stood a mysterious creature - encapsulated in an ice-like
          substance. Eager to catch a glimpse of the beast, more Moos rushed from the café down into
          the shimmering cave - but as they moved closer, the scattered gems in the walls started to
          react to their presence.
        </p>
        <p>
          Then, in a majestic flash of blinding ethereal light, one of the creatures was free!
          Standing before them, this succulent prehistoric brute let out a tiny sound..
          <b>&quot;Keeku, RAWR!&quot;</b>
        </p>
        <p>
          The Moos clamoured to help the critter with clothing, food and drinks - and from that
          moment on, these strange creatures became known as &apos;Keekusaurs&apos;.
        </p>
        <p>But who can we depend on to care for these magnificent beasts?</p>
      </div>
      <button
        className="rounded-full bg-purple px-4 py-1.5 font-gmcafe text-xl text-white transition-transform hover:scale-105"
        onClick={() => advance()}
      >
        Continue
      </button>
    </div>
  );
};

export default Story;
