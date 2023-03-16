import { defineConfig } from '@wagmi/cli';
import { etherscan } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    etherscan({
      apiKey: 'ZTDMRPHJ1DMMJGZT6AGX1YE5MXAU5294UI',
      chainId: 1,
      contracts: [
        {
          name: 'GMOO',
          address: '0xE43D741e21d8Bf30545A88c46e4FF5681518eBad',
        },
        {
          name: 'Redeem',
          address: '0xa25066d7232069489b57db8755d0055ecd69daec',
        },
      ],
    }),
  ],
});
