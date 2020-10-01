**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/xrp"

# Module: "src/blockchain/xrp"

## Index

### Functions

* [xrpBroadcast](_src_blockchain_xrp_.md#xrpbroadcast)
* [xrpGetAccountBalance](_src_blockchain_xrp_.md#xrpgetaccountbalance)
* [xrpGetAccountInfo](_src_blockchain_xrp_.md#xrpgetaccountinfo)
* [xrpGetAccountTransactions](_src_blockchain_xrp_.md#xrpgetaccounttransactions)
* [xrpGetCurrentLedger](_src_blockchain_xrp_.md#xrpgetcurrentledger)
* [xrpGetFee](_src_blockchain_xrp_.md#xrpgetfee)
* [xrpGetLedger](_src_blockchain_xrp_.md#xrpgetledger)
* [xrpGetTransaction](_src_blockchain_xrp_.md#xrpgettransaction)

## Functions

### xrpBroadcast

▸ `Const`**xrpBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/xrp.ts:22](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L22)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### xrpGetAccountBalance

▸ `Const`**xrpGetAccountBalance**(`address`: string): Promise\<any>

*Defined in [src/blockchain/xrp.ts:46](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L46)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetAccountBalance" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** Promise\<any>

___

### xrpGetAccountInfo

▸ `Const`**xrpGetAccountInfo**(`account`: string): Promise\<{ account_data: { Sequence: number  } ; ledger_current_index: number  }>

*Defined in [src/blockchain/xrp.ts:15](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L15)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetAccountInfo" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`account` | string |

**Returns:** Promise\<{ account_data: { Sequence: number  } ; ledger_current_index: number  }>

___

### xrpGetAccountTransactions

▸ `Const`**xrpGetAccountTransactions**(`address`: string, `min?`: undefined \| number, `marker?`: undefined \| string): Promise\<any>

*Defined in [src/blockchain/xrp.ts:60](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L60)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetAccountTx" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |
`min?` | undefined \| number |
`marker?` | undefined \| string |

**Returns:** Promise\<any>

___

### xrpGetCurrentLedger

▸ `Const`**xrpGetCurrentLedger**(): Promise\<number>

*Defined in [src/blockchain/xrp.ts:32](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L32)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetLastClosedLedger" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<number>

___

### xrpGetFee

▸ `Const`**xrpGetFee**(): Promise\<{ drops: { base_fee: number  }  }>

*Defined in [src/blockchain/xrp.ts:8](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetFee" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<{ drops: { base_fee: number  }  }>

___

### xrpGetLedger

▸ `Const`**xrpGetLedger**(`i`: number): Promise\<any>

*Defined in [src/blockchain/xrp.ts:39](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L39)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetLedger" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`i` | number |

**Returns:** Promise\<any>

___

### xrpGetTransaction

▸ `Const`**xrpGetTransaction**(`hash`: string): Promise\<any>

*Defined in [src/blockchain/xrp.ts:53](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/blockchain/xrp.ts#L53)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/XrpGetTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<any>
