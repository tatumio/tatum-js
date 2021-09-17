export const abi =  [
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
                'name': '',
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
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6109788061007d6000396000f3fe60806040526004361061007f5760003560e01c8063f23a6e611161004e578063f23a6e611461011a578063f2881e211461013a578063f2fde38b1461014d578063f7e290a41461016d57610086565b8063150b7a021461008b578063715018a6146100c15780638da5cb5b146100d8578063bc197c81146100fa57610086565b3661008657005b600080fd5b34801561009757600080fd5b506100ab6100a6366004610672565b61018d565b6040516100b8919061083b565b60405180910390f35b3480156100cd57600080fd5b506100d661019d565b005b3480156100e457600080fd5b506100ed61022f565b6040516100b89190610788565b34801561010657600080fd5b506100ab6101153660046105cc565b61023e565b34801561012657600080fd5b506100ab6101353660046106d8565b61024f565b6100d661014836600461073b565b610260565b34801561015957600080fd5b506100d66101683660046105ab565b61036f565b34801561017957600080fd5b506100d661018836600461073b565b61042f565b630a85bd0160e11b949350505050565b6101a561049e565b6001600160a01b03166101b661022f565b6001600160a01b0316146101e55760405162461bcd60e51b81526004016101dc906108cd565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b83600114156102d057604051635c46a7ef60e11b81526001600160a01b0386169063b88d4fde906102999030908790869060040161079c565b600060405180830381600087803b1580156102b357600080fd5b505af11580156102c7573d6000803e3d6000fd5b50505050610368565b836002141561030b57604051637921219560e11b81526001600160a01b0386169063f242432a906102999030908790869088906004016107cf565b8360031415610350576040516001600160a01b0384169083156108fc029084906000818181858888f1935050505015801561034a573d6000803e3d6000fd5b50610368565b60405162461bcd60e51b81526004016101dc90610850565b5050505050565b61037761049e565b6001600160a01b031661038861022f565b6001600160a01b0316146103ae5760405162461bcd60e51b81526004016101dc906108cd565b6001600160a01b0381166103d45760405162461bcd60e51b81526004016101dc90610887565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b83600114156104665760405163095ea7b360e01b81526001600160a01b0386169063095ea7b3906102999086908590600401610822565b83600214156103505760405163a22cb46560e01b81526001600160a01b0386169063a22cb46590610299908690600190600401610807565b3390565b80356001600160a01b03811681146104b957600080fd5b919050565b600082601f8301126104ce578081fd5b8135602067ffffffffffffffff8211156104ea576104ea61092c565b8082026104f8828201610902565b838152828101908684018388018501891015610512578687fd5b8693505b85841015610534578035835260019390930192918401918401610516565b50979650505050505050565b600082601f830112610550578081fd5b813567ffffffffffffffff81111561056a5761056a61092c565b61057d601f8201601f1916602001610902565b818152846020838601011115610591578283fd5b816020850160208301379081016020019190915292915050565b6000602082840312156105bc578081fd5b6105c5826104a2565b9392505050565b600080600080600060a086880312156105e3578081fd5b6105ec866104a2565b94506105fa602087016104a2565b9350604086013567ffffffffffffffff80821115610616578283fd5b61062289838a016104be565b94506060880135915080821115610637578283fd5b61064389838a016104be565b93506080880135915080821115610658578283fd5b5061066588828901610540565b9150509295509295909350565b60008060008060808587031215610687578384fd5b610690856104a2565b935061069e602086016104a2565b925060408501359150606085013567ffffffffffffffff8111156106c0578182fd5b6106cc87828801610540565b91505092959194509250565b600080600080600060a086880312156106ef578081fd5b6106f8866104a2565b9450610706602087016104a2565b93506040860135925060608601359150608086013567ffffffffffffffff81111561072f578182fd5b61066588828901610540565b600080600080600060a08688031215610752578081fd5b61075b866104a2565b945060208601359350610770604087016104a2565b94979396509394606081013594506080013592915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260806060820181905260009082015260a00190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b039290921682521515602082015260400190565b6001600160a01b03929092168252602082015260400190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60405181810167ffffffffffffffff811182821017156109245761092461092c565b604052919050565b634e487b7160e01b600052604160045260246000fdfea264697066735822122055f5a9dd37d77408d839c16a9a38f097cf78be009a87a443f5a1bbd1931bebe664736f6c63430008000033';
