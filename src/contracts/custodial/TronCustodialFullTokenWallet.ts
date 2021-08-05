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
];
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6105748061007d6000396000f3fe6080604052600436106100435760003560e01c8063715018a61461004f5780638da5cb5b14610066578063f2881e2114610091578063f2fde38b146100a45761004a565b3661004a57005b600080fd5b34801561005b57600080fd5b506100646100c4565b005b34801561007257600080fd5b5061007b610156565b604051610088919061042c565b60405180910390f35b61006461009f3660046103bf565b610165565b3480156100b057600080fd5b506100646100bf36600461039e565b6102be565b6100cc61037e565b6001600160a01b03166100dd610156565b6001600160a01b03161461010c5760405162461bcd60e51b815260040161010390610509565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b836101f05760405163a9059cbb60e01b81526001600160a01b0386169063a9059cbb906101989086908690600401610473565b602060405180830381600087803b1580156101b257600080fd5b505af11580156101c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ea919061040c565b506102b7565b836001141561026057604051635c46a7ef60e11b81526001600160a01b0386169063b88d4fde9061022990309087908690600401610440565b600060405180830381600087803b15801561024357600080fd5b505af1158015610257573d6000803e3d6000fd5b505050506102b7565b836003141561029f576040516001600160a01b0384169083156108fc029084906000818181858888f193505050501580156101ea573d6000803e3d6000fd5b60405162461bcd60e51b81526004016101039061048c565b5050505050565b6102c661037e565b6001600160a01b03166102d7610156565b6001600160a01b0316146102fd5760405162461bcd60e51b815260040161010390610509565b6001600160a01b0381166103235760405162461bcd60e51b8152600401610103906104c3565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b80356001600160a01b038116811461039957600080fd5b919050565b6000602082840312156103af578081fd5b6103b882610382565b9392505050565b600080600080600060a086880312156103d6578081fd5b6103df86610382565b9450602086013593506103f460408701610382565b94979396509394606081013594506080013592915050565b60006020828403121561041d578081fd5b815180151581146103b8578182fd5b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260806060820181905260009082015260a00190565b6001600160a01b03929092168252602082015260400190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260408201526060019056fea2646970667358221220fca07eee1ed83f8a9ed544b7095a65727e3708fd11ef9f7fd43ff3bae5e879eb64736f6c63430008000033';
