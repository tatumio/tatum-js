**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/ethereum"

# Module: "src/blockchain/ethereum"

## Index

### Functions

* [ethBroadcast](_src_blockchain_ethereum_.md#ethbroadcast)
* [ethGetAccountBalance](_src_blockchain_ethereum_.md#ethgetaccountbalance)
* [ethGetAccountErc20Address](_src_blockchain_ethereum_.md#ethgetaccounterc20address)
* [ethGetAccountTransactions](_src_blockchain_ethereum_.md#ethgetaccounttransactions)
* [ethGetBlock](_src_blockchain_ethereum_.md#ethgetblock)
* [ethGetCurrentBlock](_src_blockchain_ethereum_.md#ethgetcurrentblock)
* [ethGetTransaction](_src_blockchain_ethereum_.md#ethgettransaction)
* [ethGetTransactionsCount](_src_blockchain_ethereum_.md#ethgettransactionscount)

## Functions

### ethBroadcast

▸ `Const`**ethBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/ethereum.ts:8](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### ethGetAccountBalance

▸ `Const`**ethGetAccountBalance**(`address`: string): Promise\<number>

*Defined in [src/blockchain/ethereum.ts:39](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L39)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetBalance" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** Promise\<number>

___

### ethGetAccountErc20Address

▸ `Const`**ethGetAccountErc20Address**(`address`: string, `contractAddress`: string): Promise\<number>

*Defined in [src/blockchain/ethereum.ts:46](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L46)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthErc20GetBalance" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |
`contractAddress` | string |

**Returns:** Promise\<number>

___

### ethGetAccountTransactions

▸ `Const`**ethGetAccountTransactions**(`address`: string, `pageSize`: number, `offset`: number): Promise\<[EthTx](../interfaces/_src_model_response_eth_ethtx_.ethtx.md)[]>

*Defined in [src/blockchain/ethereum.ts:61](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L61)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetTransactionByAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`address` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[EthTx](../interfaces/_src_model_response_eth_ethtx_.ethtx.md)[]>

___

### ethGetBlock

▸ `Const`**ethGetBlock**(`hash`: string): Promise\<[EthBlock](../interfaces/_src_model_response_eth_ethblock_.ethblock.md)>

*Defined in [src/blockchain/ethereum.ts:32](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L32)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetBlock" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[EthBlock](../interfaces/_src_model_response_eth_ethblock_.ethblock.md)>

___

### ethGetCurrentBlock

▸ `Const`**ethGetCurrentBlock**(): Promise\<number>

*Defined in [src/blockchain/ethereum.ts:25](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L25)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetCurrentBlock" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<number>

___

### ethGetTransaction

▸ `Const`**ethGetTransaction**(`hash`: string): Promise\<[EthTx](../interfaces/_src_model_response_eth_ethtx_.ethtx.md)>

*Defined in [src/blockchain/ethereum.ts:54](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L54)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[EthTx](../interfaces/_src_model_response_eth_ethtx_.ethtx.md)>

___

### ethGetTransactionsCount

▸ `Const`**ethGetTransactionsCount**(`address`: string): Promise\<number>

*Defined in [src/blockchain/ethereum.ts:17](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/ethereum.ts#L17)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetTransactionCount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** Promise\<number>
