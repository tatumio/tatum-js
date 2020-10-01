**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/xlm"

# Module: "src/blockchain/xlm"

## Index

### Functions

* [xlmBroadcast](_src_blockchain_xlm_.md#xlmbroadcast)
* [xlmGetAccountInfo](_src_blockchain_xlm_.md#xlmgetaccountinfo)
* [xlmGetAccountTransactions](_src_blockchain_xlm_.md#xlmgetaccounttransactions)
* [xlmGetCurrentLedger](_src_blockchain_xlm_.md#xlmgetcurrentledger)
* [xlmGetFee](_src_blockchain_xlm_.md#xlmgetfee)
* [xlmGetLedger](_src_blockchain_xlm_.md#xlmgetledger)
* [xlmGetLedgerTx](_src_blockchain_xlm_.md#xlmgetledgertx)
* [xlmGetTransaction](_src_blockchain_xlm_.md#xlmgettransaction)

## Functions

### xlmBroadcast

▸ `Const`**xlmBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/xlm.ts:15](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L15)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### xlmGetAccountInfo

▸ `Const`**xlmGetAccountInfo**(`account`: string): Promise\<{ sequence: string  }>

*Defined in [src/blockchain/xlm.ts:8](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetAccountInfo" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`account` | string |

**Returns:** Promise\<{ sequence: string  }>

___

### xlmGetAccountTransactions

▸ `Const`**xlmGetAccountTransactions**(`address`: string): Promise\<any>

*Defined in [src/blockchain/xlm.ts:59](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L59)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetAccountTx" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** Promise\<any>

___

### xlmGetCurrentLedger

▸ `Const`**xlmGetCurrentLedger**(): Promise\<any>

*Defined in [src/blockchain/xlm.ts:24](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetLastClosedLedger" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<any>

___

### xlmGetFee

▸ `Const`**xlmGetFee**(): Promise\<any>

*Defined in [src/blockchain/xlm.ts:31](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L31)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetFee" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<any>

___

### xlmGetLedger

▸ `Const`**xlmGetLedger**(`i`: number): Promise\<any>

*Defined in [src/blockchain/xlm.ts:38](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L38)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetLedger" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`i` | number |

**Returns:** Promise\<any>

___

### xlmGetLedgerTx

▸ `Const`**xlmGetLedgerTx**(`i`: number): Promise\<any>

*Defined in [src/blockchain/xlm.ts:45](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L45)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetLedgerTx" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`i` | number |

**Returns:** Promise\<any>

___

### xlmGetTransaction

▸ `Const`**xlmGetTransaction**(`hash`: string): Promise\<any>

*Defined in [src/blockchain/xlm.ts:52](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xlm.ts#L52)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<any>
