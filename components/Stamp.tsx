import Image from 'next/image';
import { useState } from 'react';
import { AES } from 'crypto-js';

import stamp from '../public/stamp.png';

const passphrase = 'benjaneloopraffy';

type Props = {
  id: number;
};

const Stamp = ({ id }: Props) => {
  const [clicked, setClicked] = useState(false);
  const [discordName, setDiscordName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const encryptValue = AES.encrypt(`grawr/${id}/${discordName}/${Date.now()}`, passphrase);

  return (
    <div className="flex w-full justify-end md:col-span-2">
      {!clicked && (
        <div
          onClick={() => setClicked(true)}
          className="hover:scale-120 absolute -right-8 bottom-0 w-28 cursor-pointer transition-transform hover:scale-125 md:w-36"
        >
          <Image src={stamp} alt="Stamp" />
        </div>
      )}
      {clicked && (
        <div className="w-full md:max-w-sm">
          <p className="font-gmcafe text-lg text-purple">You Found Me!</p>
          {!submitted && (
            <div className="flex flex-col">
              <p className="font-gmcafe text-lg text-purple">Paste your Discord Username Here:</p>
              <input
                className="mb-4 rounded border-2 border-purple px-2 py-1 text-purple placeholder:text-purple-light focus:outline-none"
                placeholder="BenColefax#0001"
                value={discordName}
                onChange={(e) => setDiscordName(e.target.value)}
              />
              <div>
                <button
                  className="rounded-lg bg-purple px-2 font-gmcafe text-lg text-white"
                  onClick={() => setSubmitted(true)}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {submitted && (
            <div>
              <p className="text-purple">Here&apos;s your secret code:</p>
              <p className="text-gmcafe break-all font-gmcafe text-lg text-purple underline">
                {encryptValue.toString()}
              </p>
              <p className="text-purple">
                First 20 people who finds this will receive 1 Stamp. Tag{' '}
                <span className="font-gmcafe">@Loop</span> in #social-chat with your secret message!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stamp;
