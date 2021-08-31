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
                'name': '',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': '',
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
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b61081b8061007d6000396000f3fe6080604052600436106100745760003560e01c8063f23a6e611161004e578063f23a6e61146100ef578063f2881e211461010f578063f2fde38b14610122578063f7e290a4146101425761007b565b8063715018a6146100805780638da5cb5b14610097578063bc197c81146100c25761007b565b3661007b57005b600080fd5b34801561008c57600080fd5b50610095610162565b005b3480156100a357600080fd5b506100ac6101f4565b6040516100b99190610677565b60405180910390f35b3480156100ce57600080fd5b506100e26100dd366004610521565b610203565b6040516100b991906106de565b3480156100fb57600080fd5b506100e261010a3660046105c7565b610214565b61009561011d36600461062a565b610225565b34801561012e57600080fd5b5061009561013d366004610500565b6102fb565b34801561014e57600080fd5b5061009561015d36600461062a565b6103bb565b61016a6103f3565b6001600160a01b031661017b6101f4565b6001600160a01b0316146101aa5760405162461bcd60e51b81526004016101a190610770565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b836002141561029757604051637921219560e11b81526001600160a01b0386169063f242432a9061026090309087908690889060040161068b565b600060405180830381600087803b15801561027a57600080fd5b505af115801561028e573d6000803e3d6000fd5b505050506102f4565b83600314156102dc576040516001600160a01b0384169083156108fc029084906000818181858888f193505050501580156102d6573d6000803e3d6000fd5b506102f4565b60405162461bcd60e51b81526004016101a1906106f3565b5050505050565b6103036103f3565b6001600160a01b03166103146101f4565b6001600160a01b03161461033a5760405162461bcd60e51b81526004016101a190610770565b6001600160a01b0381166103605760405162461bcd60e51b81526004016101a19061072a565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b83600214156102dc5760405163a22cb46560e01b81526001600160a01b0386169063a22cb465906102609086906001906004016106c3565b3390565b80356001600160a01b038116811461040e57600080fd5b919050565b600082601f830112610423578081fd5b8135602067ffffffffffffffff82111561043f5761043f6107cf565b80820261044d8282016107a5565b838152828101908684018388018501891015610467578687fd5b8693505b8584101561048957803583526001939093019291840191840161046b565b50979650505050505050565b600082601f8301126104a5578081fd5b813567ffffffffffffffff8111156104bf576104bf6107cf565b6104d2601f8201601f19166020016107a5565b8181528460208386010111156104e6578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610511578081fd5b61051a826103f7565b9392505050565b600080600080600060a08688031215610538578081fd5b610541866103f7565b945061054f602087016103f7565b9350604086013567ffffffffffffffff8082111561056b578283fd5b61057789838a01610413565b9450606088013591508082111561058c578283fd5b61059889838a01610413565b935060808801359150808211156105ad578283fd5b506105ba88828901610495565b9150509295509295909350565b600080600080600060a086880312156105de578081fd5b6105e7866103f7565b94506105f5602087016103f7565b93506040860135925060608601359150608086013567ffffffffffffffff81111561061e578182fd5b6105ba88828901610495565b600080600080600060a08688031215610641578081fd5b61064a866103f7565b94506020860135935061065f604087016103f7565b94979396509394606081013594506080013592915050565b6001600160a01b0391909116815260200190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b039290921682521515602082015260400190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60405181810167ffffffffffffffff811182821017156107c7576107c76107cf565b604052919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220c9a6790397c80c714e3bd192377269b969f3daa316dbceda4f39e611f36ade8064736f6c63430008000033';
