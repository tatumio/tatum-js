import { Abi, ContractAbi } from '../common.contracts'

const abi: Abi[] = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'to',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'tokenId',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: 'uri',
        type: 'string[]',
      },
    ],
    name: 'safeMintBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const bytecode =
  '0x60806040523480156200001157600080fd5b5060405162002912380380620029128339810160408190526200003491620003b0565b84846000620000448382620004f6565b506001620000538282620004f6565b505050620000706200006a620000f260201b60201c565b620000f6565b6200007d60008362000148565b62000098600080516020620028f28339815191528362000148565b806001600160a01b0316826001600160a01b031614620000cd57620000cd600080516020620028f28339815191528262000148565b620000d882620001ed565b6009620000e68482620004f6565b505050505050620005c2565b3390565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60008281526007602090815260408083206001600160a01b038516845290915290205460ff16620001e95760008281526007602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001a83390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b620001f762000270565b6001600160a01b038116620002625760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6200026d81620000f6565b50565b6008546001600160a01b03163314620002cc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000259565b565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620002f657600080fd5b81516001600160401b0380821115620003135762000313620002ce565b604051601f8301601f19908116603f011681019082821181831017156200033e576200033e620002ce565b816040528381526020925086838588010111156200035b57600080fd5b600091505b838210156200037f578582018301518183018401529082019062000360565b600093810190920192909252949350505050565b80516001600160a01b0381168114620003ab57600080fd5b919050565b600080600080600060a08688031215620003c957600080fd5b85516001600160401b0380821115620003e157600080fd5b620003ef89838a01620002e4565b965060208801519150808211156200040657600080fd5b6200041489838a01620002e4565b955060408801519150808211156200042b57600080fd5b506200043a88828901620002e4565b9350506200044b6060870162000393565b91506200045b6080870162000393565b90509295509295909350565b600181811c908216806200047c57607f821691505b6020821081036200049d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620004f157600081815260208120601f850160051c81016020861015620004cc5750805b601f850160051c820191505b81811015620004ed57828155600101620004d8565b5050505b505050565b81516001600160401b03811115620005125762000512620002ce565b6200052a8162000523845462000467565b84620004a3565b602080601f831160018114620005625760008415620005495750858301515b600019600386901b1c1916600185901b178555620004ed565b600085815260208120601f198616915b82811015620005935788860151825594840194600190910190840162000572565b5085821015620005b25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61232080620005d26000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063b88d4fde11610097578063d539139311610071578063d5391393146103bd578063d547741f146103d2578063e985e9c5146103e5578063f2fde38b1461042157600080fd5b8063b88d4fde14610384578063c87b56dd14610397578063cd279c7c146103aa57600080fd5b806391d14854116100d357806391d148541461034e57806395d89b4114610361578063a217fddf14610369578063a22cb4651461037157600080fd5b806370a0823114610322578063715018a6146103355780638da5cb5b1461033d57600080fd5b8063348325fd1161016657806342966c681161014057806342966c68146102d657806350bb4e7f146102e95780635a9c9eb8146102fc5780636352211e1461030f57600080fd5b8063348325fd1461029d57806336568abe146102b057806342842e0e146102c357600080fd5b8063095ea7b3116101a2578063095ea7b31461023157806323b872dd14610246578063248a9ca3146102595780632f2ff15d1461028a57600080fd5b806301ffc9a7146101c957806306fdde03146101f1578063081812fc14610206575b600080fd5b6101dc6101d73660046119d7565b610434565b60405190151581526020015b60405180910390f35b6101f9610445565b6040516101e89190611a44565b610219610214366004611a57565b6104d7565b6040516001600160a01b0390911681526020016101e8565b61024461023f366004611a8c565b6104fe565b005b610244610254366004611ab6565b610618565b61027c610267366004611a57565b60009081526007602052604090206001015490565b6040519081526020016101e8565b610244610298366004611af2565b61064a565b6102446102ab366004611cec565b61066f565b6102446102be366004611af2565b610724565b6102446102d1366004611ab6565b6107a2565b6102446102e4366004611a57565b6107bd565b6102446102f7366004611dd0565b6107ee565b61024461030a366004611cec565b610817565b61021961031d366004611a57565b61083a565b61027c610330366004611e1d565b61089a565b610244610920565b6008546001600160a01b0316610219565b6101dc61035c366004611af2565b610934565b6101f961095f565b61027c600081565b61024461037f366004611e38565b61096e565b610244610392366004611e74565b610979565b6101f96103a5366004611a57565b6109ab565b6102446103b8366004611dd0565b6109b6565b61027c6000805160206122cb83398151915281565b6102446103e0366004611af2565b6109e2565b6101dc6103f3366004611ef0565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61024461042f366004611e1d565b610a07565b600061043f82610a7d565b92915050565b60606000805461045490611f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461048090611f1a565b80156104cd5780601f106104a2576101008083540402835291602001916104cd565b820191906000526020600020905b8154815290600101906020018083116104b057829003601f168201915b5050505050905090565b60006104e282610aa2565b506000908152600460205260409020546001600160a01b031690565b60006105098261083a565b9050806001600160a01b0316836001600160a01b03160361057b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b0382161480610597575061059781336103f3565b6106095760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610572565b6106138383610b01565b505050565b610623335b82610b6f565b61063f5760405162461bcd60e51b815260040161057290611f54565b610613838383610bee565b60008281526007602052604090206001015461066581610d52565b6106138383610d5c565b6000805160206122cb83398151915261068781610d52565b60005b845181101561071d576106cf8582815181106106a8576106a8611fa1565b60200260200101518583815181106106c2576106c2611fa1565b6020026020010151610de2565b61070b8482815181106106e4576106e4611fa1565b60200260200101518483815181106106fe576106fe611fa1565b6020026020010151610dfc565b8061071581611fcd565b91505061068a565b5050505050565b6001600160a01b03811633146107945760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610572565b61079e8282610e8f565b5050565b61061383838360405180602001604052806000815250610979565b6107c63361061d565b6107e25760405162461bcd60e51b815260040161057290611f54565b6107eb81610ef6565b50565b6000805160206122cb83398151915261080681610d52565b6108118484846109b6565b50505050565b6000805160206122cb83398151915261082f81610d52565b61081184848461066f565b6000818152600260205260408120546001600160a01b03168061043f5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610572565b60006001600160a01b0382166109045760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610572565b506001600160a01b031660009081526003602052604090205490565b610928610eff565b6109326000610f59565b565b60009182526007602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60606001805461045490611f1a565b61079e338383610fab565b6109833383610b6f565b61099f5760405162461bcd60e51b815260040161057290611f54565b61081184848484611079565b606061043f826110ac565b6000805160206122cb8339815191526109ce81610d52565b6109d88484610de2565b6108118383610dfc565b6000828152600760205260409020600101546109fd81610d52565b6106138383610e8f565b610a0f610eff565b6001600160a01b038116610a745760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610572565b6107eb81610f59565b60006001600160e01b03198216637965db0b60e01b148061043f575061043f826111a7565b6000818152600260205260409020546001600160a01b03166107eb5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610572565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610b368261083a565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610b7b8361083a565b9050806001600160a01b0316846001600160a01b03161480610bc257506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610be65750836001600160a01b0316610bdb846104d7565b6001600160a01b0316145b949350505050565b826001600160a01b0316610c018261083a565b6001600160a01b031614610c275760405162461bcd60e51b815260040161057290611fe6565b6001600160a01b038216610c895760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610572565b826001600160a01b0316610c9c8261083a565b6001600160a01b031614610cc25760405162461bcd60e51b815260040161057290611fe6565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6107eb81336111f7565b610d668282610934565b61079e5760008281526007602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610d9e3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61079e828260405180602001604052806000815250611250565b6000828152600260205260409020546001600160a01b0316610e775760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b6064820152608401610572565b60008281526006602052604090206106138282612079565b610e998282610934565b1561079e5760008281526007602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6107eb81611283565b6008546001600160a01b031633146109325760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610572565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03160361100c5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610572565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611084848484610bee565b611090848484846112c3565b6108115760405162461bcd60e51b815260040161057290612139565b60606110b782610aa2565b600082815260066020526040812080546110d090611f1a565b80601f01602080910402602001604051908101604052809291908181526020018280546110fc90611f1a565b80156111495780601f1061111e57610100808354040283529160200191611149565b820191906000526020600020905b81548152906001019060200180831161112c57829003601f168201915b50505050509050600061115a6113c4565b9050805160000361116c575092915050565b81511561119e57808260405160200161118692919061218b565b60405160208183030381529060405292505050919050565b610be6846113d3565b60006001600160e01b031982166380ac58cd60e01b14806111d857506001600160e01b03198216635b5e139f60e01b145b8061043f57506301ffc9a760e01b6001600160e01b031983161461043f565b6112018282610934565b61079e5761120e8161143a565b61121983602061144c565b60405160200161122a9291906121ba565b60408051601f198184030181529082905262461bcd60e51b825261057291600401611a44565b61125a83836115e8565b61126760008484846112c3565b6106135760405162461bcd60e51b815260040161057290612139565b61128c81611773565b600081815260066020526040902080546112a590611f1a565b1590506107eb5760008181526006602052604081206107eb91611973565b60006001600160a01b0384163b156113b957604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061130790339089908890889060040161222f565b6020604051808303816000875af1925050508015611342575060408051601f3d908101601f1916820190925261133f9181019061226c565b60015b61139f573d808015611370576040519150601f19603f3d011682016040523d82523d6000602084013e611375565b606091505b5080516000036113975760405162461bcd60e51b815260040161057290612139565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610be6565b506001949350505050565b60606009805461045490611f1a565b60606113de82610aa2565b60006113e86113c4565b905060008151116114085760405180602001604052806000815250611433565b8061141284611808565b60405160200161142392919061218b565b6040516020818303038152906040525b9392505050565b606061043f6001600160a01b03831660145b6060600061145b836002612289565b6114669060026122a0565b67ffffffffffffffff81111561147e5761147e611b1e565b6040519080825280601f01601f1916602001820160405280156114a8576020820181803683370190505b509050600360fc1b816000815181106114c3576114c3611fa1565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106114f2576114f2611fa1565b60200101906001600160f81b031916908160001a9053506000611516846002612289565b6115219060016122a0565b90505b6001811115611599576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061155557611555611fa1565b1a60f81b82828151811061156b5761156b611fa1565b60200101906001600160f81b031916908160001a90535060049490941c93611592816122b3565b9050611524565b5083156114335760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610572565b6001600160a01b03821661163e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610572565b6000818152600260205260409020546001600160a01b0316156116a35760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610572565b6000818152600260205260409020546001600160a01b0316156117085760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610572565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061177e8261083a565b90506117898261083a565b600083815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526003845282852080546000190190558785526002909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b606060006118158361189b565b600101905060008167ffffffffffffffff81111561183557611835611b1e565b6040519080825280601f01601f19166020018201604052801561185f576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461186957509392505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106118da5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611906576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061192457662386f26fc10000830492506010015b6305f5e100831061193c576305f5e100830492506008015b612710831061195057612710830492506004015b60648310611962576064830492506002015b600a831061043f5760010192915050565b50805461197f90611f1a565b6000825580601f1061198f575050565b601f0160209004906000526020600020908101906107eb91905b808211156119bd57600081556001016119a9565b5090565b6001600160e01b0319811681146107eb57600080fd5b6000602082840312156119e957600080fd5b8135611433816119c1565b60005b83811015611a0f5781810151838201526020016119f7565b50506000910152565b60008151808452611a308160208601602086016119f4565b601f01601f19169290920160200192915050565b6020815260006114336020830184611a18565b600060208284031215611a6957600080fd5b5035919050565b80356001600160a01b0381168114611a8757600080fd5b919050565b60008060408385031215611a9f57600080fd5b611aa883611a70565b946020939093013593505050565b600080600060608486031215611acb57600080fd5b611ad484611a70565b9250611ae260208501611a70565b9150604084013590509250925092565b60008060408385031215611b0557600080fd5b82359150611b1560208401611a70565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611b5d57611b5d611b1e565b604052919050565b600067ffffffffffffffff821115611b7f57611b7f611b1e565b5060051b60200190565b600082601f830112611b9a57600080fd5b81356020611baf611baa83611b65565b611b34565b82815260059290921b84018101918181019086841115611bce57600080fd5b8286015b84811015611be95780358352918301918301611bd2565b509695505050505050565b600067ffffffffffffffff831115611c0e57611c0e611b1e565b611c21601f8401601f1916602001611b34565b9050828152838383011115611c3557600080fd5b828260208301376000602084830101529392505050565b600082601f830112611c5d57600080fd5b61143383833560208501611bf4565b600082601f830112611c7d57600080fd5b81356020611c8d611baa83611b65565b82815260059290921b84018101918181019086841115611cac57600080fd5b8286015b84811015611be957803567ffffffffffffffff811115611cd05760008081fd5b611cde8986838b0101611c4c565b845250918301918301611cb0565b600080600060608486031215611d0157600080fd5b833567ffffffffffffffff80821115611d1957600080fd5b818601915086601f830112611d2d57600080fd5b81356020611d3d611baa83611b65565b82815260059290921b8401810191818101908a841115611d5c57600080fd5b948201945b83861015611d8157611d7286611a70565b82529482019490820190611d61565b97505087013592505080821115611d9757600080fd5b611da387838801611b89565b93506040860135915080821115611db957600080fd5b50611dc686828701611c6c565b9150509250925092565b600080600060608486031215611de557600080fd5b611dee84611a70565b925060208401359150604084013567ffffffffffffffff811115611e1157600080fd5b611dc686828701611c4c565b600060208284031215611e2f57600080fd5b61143382611a70565b60008060408385031215611e4b57600080fd5b611e5483611a70565b915060208301358015158114611e6957600080fd5b809150509250929050565b60008060008060808587031215611e8a57600080fd5b611e9385611a70565b9350611ea160208601611a70565b925060408501359150606085013567ffffffffffffffff811115611ec457600080fd5b8501601f81018713611ed557600080fd5b611ee487823560208401611bf4565b91505092959194509250565b60008060408385031215611f0357600080fd5b611f0c83611a70565b9150611b1560208401611a70565b600181811c90821680611f2e57607f821691505b602082108103611f4e57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611fdf57611fdf611fb7565b5060010190565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b601f82111561061357600081815260208120601f850160051c810160208610156120525750805b601f850160051c820191505b818110156120715782815560010161205e565b505050505050565b815167ffffffffffffffff81111561209357612093611b1e565b6120a7816120a18454611f1a565b8461202b565b602080601f8311600181146120dc57600084156120c45750858301515b600019600386901b1c1916600185901b178555612071565b600085815260208120601f198616915b8281101561210b578886015182559484019460019091019084016120ec565b50858210156121295787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000835161219d8184602088016119f4565b8351908301906121b18183602088016119f4565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516121f28160178501602088016119f4565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516122238160288401602088016119f4565b01602801949350505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061226290830184611a18565b9695505050505050565b60006020828403121561227e57600080fd5b8151611433816119c1565b808202811582820484141761043f5761043f611fb7565b8082018082111561043f5761043f611fb7565b6000816122c2576122c2611fb7565b50600019019056fe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a26469706673582212207b358709f37ee37a86696184aec8887f126a8f47410c6232f7dc27da37a2dad564736f6c634300081300339f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'

export const EonERC721: ContractAbi = {
  abi,
  bytecode,
}
