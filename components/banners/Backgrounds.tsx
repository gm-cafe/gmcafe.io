import Image from 'next/image';

const backgrounds = [
  { file: 'gm_pink.png', alt: 'GM Pink Background' },
  { file: 'gm_purple.png', alt: 'GM Purple Background' },
  { file: 'moo_pink.png', alt: 'Moo Pink Background' },
  { file: 'moo_purple.png', alt: 'Moo Purple Background' },
  { file: 'plain_light_pink.png', alt: 'Plain Light Pink Background' },
  { file: 'plain_pink.png', alt: 'Plain Pink Background' },
  { file: 'spots_pink.png', alt: 'Pink Spots Background' },
];

type Props = {
  changeBackground: (_file: string) => void;
};

const Backgrounds = ({ changeBackground }: Props) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-white p-4">
      <h2 className="border-b border-purple-light font-gmcafe text-2xl uppercase text-purple">
        Backgrounds
      </h2>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {backgrounds.map(({ file, alt }) => (
          <div className="flex" key={file} onClick={() => changeBackground(`/banners/${file}`)}>
            <Image src={`/banners/${file}`} width={900} height={300} alt={alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backgrounds;
