**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/litecoin"

# Module: "src/blockchain/litecoin"

## Index

### Functions

* [ltcBroadcast](_src_blockchain_litecoin_.md#ltcbroadcast)
* [ltcGetBlock](_src_blockchain_litecoin_.md#ltcgetblock)
* [ltcGetBlockHash](_src_blockchain_litecoin_.md#ltcgetblockhash)
* [ltcGetCurrentBlock](_src_blockchain_litecoin_.md#ltcgetcurrentblock)
* [ltcGetTransaction](_src_blockchain_litecoin_.md#ltcgettransaction)
* [ltcGetTxForAccount](_src_blockchain_litecoin_.md#ltcgettxforaccount)
* [ltcGetUTXO](_src_blockchain_litecoin_.md#ltcgetutxo)

## Functions

### ltcBroadcast

▸ `Const`**ltcBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/litecoin.ts:8](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### ltcGetBlock

▸ `Const`**ltcGetBlock**(`hash`: string): Promise\<[LtcBlock](../interfaces/_src_model_response_ltc_ltcblock_.ltcblock.md)>

*Defined in [src/blockchain/litecoin.ts:24](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcGetBlock" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[LtcBlock](../interfaces/_src_model_response_ltc_ltcblock_.ltcblock.md)>

___

### ltcGetBlockHash

▸ `Const`**ltcGetBlockHash**(`i`: number): Promise\<[BlockHash](../interfaces/_src_model_response_common_blockhash_.blockhash.md)>

*Defined in [src/blockchain/litecoin.ts:31](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L31)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcGetBlockHash" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`i` | number |

**Returns:** Promise\<[BlockHash](../interfaces/_src_model_response_common_blockhash_.blockhash.md)>

___

### ltcGetCurrentBlock

▸ `Const`**ltcGetCurrentBlock**(): Promise\<[LtcInfo](../interfaces/_src_model_response_ltc_ltcinfo_.ltcinfo.md)>

*Defined in [src/blockchain/litecoin.ts:17](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L17)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<[LtcInfo](../interfaces/_src_model_response_ltc_ltcinfo_.ltcinfo.md)>

___

### ltcGetTransaction

▸ `Const`**ltcGetTransaction**(`hash`: string): Promise\<[LtcTx](../interfaces/_src_model_response_ltc_ltctx_.ltctx.md)>

*Defined in [src/blockchain/litecoin.ts:53](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L53)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcGetRawTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[LtcTx](../interfaces/_src_model_response_ltc_ltctx_.ltctx.md)>

___

### ltcGetTxForAccount

▸ `Const`**ltcGetTxForAccount**(`address`: string, `pageSize`: number, `offset`: number): Promise\<[LtcTx](../interfaces/_src_model_response_ltc_ltctx_.ltctx.md)[]>

*Defined in [src/blockchain/litecoin.ts:45](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L45)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcGetTxByAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`address` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[LtcTx](../interfaces/_src_model_response_ltc_ltctx_.ltctx.md)[]>

___

### ltcGetUTXO

▸ `Const`**ltcGetUTXO**(`hash`: string, `i`: number): Promise\<[LtcUTXO](../interfaces/_src_model_response_ltc_ltxutxo_.ltcutxo.md)>

*Defined in [src/blockchain/litecoin.ts:38](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/blockchain/litecoin.ts#L38)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/LtcGetUTXO" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |
`i` | number |

**Returns:** Promise\<[LtcUTXO](../interfaces/_src_model_response_ltc_ltxutxo_.ltcutxo.md)>
