export const abi = [
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'fee',
                'type': 'uint256'
            },
            {
                'internalType': 'address',
                'name': 'feeRecipient',
                'type': 'address'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            }
        ],
        'name': 'ListingCancelled',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            },
            {
                'indexed': true,
                'internalType': 'bool',
                'name': 'isErc721',
                'type': 'bool'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'nftAddress',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'price',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'erc20Address',
                'type': 'address'
            }
        ],
        'name': 'ListingCreated',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'buyer',
                'type': 'address'
            }
        ],
        'name': 'ListingSold',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'previousOwner',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'newOwner',
                'type': 'address'
            }
        ],
        'name': 'OwnershipTransferred',
        'type': 'event'
    },
    {
        'inputs': [
            {
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            },
            {
                'internalType': 'address',
                'name': 'erc20Address',
                'type': 'address'
            }
        ],
        'name': 'buyAssetFromListing',
        'outputs': [],
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            }
        ],
        'name': 'cancelListing',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            },
            {
                'internalType': 'bool',
                'name': 'isErc721',
                'type': 'bool'
            },
            {
                'internalType': 'address',
                'name': 'nftAddress',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'price',
                'type': 'uint256'
            },
            {
                'internalType': 'address',
                'name': 'seller',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256'
            },
            {
                'internalType': 'address',
                'name': 'erc20Address',
                'type': 'address'
            }
        ],
        'name': 'createListing',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'string',
                'name': 'listingId',
                'type': 'string'
            }
        ],
        'name': 'getListing',
        'outputs': [
            {
                'components': [
                    {
                        'internalType': 'string',
                        'name': 'listingId',
                        'type': 'string'
                    },
                    {
                        'internalType': 'bool',
                        'name': 'isErc721',
                        'type': 'bool'
                    },
                    {
                        'internalType': 'enum MarketplaceListing.State',
                        'name': 'state',
                        'type': 'uint8'
                    },
                    {
                        'internalType': 'address',
                        'name': 'nftAddress',
                        'type': 'address'
                    },
                    {
                        'internalType': 'address',
                        'name': 'seller',
                        'type': 'address'
                    },
                    {
                        'internalType': 'address',
                        'name': 'erc20Address',
                        'type': 'address'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'tokenId',
                        'type': 'uint256'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'price',
                        'type': 'uint256'
                    },
                    {
                        'internalType': 'address',
                        'name': 'buyer',
                        'type': 'address'
                    }
                ],
                'internalType': 'struct MarketplaceListing.Listing',
                'name': '',
                'type': 'tuple'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getMarketplaceFee',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getMarketplaceFeeRecipient',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            },
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            },
            {
                'internalType': 'uint256[]',
                'name': '',
                'type': 'uint256[]'
            },
            {
                'internalType': 'uint256[]',
                'name': '',
                'type': 'uint256[]'
            },
            {
                'internalType': 'bytes',
                'name': '',
                'type': 'bytes'
            }
        ],
        'name': 'onERC1155BatchReceived',
        'outputs': [
            {
                'internalType': 'bytes4',
                'name': '',
                'type': 'bytes4'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            },
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            },
            {
                'internalType': 'bytes',
                'name': '',
                'type': 'bytes'
            }
        ],
        'name': 'onERC1155Received',
        'outputs': [
            {
                'internalType': 'bytes4',
                'name': '',
                'type': 'bytes4'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            },
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            },
            {
                'internalType': 'bytes',
                'name': '',
                'type': 'bytes'
            }
        ],
        'name': 'onERC721Received',
        'outputs': [
            {
                'internalType': 'bytes4',
                'name': '',
                'type': 'bytes4'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'owner',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'renounceOwnership',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'fee',
                'type': 'uint256'
            }
        ],
        'name': 'setMarketplaceFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'recipient',
                'type': 'address'
            }
        ],
        'name': 'setMarketplaceFeeRecipient',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'newOwner',
                'type': 'address'
            }
        ],
        'name': 'transferOwnership',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'stateMutability': 'payable',
        'type': 'receive'
    }
]
export const data = '0x60806040523480156200001157600080fd5b5060405162002862380380620028628339810160408190526200003491620000b9565b600062000040620000b5565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600291909155600380546001600160a01b0319166001600160a01b03909216919091179055620000f6565b3390565b60008060408385031215620000cc578182fd5b825160208401519092506001600160a01b0381168114620000eb578182fd5b809150509250929050565b61275c80620001066000396000f3fe6080604052600436106100e15760003560e01c80638da5cb5b1161007f57806399fbba611161005957806399fbba6114610233578063bc197c8114610253578063f23a6e6114610273578063f2fde38b14610293576100e8565b80638da5cb5b146101de5780639407ea98146101f3578063943f226114610213576100e8565b80634ae9ec30116100bb5780634ae9ec30146101675780634ffa2be214610194578063715018a6146101b657806389508b27146101cb576100e8565b8063150b7a02146100ed5780631e2ea2a31461012357806326a7b37b14610145576100e8565b366100e857005b600080fd5b3480156100f957600080fd5b5061010d610108366004611b2e565b6102b3565b60405161011a9190611f39565b60405180910390f35b34801561012f57600080fd5b5061014361013e366004611a45565b6102c3565b005b34801561015157600080fd5b5061015a61032d565b60405161011a9190612598565b34801561017357600080fd5b50610187610182366004611c1b565b610333565b60405161011a91906124d7565b3480156101a057600080fd5b506101a96104ba565b60405161011a9190611e96565b3480156101c257600080fd5b506101436104c9565b6101436101d9366004611c56565b610552565b3480156101ea57600080fd5b506101a9610e1d565b3480156101ff57600080fd5b5061014361020e366004611d4b565b610e2c565b34801561021f57600080fd5b5061014361022e366004611c1b565b610e70565b34801561023f57600080fd5b5061014361024e366004611ca6565b6112dc565b34801561025f57600080fd5b5061010d61026e366004611a84565b6116e4565b34801561027f57600080fd5b5061010d61028e366004611b98565b6116f5565b34801561029f57600080fd5b506101436102ae366004611a45565b611706565b630a85bd0160e11b949350505050565b6102cb6117c6565b6001600160a01b03166102dc610e1d565b6001600160a01b03161461030b5760405162461bcd60e51b815260040161030290612275565b60405180910390fd5b600380546001600160a01b0319166001600160a01b0392909216919091179055565b60025490565b61033b61186b565b60018260405161034b9190611ddc565b90815260200160405180910390206040518061014001604052908160008201805461037590612699565b80601f01602080910402602001604051908101604052809291908181526020018280546103a190612699565b80156103ee5780601f106103c3576101008083540402835291602001916103ee565b820191906000526020600020905b8154815290600101906020018083116103d157829003601f168201915b5050509183525050600182015460ff8082161515602084015260409092019161010090910416600281111561043357634e487b7160e01b600052602160045260246000fd5b600281111561045257634e487b7160e01b600052602160045260246000fd5b815260018201546201000090046001600160a01b03908116602083015260028301548116604083015260038301548116606083015260048301546080830152600583015460a0830152600683015460c083015260079092015490911660e09091015292915050565b6003546001600160a01b031690565b6104d16117c6565b6001600160a01b03166104e2610e1d565b6001600160a01b0316146105085760405162461bcd60e51b815260040161030290612275565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60006001836040516105649190611ddc565b90815260200160405180910390206040518061014001604052908160008201805461058e90612699565b80601f01602080910402602001604051908101604052809291908181526020018280546105ba90612699565b80156106075780601f106105dc57610100808354040283529160200191610607565b820191906000526020600020905b8154815290600101906020018083116105ea57829003601f168201915b5050509183525050600182015460ff8082161515602084015260409092019161010090910416600281111561064c57634e487b7160e01b600052602160045260246000fd5b600281111561066b57634e487b7160e01b600052602160045260246000fd5b815260018201546001600160a01b03620100009091048116602083015260028301548116604083015260038301548116606083015260048301546080830152600583015460a0830152600683015460c083015260079092015490911660e09091015290506000816040015160028111156106f557634e487b7160e01b600052602160045260246000fd5b1461072257341561070a5761070a33346117ca565b60405162461bcd60e51b8152600401610302906122aa565b8060200151156107ed57606081015160c08201516040516331a9108f60e11b815230926001600160a01b031691636352211e916107629190600401612598565b60206040518083038186803b15801561077a57600080fd5b505afa15801561078e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b29190611a68565b6001600160a01b0316146107e85734156107d0576107d033346117ca565b60405162461bcd60e51b8152600401610302906121e4565b6108a5565b8060e0015181606001516001600160a01b031662fdd58e308460c001516040518363ffffffff1660e01b8152600401610827929190611f20565b60206040518083038186803b15801561083f57600080fd5b505afa158015610853573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108779190611d63565b10156108a557341561088d5761088d33346117ca565b60405162461bcd60e51b815260040161030290612437565b816001600160a01b03168160a001516001600160a01b0316146108ea5734156108d2576108d233346117ca565b60405162461bcd60e51b8152600401610302906122ee565b60006127106002548361010001516109029190612633565b61090c9190612613565b60a08301519091506001600160a01b03166109d857348183610100015161093391906125fb565b11156109615734156109495761094933346117ca565b60405162461bcd60e51b8152600401610302906123a3565b600354610977906001600160a01b0316826117ca565b61098a82608001518361010001516117ca565b6000818361010001513461099e9190612652565b6109a89190612652565b11156109d3576109d33382846101000151346109c49190612652565b6109ce9190612652565b6117ca565b610bbf565b60a0820151604051636eb1769f60e11b81526001600160a01b0382169063dd62ed3e90610a0b9033903090600401611eaa565b60206040518083038186803b158015610a2357600080fd5b505afa158015610a37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5b9190611d63565b82846101000151610a6c91906125fb565b1115610a9a573415610a8257610a8233346117ca565b60405162461bcd60e51b815260040161030290611fab565b6003546040516323b872dd60e01b81526001600160a01b03808416926323b872dd92610ace92339216908790600401611ec4565b602060405180830381600087803b158015610ae857600080fd5b505af1158015610afc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b209190611bff565b5060808301516101008401516040516323b872dd60e01b81526001600160a01b038416926323b872dd92610b5a9233929190600401611ec4565b602060405180830381600087803b158015610b7457600080fd5b505af1158015610b88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bac9190611bff565b503415610bbd57610bbd33346117ca565b505b816020015115610c3957606082015160c0830151604051632142170760e11b81526001600160a01b03909216916342842e0e91610c029130913391600401611ec4565b600060405180830381600087803b158015610c1c57600080fd5b505af1158015610c30573d6000803e3d6000fd5b50505050610caa565b81606001516001600160a01b031663f242432a30338560c001518660e001516040518563ffffffff1660e01b8152600401610c779493929190611ee8565b600060405180830381600087803b158015610c9157600080fd5b505af1158015610ca5573d6000803e3d6000fd5b505050505b600160408381018290523361012085015251839190610cca908790611ddc565b90815260200160405180910390206000820151816000019080519060200190610cf49291906118bf565b50602082015160018201805460ff1916911515919091178082556040840151919061ff001916610100836002811115610d3d57634e487b7160e01b600052602160045260246000fd5b0217905550606082015160018201805462010000600160b01b031916620100006001600160a01b039384160217905560808301516002830180546001600160a01b031990811692841692909217905560a0840151600384018054831691841691909117905560c0840151600484015560e084015160058401556101008401516006840155610120909301516007909201805490931691161790556040513390610de7908690611ddc565b604051908190038120907fe7250216b7511d32ca1a0141f8d5cc775bd04f9c749b54b0c6c1cb1e1c4ff52e90600090a350505050565b6000546001600160a01b031690565b610e346117c6565b6001600160a01b0316610e45610e1d565b6001600160a01b031614610e6b5760405162461bcd60e51b815260040161030290612275565b600255565b6000600182604051610e829190611ddc565b908152602001604051809103902060405180610140016040529081600082018054610eac90612699565b80601f0160208091040260200160405190810160405280929190818152602001828054610ed890612699565b8015610f255780601f10610efa57610100808354040283529160200191610f25565b820191906000526020600020905b815481529060010190602001808311610f0857829003601f168201915b5050509183525050600182015460ff80821615156020840152604090920191610100909104166002811115610f6a57634e487b7160e01b600052602160045260246000fd5b6002811115610f8957634e487b7160e01b600052602160045260246000fd5b815260018201546001600160a01b03620100009091048116602083015260028301548116604083015260038301548116606083015260048301546080830152600583015460a0830152600683015460c083015260079092015490911660e090910152905060008160400151600281111561101357634e487b7160e01b600052602160045260246000fd5b146110305760405162461bcd60e51b81526004016103029061204e565b60808101516001600160a01b0316331480611063575061104e610e1d565b6001600160a01b0316336001600160a01b0316145b61107f5760405162461bcd60e51b81526004016103029061212e565b8060200151156110fc576060810151608082015160c0830151604051632142170760e11b81526001600160a01b03909316926342842e0e926110c5923092600401611ec4565b600060405180830381600087803b1580156110df57600080fd5b505af11580156110f3573d6000803e3d6000fd5b50505050611171565b80606001516001600160a01b031663f242432a3083608001518460c001518560e001516040518563ffffffff1660e01b815260040161113e9493929190611ee8565b600060405180830381600087803b15801561115857600080fd5b505af115801561116c573d6000803e3d6000fd5b505050505b60026040820181815250508060018360405161118d9190611ddc565b908152602001604051809103902060008201518160000190805190602001906111b79291906118bf565b50602082015160018201805460ff1916911515919091178082556040840151919061ff00191661010083600281111561120057634e487b7160e01b600052602160045260246000fd5b0217905550606082015160018201805462010000600160b01b031916620100006001600160a01b039384160217905560808301516002830180546001600160a01b031990811692841692909217905560a0840151600384018054831691841691909117905560c0840151600484015560e084015160058401556101008401516006840155610120909301516007909201805490931691161790556040516112a8908390611ddc565b604051908190038120907fff1b3c121274b35b78cfc6a06d69993757efa24b0a666779050b1266aade87c690600090a25050565b6112e46117c6565b6001600160a01b03166112f5610e1d565b6001600160a01b03161461131b5760405162461bcd60e51b815260040161030290612275565b8760405160200161132c9190611ddc565b604051602081830303815290604052805190602001206001896040516113529190611ddc565b9081526040516020918190038201812061136e92909101611df8565b6040516020818303038152906040528051906020012014156113a25760405162461bcd60e51b8152600401610302906123e9565b8661145557600082116113b457600080fd5b604051627eeac760e11b815282906001600160a01b0388169062fdd58e906113e29087908a90600401611f20565b60206040518083038186803b1580156113fa57600080fd5b505afa15801561140e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114329190611d63565b10156114505760405162461bcd60e51b815260040161030290611f4e565b611501565b826001600160a01b0316866001600160a01b0316636352211e876040518263ffffffff1660e01b815260040161148b9190612598565b60206040518083038186803b1580156114a357600080fd5b505afa1580156114b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114db9190611a68565b6001600160a01b0316146115015760405162461bcd60e51b815260040161030290612199565b6040805161014081018252898152881515602082015260008183018190526001600160a01b03808a1660608401528681166080840152841660a083015260c0820188905260e0820185905261010082018790526101208201529051819060019061156c908c90611ddc565b908152602001604051809103902060008201518160000190805190602001906115969291906118bf565b50602082015160018201805460ff1916911515919091178082556040840151919061ff0019166101008360028111156115df57634e487b7160e01b600052602160045260246000fd5b0217905550606082015160018201805462010000600160b01b031916620100006001600160a01b039384160217905560808301516002830180546001600160a01b031990811692841692909217905560a0840151600384018054831691841691909117905560c0840151600484015560e0840151600584015561010084015160068401556101209093015160079092018054909316918116919091179091556040519088169089151590611694908c90611ddc565b60405180910390207f1186ddd131abcdb1bd48f735fad4ef1e2753ebf190acf3159f6c1808fb1d410589878a886040516116d194939291906125a1565b60405180910390a4505050505050505050565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b61170e6117c6565b6001600160a01b031661171f610e1d565b6001600160a01b0316146117455760405162461bcd60e51b815260040161030290612275565b6001600160a01b03811661176b5760405162461bcd60e51b815260040161030290612008565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b804710156117ea5760405162461bcd60e51b8152600401610302906120f7565b6000826001600160a01b03168260405161180390611e93565b60006040518083038185875af1925050503d8060008114611840576040519150601f19603f3d011682016040523d82523d6000602084013e611845565b606091505b50509050806118665760405162461bcd60e51b81526004016103029061209a565b505050565b6040805161014081018252606081526000602082018190529091820190815260006020820181905260408201819052606082018190526080820181905260a0820181905260c0820181905260e09091015290565b8280546118cb90612699565b90600052602060002090601f0160209004810192826118ed5760008555611933565b82601f1061190657805160ff1916838001178555611933565b82800160010185558215611933579182015b82811115611933578251825591602001919060010190611918565b5061193f929150611943565b5090565b5b8082111561193f5760008155600101611944565b600082601f830112611968578081fd5b8135602067ffffffffffffffff821115611984576119846126ea565b8082026119928282016125c5565b8381528281019086840183880185018910156119ac578687fd5b8693505b858410156119ce5780358352600193909301929184019184016119b0565b50979650505050505050565b600082601f8301126119ea578081fd5b813567ffffffffffffffff811115611a0457611a046126ea565b611a17601f8201601f19166020016125c5565b818152846020838601011115611a2b578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215611a56578081fd5b8135611a6181612700565b9392505050565b600060208284031215611a79578081fd5b8151611a6181612700565b600080600080600060a08688031215611a9b578081fd5b8535611aa681612700565b94506020860135611ab681612700565b9350604086013567ffffffffffffffff80821115611ad2578283fd5b611ade89838a01611958565b94506060880135915080821115611af3578283fd5b611aff89838a01611958565b93506080880135915080821115611b14578283fd5b50611b21888289016119da565b9150509295509295909350565b60008060008060808587031215611b43578384fd5b8435611b4e81612700565b93506020850135611b5e81612700565b925060408501359150606085013567ffffffffffffffff811115611b80578182fd5b611b8c878288016119da565b91505092959194509250565b600080600080600060a08688031215611baf578081fd5b8535611bba81612700565b94506020860135611bca81612700565b93506040860135925060608601359150608086013567ffffffffffffffff811115611bf3578182fd5b611b21888289016119da565b600060208284031215611c10578081fd5b8151611a6181612718565b600060208284031215611c2c578081fd5b813567ffffffffffffffff811115611c42578182fd5b611c4e848285016119da565b949350505050565b60008060408385031215611c68578182fd5b823567ffffffffffffffff811115611c7e578283fd5b611c8a858286016119da565b9250506020830135611c9b81612700565b809150509250929050565b600080600080600080600080610100898b031215611cc2578283fd5b883567ffffffffffffffff811115611cd8578384fd5b611ce48b828c016119da565b9850506020890135611cf581612718565b96506040890135611d0581612700565b9550606089013594506080890135935060a0890135611d2381612700565b925060c0890135915060e0890135611d3a81612700565b809150509295985092959890939650565b600060208284031215611d5c578081fd5b5035919050565b600060208284031215611d74578081fd5b5051919050565b6001600160a01b03169052565b15159052565b60038110611dac57634e487b7160e01b600052602160045260246000fd5b9052565b60008151808452611dc8816020860160208601612669565b601f01601f19169290920160200192915050565b60008251611dee818460208701612669565b9190910192915050565b8154600090819060028104600180831680611e1457607f831692505b6020808410821415611e3457634e487b7160e01b87526022600452602487fd5b818015611e485760018114611e5957611e85565b60ff19861689528489019650611e85565b611e628a6125ef565b885b86811015611e7d5781548b820152908501908301611e64565b505084890196505b509498975050505050505050565b90565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b03929092168252602082015260400190565b6001600160e01b031991909116815260200190565b60208082526038908201527f4552433131353520746f6b656e2062616c616e6365206973206e6f742073756660408201527f66696369656e7420666f72207468652073656c6c65722e2e0000000000000000606082015260800190565b6020808252603e908201527f496e73756666696369656e7420455243323020616c6c6f77616e63652062616c60408201527f616e636520666f7220706179696e6720666f72207468652061737365742e0000606082015260800190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252602c908201527f4c697374696e67206973206e6f7420696e20494e49544941544544207374617460408201526b32971020b137b93a34b7339760a11b606082015260800190565b6020808252603a908201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260408201527f6563697069656e74206d61792068617665207265766572746564000000000000606082015260800190565b6020808252601d908201527f416464726573733a20696e73756666696369656e742062616c616e6365000000604082015260600190565b60208082526045908201527f4c697374696e672063616e27742062652063616e63656c6c65642066726f6d2060408201527f6f74686572207468656e2073656c6c6572206f72206f776e65722e2041626f726060820152643a34b7339760d91b608082015260a00190565b6020808252602b908201527f45524337323120746f6b656e20646f6573206e6f742062656c6f6e6720746f2060408201526a3a34329030baba3437b91760a91b606082015260800190565b60208082526065908201527f4173736574206973206e6f74206f776e65642062792074686973206c6973746960408201527f6e672e2050726f6261626c7920776173206e6f742073656e7420746f2074686560608201527f20736d61727420636f6e74726163742c206f722077617320616c72656164792060808201526439b7b6321760d91b60a082015260c00190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526024908201527f4c697374696e6720697320696e2077726f6e672073746174652e2041626f727460408201526334b7339760e11b606082015260800190565b60208082526083908201527f455243323020746f6b656e20616464726573732061732061207061796572206d60408201527f6574686f642073686f756c64206265207468652073616d6520617320696e207460608201527f6865206c697374696e672e20456974686572206c697374696e672c206f72206d60808201527f6574686f642063616c6c206861732077726f6e6720455243323020616464726560a08201526239b99760e91b60c082015260e00190565b60208082526026908201527f496e73756666696369656e74207072696365207061696420666f72207468652060408201526530b9b9b2ba1760d11b606082015260800190565b6020808252602e908201527f4c697374696e6720616c7265616479206578697374656420666f72206375727260408201526d195b9d081b1a5cdd1a5b99c8125960921b606082015260800190565b60208082526074908201527f496e73756666696369656e742062616c616e6365206f6620746865206173736560408201527f7420696e2074686973206c697374696e672e2050726f6261626c79207761732060608201527f6e6f742073656e7420746f2074686520736d61727420636f6e74726163742c2060808201527337b9103bb0b99030b63932b0b23c9039b7b6321760611b60a082015260c00190565b60006020825282516101408060208501526124f6610160850183611db0565b9150602085015161250a6040860182611d88565b50604085015161251d6060860182611d8e565b5060608501516125306080860182611d7b565b50608085015161254360a0860182611d7b565b5060a085015161255660c0860182611d7b565b5060c085015160e085810191909152850151610100808601919091528501516101208086019190915285015161258e82860182611d7b565b5090949350505050565b90815260200190565b938452602084019290925260408301526001600160a01b0316606082015260800190565b60405181810167ffffffffffffffff811182821017156125e7576125e76126ea565b604052919050565b60009081526020902090565b6000821982111561260e5761260e6126d4565b500190565b60008261262e57634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561264d5761264d6126d4565b500290565b600082821015612664576126646126d4565b500390565b60005b8381101561268457818101518382015260200161266c565b83811115612693576000848401525b50505050565b6002810460018216806126ad57607f821691505b602082108114156126ce57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461271557600080fd5b50565b801515811461271557600080fdfea2646970667358221220e27a0b0203fd8a51f9d64b0bf7294f826ab363669b9006f18cc9e8672ae3e4b264736f6c63430008000033'
