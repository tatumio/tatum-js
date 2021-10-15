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
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b61090c8061007d6000396000f3fe6080604052600436106100745760003560e01c8063f23a6e611161004e578063f23a6e61146100ef578063f2881e211461010f578063f2fde38b14610122578063f7e290a4146101425761007b565b8063715018a6146100805780638da5cb5b14610097578063bc197c81146100c25761007b565b3661007b57005b600080fd5b34801561008c57600080fd5b50610095610162565b005b3480156100a357600080fd5b506100ac6101f4565b6040516100b9919061074f565b60405180910390f35b3480156100ce57600080fd5b506100e26100dd3660046105d9565b610203565b6040516100b991906107cf565b3480156100fb57600080fd5b506100e261010a36600461067f565b610214565b61009561011d3660046106e2565b610225565b34801561012e57600080fd5b5061009561013d3660046105b8565b610380565b34801561014e57600080fd5b5061009561015d3660046106e2565b610440565b61016a6104ab565b6001600160a01b031661017b6101f4565b6001600160a01b0316146101aa5760405162461bcd60e51b81526004016101a190610861565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b836102b05760405163a9059cbb60e01b81526001600160a01b0386169063a9059cbb9061025890869086906004016107b6565b602060405180830381600087803b15801561027257600080fd5b505af1158015610286573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102aa919061072f565b50610379565b836002141561032257604051637921219560e11b81526001600160a01b0386169063f242432a906102eb903090879086908890600401610763565b600060405180830381600087803b15801561030557600080fd5b505af1158015610319573d6000803e3d6000fd5b50505050610379565b8360031415610361576040516001600160a01b0384169083156108fc029084906000818181858888f193505050501580156102aa573d6000803e3d6000fd5b60405162461bcd60e51b81526004016101a1906107e4565b5050505050565b6103886104ab565b6001600160a01b03166103996101f4565b6001600160a01b0316146103bf5760405162461bcd60e51b81526004016101a190610861565b6001600160a01b0381166103e55760405162461bcd60e51b81526004016101a19061081b565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b836104735760405163095ea7b360e01b81526001600160a01b0386169063095ea7b39061025890869086906004016107b6565b83600214156103615760405163a22cb46560e01b81526001600160a01b0386169063a22cb465906102eb90869060019060040161079b565b3390565b80356001600160a01b03811681146104c657600080fd5b919050565b600082601f8301126104db578081fd5b8135602067ffffffffffffffff8211156104f7576104f76108c0565b808202610505828201610896565b83815282810190868401838801850189101561051f578687fd5b8693505b85841015610541578035835260019390930192918401918401610523565b50979650505050505050565b600082601f83011261055d578081fd5b813567ffffffffffffffff811115610577576105776108c0565b61058a601f8201601f1916602001610896565b81815284602083860101111561059e578283fd5b816020850160208301379081016020019190915292915050565b6000602082840312156105c9578081fd5b6105d2826104af565b9392505050565b600080600080600060a086880312156105f0578081fd5b6105f9866104af565b9450610607602087016104af565b9350604086013567ffffffffffffffff80821115610623578283fd5b61062f89838a016104cb565b94506060880135915080821115610644578283fd5b61065089838a016104cb565b93506080880135915080821115610665578283fd5b506106728882890161054d565b9150509295509295909350565b600080600080600060a08688031215610696578081fd5b61069f866104af565b94506106ad602087016104af565b93506040860135925060608601359150608086013567ffffffffffffffff8111156106d6578182fd5b6106728882890161054d565b600080600080600060a086880312156106f9578081fd5b610702866104af565b945060208601359350610717604087016104af565b94979396509394606081013594506080013592915050565b600060208284031215610740578081fd5b815180151581146105d2578182fd5b6001600160a01b0391909116815260200190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b039290921682521515602082015260400190565b6001600160a01b03929092168252602082015260400190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60405181810167ffffffffffffffff811182821017156108b8576108b86108c0565b604052919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220eacff5687446377530d2d310535a52166df7fd19c9e787dffa50fbeed60eccca64736f6c63430008000033';
