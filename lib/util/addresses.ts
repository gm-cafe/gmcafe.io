export const openSeaContract = '0x495f947276749Ce646f68AC8c248420045cb7b5e';
export const gmooContract = '0xE43D741e21d8Bf30545A88c46e4FF5681518eBad';
export const redeemContract = '0xa25066d7232069489b57db8755d0055ecd69daec';
export const keekContract = '0x5eb885e22b512015a3aa91ab4b2a835cea568bab';

export const openSeaABI = [
  'function isApprovedForAll(address account, address operator) public view virtual override returns (bool)',
  'function setApprovalForAll(address _operator, bool _approved) external',
];

export const gmooABI = [
  'function _claimableTime() public view returns (uint256)',
  'function getMigratableTokens(address sender) public view returns (uint256[] memory tokens, uint256[] memory moos)',
  'function isMigrationApproved(address sender) public view returns (bool)',
  'function migrateMoos(uint256[] calldata tokens) public',
  'function getWallet(address owner) public view returns (uint256[] memory moos, uint256 touched)',
  'function getHerd() public view returns (bytes32[] memory ret)',
  'function getMoo(uint256 moo) public view returns (address owner, uint32 transfers, uint32 block0, uint32 blocksHeld, uint16 tag, bool isLocked, uint256 unlockPrice)',
  'function tokenURI(uint256 moo) public view returns (string memory uri)',
  'function lockMoo(uint256 moo, uint256 price, bytes32 hash) public',
  'function unlockMoo(uint256 moo, string memory password, address transfer) payable public',
];

export const redeemABI = ['function redeemMoos(uint256[] calldata tokens) public'];

export const keekABI = [
  'function hasMinted(uint256 index) public view returns (bool)',
  'function reservationMint(bytes32[] calldata proof, uint256 index, uint256 mints, uint256[] calldata prefs) external payable',
];
