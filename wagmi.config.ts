import { defineConfig } from "@wagmi/cli"
import { etherscan } from "@wagmi/cli/plugins"
import { mainnet } from "wagmi/chains"

export default defineConfig({
  out: "src/wagmi/generated.ts",
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [{
        name: "GMOO",
        address: "0xE43D741e21d8Bf30545A88c46e4FF5681518eBad"
      }, {
        name: "KEEK",
        address: "0x01298589d7c2bD82f54Ca84060d58967772123F2"
      }]
    })
  ]
})
