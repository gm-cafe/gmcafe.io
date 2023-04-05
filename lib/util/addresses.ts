import { openseaABI } from '../wagmi/opensea';
import { gmooABI, keekABI, redeemABI } from '../wagmi/generated';
import { Address } from './address';

export const openSeaContract: Address = '0x495f947276749Ce646f68AC8c248420045cb7b5e';
export const gmooContract: Address = '0xE43D741e21d8Bf30545A88c46e4FF5681518eBad';
export const redeemContract: Address = '0xa25066d7232069489b57db8755d0055ecd69daec';
export const keekContract: Address = '0x01298589d7c2bd82f54ca84060d58967772123f2';

export { gmooABI, keekABI, redeemABI, openseaABI };

export const gmooDeployer: Address = '0x00007C6cf9bF9B62B663f35542F486747a86D9D1';
export const keekDeployer: Address = '0xa050F07d0a880B7C9389A782250d6848bA433854';
