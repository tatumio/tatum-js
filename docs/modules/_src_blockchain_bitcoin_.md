**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/bitcoin"

# Module: "src/blockchain/bitcoin"

## Index

### Functions

* [btcBroadcast](_src_blockchain_bitcoin_.md#btcbroadcast)
* [btcGetBlock](_src_blockchain_bitcoin_.md#btcgetblock)
* [btcGetBlockHash](_src_blockchain_bitcoin_.md#btcgetblockhash)
* [btcGetCurrentBlock](_src_blockchain_bitcoin_.md#btcgetcurrentblock)
* [btcGetTransaction](_src_blockchain_bitcoin_.md#btcgettransaction)
* [btcGetTxForAccount](_src_blockchain_bitcoin_.md#btcgettxforaccount)
* [btcGetUTXO](_src_blockchain_bitcoin_.md#btcgetutxo)

## Functions

### btcBroadcast

▸ `Const`**btcBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/bitcoin.ts:8](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### btcGetBlock

▸ `Const`**btcGetBlock**(`hash`: string): Promise\<[BtcBlock](../interfaces/_src_model_response_btc_btcblock_.btcblock.md)>

*Defined in [src/blockchain/bitcoin.ts:24](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetBlock" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[BtcBlock](../interfaces/_src_model_response_btc_btcblock_.btcblock.md)>

___

### btcGetBlockHash

▸ `Const`**btcGetBlockHash**(`i`: number): Promise\<[BlockHash](../interfaces/_src_model_response_common_blockhash_.blockhash.md)>

*Defined in [src/blockchain/bitcoin.ts:31](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L31)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetBlockHash" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`i` | number |

**Returns:** Promise\<[BlockHash](../interfaces/_src_model_response_common_blockhash_.blockhash.md)>

___

### btcGetCurrentBlock

▸ `Const`**btcGetCurrentBlock**(): Promise\<[BtcInfo](../interfaces/_src_model_response_btc_btcinfo_.btcinfo.md)>

*Defined in [src/blockchain/bitcoin.ts:17](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L17)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<[BtcInfo](../interfaces/_src_model_response_btc_btcinfo_.btcinfo.md)>

___

### btcGetTransaction

▸ `Const`**btcGetTransaction**(`hash`: string): Promise\<[BtcTx](../interfaces/_src_model_response_btc_btctx_.btctx.md)>

*Defined in [src/blockchain/bitcoin.ts:53](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L53)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetRawTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[BtcTx](../interfaces/_src_model_response_btc_btctx_.btctx.md)>

___

### btcGetTxForAccount

▸ `Const`**btcGetTxForAccount**(`address`: string, `pageSize`: number, `offset`: number): Promise\<[BtcTx](../interfaces/_src_model_response_btc_btctx_.btctx.md)[]>

*Defined in [src/blockchain/bitcoin.ts:45](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L45)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetTxByAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`address` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[BtcTx](../interfaces/_src_model_response_btc_btctx_.btctx.md)[]>

___

### btcGetUTXO

▸ `Const`**btcGetUTXO**(`hash`: string, `i`: number): Promise\<[BtcUTXO](../interfaces/_src_model_response_btc_btcutxo_.btcutxo.md)>

*Defined in [src/blockchain/bitcoin.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/bitcoin.ts#L38)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetUTXO" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |
`i` | number |

**Returns:** Promise\<[BtcUTXO](../interfaces/_src_model_response_btc_btcutxo_.btcutxo.md)>
