import { defineConfig, loadEnv } from '@wagmi/cli';
import { etherscan } from '@wagmi/cli/plugins';
import { mainnet } from 'wagmi';

export default defineConfig(() => {
  loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  return {
    out: 'lib/wagmi/generated.ts',
    contracts: [],
    plugins: [
      etherscan({
        apiKey: process.env.ETHERSCAN_API_KEY!,
        chainId: mainnet.id,
        contracts: [
          {
            name: 'gmoo',
            address: '0xE43D741e21d8Bf30545A88c46e4FF5681518eBad',
          },
          {
            name: 'keek',
            address: '0x01298589d7c2bd82f54ca84060d58967772123f2',
          },
          {
            name: 'redeem',
            address: '0xa25066d7232069489b57db8755d0055ecd69daec',
          },
        ],
      }),
    ],
  };
});
