export const openSeaContract = '0x495f947276749Ce646f68AC8c248420045cb7b5e';
export const gmooContract = '0xE43D741e21d8Bf30545A88c46e4FF5681518eBad';

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
  'function tokenURI(uint256 moo) public view returns (string memory uri)',
  'function lockMoo(uint256 moo, uint256 price, bytes32 hash) public',
];
