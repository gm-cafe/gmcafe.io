import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Choose from '../components/influence/Choose';
import Commit from '../components/influence/Commit';
import Connect from '../components/influence/Connect';
import List from '../components/influence/List';
import Success from '../components/influence/Success';
import useContractRead from '../lib/hooks/useContractRead';
import { keekABI, keekContract } from '../lib/util/addresses';
import { Choice, KeekuInfo, Options, Preference, requestDrop } from '../lib/util/mint';

const parseKeekData = (s: string): KeekuInfo => {
  /*
	//               TD_OWNER_SHIFT    =   0; // 0x000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF 160
	uint256 constant TD_BLOCK_SHIFT    = 160; // 0x0000000000000000FFFFFFFF0000000000000000000000000000000000000000  32
	uint256 constant TD_TRANSFER_SHIFT = 192; // 0x00000000FFFFFFFF000000000000000000000000000000000000000000000000  32
	uint256 constant TD_TAG_SHIFT      = 224; // 0x00007FFF00000000000000000000000000000000000000000000000000000000  15
	uint256 constant TD_LOCK_BIT       =         0x0000800000000000000000000000000000000000000000000000000000000000;//1
	uint256 constant TD_PREF_SHIFT     = 240; // 0x000F000000000000000000000000000000000000000000000000000000000000   4
	uint256 constant TD_TOKEN_SHIFT    = 244; // 0xFFF0000000000000000000000000000000000000000000000000000000000000  12
	uint256 constant TD_COPY_MASK      =         0xFFFF000000000000000000000000000000000000000000000000000000000000;
	*/
  const owner: `0x${string}` = `0x${s.slice(26, 66)}`;
  const block = parseInt(s.slice(18, 26), 16);
  const transfers = parseInt(s.slice(10, 18), 16);
  const temp = parseInt(s.slice(6, 10), 16);
  const tag = temp & 0x7fff;
  const locked = (temp & 0x8000) > 0;
  const pref = parseInt(s[5], 16);
  const token = parseInt(s.slice(2, 5), 16);

  return { token, pref, tag, transfers, block, owner, locked };
};

const useKeeks = (address?: string) => {
  const { data } = useContractRead({
    addressOrName: keekContract,
    contractInterface: keekABI,
    functionName: 'keeksFromSlice',
    args: [0, 387],
    enabled: !!address,
  });

  const all = data ? data.map((d) => parseKeekData(d)) : [];

  return address ? all.filter((a) => a.owner.toLowerCase() === address.toLowerCase()) : [];
};

const InfluencePage: NextPage = () => {
  const { address, isConnected } = useAccount();

  const [step, setStep] = useState(4);
  const advance = (steps = 1) => setStep(step + steps);

  const [token, setToken] = useState<number | undefined>();

  const [options, setOptions] = useState<Options | undefined>();
  const [preference, setPreference] = useState<Preference>([undefined, undefined, undefined]);

  const back = () => {
    setStep(1);
    setToken(undefined);
    setPreference([undefined, undefined, undefined]);
    setOptions(undefined);
  }

  const choose = (idx: 0 | 1 | 2, choice: Choice) =>
    setPreference([
      idx === 0 ? choice : preference[0],
      idx === 1 ? choice : preference[1],
      idx === 2 ? choice : preference[2],
    ]);

  const keeks = useKeeks(address);

  useEffect(() => {
    token && !options && requestDrop(token, setOptions);
  }, [options, token]);

  return (
    <div className="flex h-screen flex-col items-center bg-pink-background px-3 pt-32 pb-12 md:px-4 md:pt-40">
      <div className="mx-auto flex h-full w-full max-w-screen-sm flex-grow flex-col items-center justify-center">
        {step === 0 && <Connect advance={advance} isConnected={isConnected} />}
        {step === 1 && <List advance={advance} keeks={keeks} setToken={setToken} />}
        {step === 2 && (
          <Choose advance={advance} options={options} choose={choose} preference={preference} />
        )}
        {step === 3 && token && (
          <Commit advance={advance} preference={preference} options={options} token={token} />
        )}
        {step === 4 && <Success back={back} />}
      </div>
    </div>
  );
};

export default InfluencePage;
