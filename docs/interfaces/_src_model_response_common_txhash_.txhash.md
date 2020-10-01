**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/common/TxHash"](../modules/_src_model_response_common_txhash_.md) / TxHash

# Interface: TxHash

**`export`** 

**`interface`** TxHash

## Hierarchy

* **TxHash**

## Index

### Properties

* [completed](_src_model_response_common_txhash_.txhash.md#completed)
* [id](_src_model_response_common_txhash_.txhash.md#id)
* [txId](_src_model_response_common_txhash_.txhash.md#txid)

## Properties

### completed

•  **completed**: boolean

*Defined in [src/model/response/common/TxHash.ts:24](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/common/TxHash.ts#L24)*

Whethet withdrawal was completed in Tatum's internal ledger. If not, it must be done manually.

**`memberof`** TxHash

___

### id

•  **id**: string

*Defined in [src/model/response/common/TxHash.ts:12](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/common/TxHash.ts#L12)*

ID of withdrawal. If transaction is not valid in blockchain, use this id to cancel withdrawal.

**`memberof`** TxHash

___

### txId

•  **txId**: string

*Defined in [src/model/response/common/TxHash.ts:18](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/common/TxHash.ts#L18)*

TX hash of successful transaction.

**`memberof`** TxHash
