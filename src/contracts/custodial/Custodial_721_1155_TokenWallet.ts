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
export const bytecode = '0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6108aa8061007d6000396000f3fe6080604052600436106100745760003560e01c8063bc197c811161004e578063bc197c81146100ef578063f23a6e611461010f578063f2881e211461012f578063f2fde38b146101425761007b565b8063150b7a0214610080578063715018a6146100b65780638da5cb5b146100cd5761007b565b3661007b57005b600080fd5b34801561008c57600080fd5b506100a061009b3660046105d8565b610162565b6040516100ad919061076d565b60405180910390f35b3480156100c257600080fd5b506100cb610172565b005b3480156100d957600080fd5b506100e2610204565b6040516100ad91906106ee565b3480156100fb57600080fd5b506100a061010a366004610532565b610213565b34801561011b57600080fd5b506100a061012a36600461063e565b610224565b6100cb61013d3660046106a1565b610235565b34801561014e57600080fd5b506100cb61015d366004610511565b610344565b630a85bd0160e11b949350505050565b61017a610404565b6001600160a01b031661018b610204565b6001600160a01b0316146101ba5760405162461bcd60e51b81526004016101b1906107ff565b60405180910390fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b63bc197c8160e01b95945050505050565b63f23a6e6160e01b95945050505050565b83600114156102a557604051635c46a7ef60e11b81526001600160a01b0386169063b88d4fde9061026e90309087908690600401610702565b600060405180830381600087803b15801561028857600080fd5b505af115801561029c573d6000803e3d6000fd5b5050505061033d565b83600214156102e057604051637921219560e11b81526001600160a01b0386169063f242432a9061026e903090879086908890600401610735565b8360031415610325576040516001600160a01b0384169083156108fc029084906000818181858888f1935050505015801561031f573d6000803e3d6000fd5b5061033d565b60405162461bcd60e51b81526004016101b190610782565b5050505050565b61034c610404565b6001600160a01b031661035d610204565b6001600160a01b0316146103835760405162461bcd60e51b81526004016101b1906107ff565b6001600160a01b0381166103a95760405162461bcd60e51b81526004016101b1906107b9565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b80356001600160a01b038116811461041f57600080fd5b919050565b600082601f830112610434578081fd5b8135602067ffffffffffffffff8211156104505761045061085e565b80820261045e828201610834565b838152828101908684018388018501891015610478578687fd5b8693505b8584101561049a57803583526001939093019291840191840161047c565b50979650505050505050565b600082601f8301126104b6578081fd5b813567ffffffffffffffff8111156104d0576104d061085e565b6104e3601f8201601f1916602001610834565b8181528460208386010111156104f7578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610522578081fd5b61052b82610408565b9392505050565b600080600080600060a08688031215610549578081fd5b61055286610408565b945061056060208701610408565b9350604086013567ffffffffffffffff8082111561057c578283fd5b61058889838a01610424565b9450606088013591508082111561059d578283fd5b6105a989838a01610424565b935060808801359150808211156105be578283fd5b506105cb888289016104a6565b9150509295509295909350565b600080600080608085870312156105ed578384fd5b6105f685610408565b935061060460208601610408565b925060408501359150606085013567ffffffffffffffff811115610626578182fd5b610632878288016104a6565b91505092959194509250565b600080600080600060a08688031215610655578081fd5b61065e86610408565b945061066c60208701610408565b93506040860135925060608601359150608086013567ffffffffffffffff811115610695578182fd5b6105cb888289016104a6565b600080600080600060a086880312156106b8578081fd5b6106c186610408565b9450602086013593506106d660408701610408565b94979396509394606081013594506080013592915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260806060820181905260009082015260a00190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160e01b031991909116815260200190565b60208082526019908201527f556e737570706f7274656420636f6e7472616374207479706500000000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60405181810167ffffffffffffffff811182821017156108565761085661085e565b604052919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220bc018fd9eafe54cd1d5b0bc856fc264ed0f1bb8b5d4c70d472dabf2ab533641464736f6c63430008000033'
