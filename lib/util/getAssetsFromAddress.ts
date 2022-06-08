import { BigNumber, ethers } from 'ethers';
import { metadata } from '../constants';
import { Asset } from './types';

const osContract = '0x495f947276749ce646f68ac8c248420045cb7b5e';

const abi = [
  'function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory)',
];

const getAssetsFromAddress = async (
  provider?: ethers.providers.Provider,
  address?: string
): Promise<Asset[]> => {
  if (!provider || !address) {
    return [];
  }

  const contract = new ethers.Contract(osContract, abi, provider);
  const addresses = metadata.map(() => address);
  const tokens = metadata.map((asset) => asset.token);

  const response: BigNumber[] = await contract.callStatic.balanceOfBatch(addresses, tokens);
  const assets: Asset[] = [];
  response.forEach((bigNumber, idx) => !bigNumber.isZero() && assets.push(metadata[idx]));

  return assets;
};

export default getAssetsFromAddress;
