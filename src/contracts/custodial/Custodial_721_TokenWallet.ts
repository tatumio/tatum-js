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
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6106708061007d6000396000f3fe6080604052600436106100595760003560e01c8063150b7a0214610065578063715018a61461009b5780638da5cb5b146100b2578063f2881e21146100d4578063f2fde38b146100e7578063f7e290a41461010757610060565b3661006057005b600080fd5b34801561007157600080fd5b506100856100803660046103e4565b610127565b604051610092919061055d565b60405180910390f35b3480156100a757600080fd5b506100b0610137565b005b3480156100be57600080fd5b506100c76101c9565b60405161009291906104fd565b6100b06100e23660046104b0565b6101d8565b3480156100f357600080fd5b506100b06101023660046103c3565b6102ac565b34801561011357600080fd5b506100b06101223660046104b0565b61036c565b630a85bd0160e11b949350505050565b61013f6103a3565b6001600160a01b03166101506101c9565b6001600160a01b03161461017f5760405162461bcd60e51b8152600401610176906105ef565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b836001141561024857604051635c46a7ef60e11b81526001600160a01b0386169063b88d4fde9061021190309087908690600401610511565b600060405180830381600087803b15801561022b57600080fd5b505af115801561023f573d6000803e3d6000fd5b505050506102a5565b836003141561028d576040516001600160a01b0384169083156108fc029084906000818181858888f19350505050158015610287573d6000803e3d6000fd5b506102a5565b60405162461bcd60e51b815260040161017690610572565b5050505050565b6102b46103a3565b6001600160a01b03166102c56101c9565b6001600160a01b0316146102eb5760405162461bcd60e51b8152600401610176906105ef565b6001600160a01b0381166103115760405162461bcd60e51b8152600401610176906105a9565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b836001141561028d5760405163095ea7b360e01b81526001600160a01b0386169063095ea7b3906102119086908590600401610544565b3390565b80356001600160a01b03811681146103be57600080fd5b919050565b6000602082840312156103d4578081fd5b6103dd826103a7565b9392505050565b600080600080608085870312156103f9578283fd5b610402856103a7565b935060206104118187016103a7565b935060408601359250606086013567ffffffffffffffff80821115610434578384fd5b818801915088601f830112610447578384fd5b81358181111561045957610459610624565b604051601f8201601f191681018501838111828210171561047c5761047c610624565b60405281815283820185018b1015610492578586fd5b81858501868301379081019093019390935250939692955090935050565b600080600080600060a086880312156104c7578081fd5b6104d0866103a7565b9450602086013593506104e5604087016103a7565b94979396509394606081013594506080013592915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260806060820181905260009082015260a00190565b6001600160a01b03929092168252602082015260400190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220d28adaa89d6902bd63e6c012060b78e2c59a05729fd814a5578dd8a97b14c04264736f6c63430008000033';
