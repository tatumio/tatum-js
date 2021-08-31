export const abi = [
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
                'internalType': 'address',
                'name': 'tokenAddress',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'contractType',
                'type': 'uint256'
            },
            {
                'internalType': 'address',
                'name': 'spender',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256'
            }
        ],
        'name': 'approve',
        'outputs': [],
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
                'internalType': 'address',
                'name': 'tokenAddress',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'contractType',
                'type': 'uint256'
            },
            {
                'internalType': 'address',
                'name': 'recipient',
                'type': 'address'
            },
            {
                'internalType': 'uint256',
                'name': 'amount',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256'
            }
        ],
        'name': 'transfer',
        'outputs': [],
        'stateMutability': 'payable',
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
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b610a508061007d6000396000f3fe60806040526004361061007f5760003560e01c8063f23a6e611161004e578063f23a6e611461011a578063f2881e211461013a578063f2fde38b1461014d578063f7e290a41461016d57610086565b8063150b7a021461008b578063715018a6146100c15780638da5cb5b146100d8578063bc197c81146100fa57610086565b3661008657005b600080fd5b34801561009757600080fd5b506100ab6100a636600461072a565b61018d565b6040516100b89190610913565b60405180910390f35b3480156100cd57600080fd5b506100d661019d565b005b3480156100e457600080fd5b506100ed61022f565b6040516100b89190610860565b34801561010657600080fd5b506100ab610115366004610684565b61023e565b34801561012657600080fd5b506100ab610135366004610790565b61024f565b6100d66101483660046107f3565b610260565b34801561015957600080fd5b506100d6610168366004610663565b6103f4565b34801561017957600080fd5b506100d66101883660046107f3565b6104b4565b630a85bd0160e11b949350505050565b6101a5610556565b6001600160a01b03166101b661022f565b6001600160a01b0316146101e55760405162461bcd60e51b81526004016101dc906109a5565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b836102eb5760405163a9059cbb60e01b81526001600160a01b0386169063a9059cbb9061029390869086906004016108fa565b602060405180830381600087803b1580156102ad57600080fd5b505af11580156102c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e59190610840565b506103ed565b836001141561035b57604051635c46a7ef60e11b81526001600160a01b0386169063b88d4fde9061032490309087908690600401610874565b600060405180830381600087803b15801561033e57600080fd5b505af1158015610352573d6000803e3d6000fd5b505050506103ed565b836002141561039657604051637921219560e11b81526001600160a01b0386169063f242432a906103249030908790869088906004016108a7565b83600314156103d5576040516001600160a01b0384169083156108fc029084906000818181858888f193505050501580156102e5573d6000803e3d6000fd5b60405162461bcd60e51b81526004016101dc90610928565b5050505050565b6103fc610556565b6001600160a01b031661040d61022f565b6001600160a01b0316146104335760405162461bcd60e51b81526004016101dc906109a5565b6001600160a01b0381166104595760405162461bcd60e51b81526004016101dc9061095f565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b836104e75760405163095ea7b360e01b81526001600160a01b0386169063095ea7b39061029390869086906004016108fa565b836001141561051e5760405163095ea7b360e01b81526001600160a01b0386169063095ea7b39061032490869085906004016108fa565b83600214156103d55760405163a22cb46560e01b81526001600160a01b0386169063a22cb465906103249086906001906004016108df565b3390565b80356001600160a01b038116811461057157600080fd5b919050565b600082601f830112610586578081fd5b8135602067ffffffffffffffff8211156105a2576105a2610a04565b8082026105b08282016109da565b8381528281019086840183880185018910156105ca578687fd5b8693505b858410156105ec5780358352600193909301929184019184016105ce565b50979650505050505050565b600082601f830112610608578081fd5b813567ffffffffffffffff81111561062257610622610a04565b610635601f8201601f19166020016109da565b818152846020838601011115610649578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610674578081fd5b61067d8261055a565b9392505050565b600080600080600060a0868803121561069b578081fd5b6106a48661055a565b94506106b26020870161055a565b9350604086013567ffffffffffffffff808211156106ce578283fd5b6106da89838a01610576565b945060608801359150808211156106ef578283fd5b6106fb89838a01610576565b93506080880135915080821115610710578283fd5b5061071d888289016105f8565b9150509295509295909350565b6000806000806080858703121561073f578384fd5b6107488561055a565b93506107566020860161055a565b925060408501359150606085013567ffffffffffffffff811115610778578182fd5b610784878288016105f8565b91505092959194509250565b600080600080600060a086880312156107a7578081fd5b6107b08661055a565b94506107be6020870161055a565b93506040860135925060608601359150608086013567ffffffffffffffff8111156107e7578182fd5b61071d888289016105f8565b600080600080600060a0868803121561080a578081fd5b6108138661055a565b9450602086013593506108286040870161055a565b94979396509394606081013594506080013592915050565b600060208284031215610851578081fd5b8151801515811461067d578182fd5b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260806060820181905260009082015260a00190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b039290921682521515602082015260400190565b6001600160a01b03929092168252602082015260400190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60405181810167ffffffffffffffff811182821017156109fc576109fc610a04565b604052919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220cd33f5455fb90a61b692a74421d390cebaf958bc51d8adc6d4e53c5dcf81892264736f6c63430008000033';
