**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/bcash"

# Module: "src/blockchain/bcash"

## Index

### Functions

* [bcashBroadcast](_src_blockchain_bcash_.md#bcashbroadcast)
* [bcashGetBlock](_src_blockchain_bcash_.md#bcashgetblock)
* [bcashGetBlockHash](_src_blockchain_bcash_.md#bcashgetblockhash)
* [bcashGetCurrentBlock](_src_blockchain_bcash_.md#bcashgetcurrentblock)
* [bcashGetTransaction](_src_blockchain_bcash_.md#bcashgettransaction)
* [bcashGetTxForAccount](_src_blockchain_bcash_.md#bcashgettxforaccount)

## Functions

### bcashBroadcast

▸ `Const`**bcashBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/bcash.ts:8](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bcash.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BchBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### bcashGetBlock

▸ `Const`**bcashGetBlock**(`hash`: string): Promise\<[BchBlock](../interfaces/_src_model_response_bch_bchblock_.bchblock.md)>

*Defined in [src/blockchain/bcash.ts:24](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bcash.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BchGetBlock" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[BchBlock](../interfaces/_src_model_response_bch_bchblock_.bchblock.md)>

___

### bcashGetBlockHash

▸ `Const`**bcashGetBlockHash**(`i`: number): Promise\<[BlockHash](../interfaces/_src_model_response_common_blockhash_.blockhash.md)>

*Defined in [src/blockchain/bcash.ts:31](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bcash.ts#L31)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BchGetBlockHash" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`i` | number |

**Returns:** Promise\<[BlockHash](../interfaces/_src_model_response_common_blockhash_.blockhash.md)>

___

### bcashGetCurrentBlock

▸ `Const`**bcashGetCurrentBlock**(): Promise\<[BchInfo](../interfaces/_src_model_response_bch_bchinfo_.bchinfo.md)>

*Defined in [src/blockchain/bcash.ts:17](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bcash.ts#L17)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BchGetBlockChainInfo" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<[BchInfo](../interfaces/_src_model_response_bch_bchinfo_.bchinfo.md)>

___

### bcashGetTransaction

▸ `Const`**bcashGetTransaction**(`hash`: string): Promise\<[BchTx](../interfaces/_src_model_response_bch_bchtx_.bchtx.md)>

*Defined in [src/blockchain/bcash.ts:46](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bcash.ts#L46)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BchGetRawTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[BchTx](../interfaces/_src_model_response_bch_bchtx_.bchtx.md)>

___

### bcashGetTxForAccount

▸ `Const`**bcashGetTxForAccount**(`address`: string, `skip`: number): Promise\<[BchTx](../interfaces/_src_model_response_bch_bchtx_.bchtx.md)[]>

*Defined in [src/blockchain/bcash.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bcash.ts#L38)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BchGetTxByAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`address` | string | - |
`skip` | number | 0 |

**Returns:** Promise\<[BchTx](../interfaces/_src_model_response_bch_bchtx_.bchtx.md)[]>
