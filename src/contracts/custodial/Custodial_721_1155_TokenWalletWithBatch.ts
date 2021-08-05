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
                'internalType': 'address[]',
                'name': 'tokenAddress',
                'type': 'address[]'
            },
            {
                'internalType': 'uint256[]',
                'name': 'contractType',
                'type': 'uint256[]'
            },
            {
                'internalType': 'address[]',
                'name': 'recipient',
                'type': 'address[]'
            },
            {
                'internalType': 'uint256[]',
                'name': 'amount',
                'type': 'uint256[]'
            },
            {
                'internalType': 'uint256[]',
                'name': 'tokenId',
                'type': 'uint256[]'
            }
        ],
        'name': 'transferBatch',
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
];
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b610c9b8061007d6000396000f3fe6080604052600436106100745760003560e01c8063bc197c811161004e578063bc197c81146100d5578063f23a6e6114610102578063f2881e2114610122578063f2fde38b146101355761007b565b8063715018a6146100805780638da5cb5b14610097578063966f197c146100c25761007b565b3661007b57005b600080fd5b34801561008c57600080fd5b50610095610155565b005b3480156100a357600080fd5b506100ac6101e7565b6040516100b99190610a94565b60405180910390f35b6100956100d03660046109d5565b6101f6565b3480156100e157600080fd5b506100f56100f036600461087f565b610533565b6040516100b99190610b13565b34801561010e57600080fd5b506100f561011d366004610925565b610544565b610095610130366004610988565b610555565b34801561014157600080fd5b5061009561015036600461085e565b610646565b61015d610706565b6001600160a01b031661016e6101e7565b6001600160a01b03161461019d5760405162461bcd60e51b815260040161019490610ba5565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b835185511461020457600080fd5b835183511461021257600080fd5b815183511461022057600080fd5b805182511461022e57600080fd5b60005b855181101561052b5784818151811061025a57634e487b7160e01b600052603260045260246000fd5b6020026020010151600114156103465785818151811061028a57634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b031663b88d4fde308684815181106102c157634e487b7160e01b600052603260045260246000fd5b60200260200101518585815181106102e957634e487b7160e01b600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b815260040161030f93929190610aa8565b600060405180830381600087803b15801561032957600080fd5b505af115801561033d573d6000803e3d6000fd5b50505050610519565b84818151811061036657634e487b7160e01b600052603260045260246000fd5b6020026020010151600214156104445785818151811061039657634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b031663f242432a308684815181106103cd57634e487b7160e01b600052603260045260246000fd5b60200260200101518585815181106103f557634e487b7160e01b600052603260045260246000fd5b602002602001015187868151811061041d57634e487b7160e01b600052603260045260246000fd5b60200260200101516040518563ffffffff1660e01b815260040161030f9493929190610adb565b84818151811061046457634e487b7160e01b600052603260045260246000fd5b6020026020010151600314156105015783818151811061049457634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b03166108fc8483815181106104c857634e487b7160e01b600052603260045260246000fd5b60200260200101519081150290604051600060405180830381858888f193505050501580156104fb573d6000803e3d6000fd5b50610519565b60405162461bcd60e51b815260040161019490610b28565b8061052381610c28565b915050610231565b505050505050565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b83600114156105c557604051635c46a7ef60e11b81526001600160a01b0386169063b88d4fde9061058e90309087908690600401610aa8565b600060405180830381600087803b1580156105a857600080fd5b505af11580156105bc573d6000803e3d6000fd5b5050505061063f565b836002141561060057604051637921219560e11b81526001600160a01b0386169063f242432a9061058e903090879086908890600401610adb565b8360031415610501576040516001600160a01b0384169083156108fc029084906000818181858888f1935050505015801561052b573d6000803e3d6000fd5b5050505050565b61064e610706565b6001600160a01b031661065f6101e7565b6001600160a01b0316146106855760405162461bcd60e51b815260040161019490610ba5565b6001600160a01b0381166106ab5760405162461bcd60e51b815260040161019490610b5f565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b80356001600160a01b038116811461072157600080fd5b919050565b600082601f830112610736578081fd5b8135602061074b61074683610c04565b610bda565b8281528181019085830183850287018401881015610767578586fd5b855b8581101561078c5761077a8261070a565b84529284019290840190600101610769565b5090979650505050505050565b600082601f8301126107a9578081fd5b813560206107b961074683610c04565b82815281810190858301838502870184018810156107d5578586fd5b855b8581101561078c578135845292840192908401906001016107d7565b600082601f830112610803578081fd5b813567ffffffffffffffff81111561081d5761081d610c4f565b610830601f8201601f1916602001610bda565b818152846020838601011115610844578283fd5b816020850160208301379081016020019190915292915050565b60006020828403121561086f578081fd5b6108788261070a565b9392505050565b600080600080600060a08688031215610896578081fd5b61089f8661070a565b94506108ad6020870161070a565b9350604086013567ffffffffffffffff808211156108c9578283fd5b6108d589838a01610799565b945060608801359150808211156108ea578283fd5b6108f689838a01610799565b9350608088013591508082111561090b578283fd5b50610918888289016107f3565b9150509295509295909350565b600080600080600060a0868803121561093c578081fd5b6109458661070a565b94506109536020870161070a565b93506040860135925060608601359150608086013567ffffffffffffffff81111561097c578182fd5b610918888289016107f3565b600080600080600060a0868803121561099f578081fd5b6109a88661070a565b9450602086013593506109bd6040870161070a565b94979396509394606081013594506080013592915050565b600080600080600060a086880312156109ec578081fd5b853567ffffffffffffffff80821115610a03578283fd5b610a0f89838a01610726565b96506020880135915080821115610a24578283fd5b610a3089838a01610799565b95506040880135915080821115610a45578283fd5b610a5189838a01610726565b94506060880135915080821115610a66578283fd5b610a7289838a01610799565b93506080880135915080821115610a87578283fd5b5061091888828901610799565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260806060820181905260009082015260a00190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60405181810167ffffffffffffffff81118282101715610bfc57610bfc610c4f565b604052919050565b600067ffffffffffffffff821115610c1e57610c1e610c4f565b5060209081020190565b6000600019821415610c4857634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfea26469706673582212205d82b87ee7a4f9f5700e34797288506b20e3761502e1fd9bd52fe3d8ffde627864736f6c63430008000033';
