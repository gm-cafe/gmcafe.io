type Props = {
  advance: (_steps?: number) => void;
};

const Story = ({ advance }: Props) => {
  return (
    <div className="mb-36 mt-4 flex w-full flex-grow flex-col items-center gap-4">
      <p className="rounded-lg bg-white p-4 text-purple">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Est lorem ipsum dolor sit amet. Elementum curabitur vitae
        nunc sed velit dignissim. Amet justo donec enim diam vulputate ut pharetra. Sem et tortor
        consequat id porta. Lacus viverra vitae congue eu consequat ac felis. Pulvinar sapien et
        ligula ullamcorper malesuada proin libero nunc. Quis hendrerit dolor magna eget.
      </p>
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
