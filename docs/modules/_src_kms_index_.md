**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/kms/index"

# Module: "src/kms/index"

## Index

### Functions

* [completePendingTransactionKMS](_src_kms_index_.md#completependingtransactionkms)
* [deleteTransactionKMS](_src_kms_index_.md#deletetransactionkms)
* [getPendingTransactionsKMSByChain](_src_kms_index_.md#getpendingtransactionskmsbychain)
* [getTransactionKMS](_src_kms_index_.md#gettransactionkms)

## Functions

### completePendingTransactionKMS

▸ `Const`**completePendingTransactionKMS**(`id`: string, `txId`: string): Promise\<void>

*Defined in [src/kms/index.ts:23](https://github.com/tatumio/tatum-js/blob/8f0f126/src/kms/index.ts#L23)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/CompletePendingSignature" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`txId` | string |

**Returns:** Promise\<void>

___

### deleteTransactionKMS

▸ `Const`**deleteTransactionKMS**(`id`: string, `revert`: boolean): Promise\<void>

*Defined in [src/kms/index.ts:16](https://github.com/tatumio/tatum-js/blob/8f0f126/src/kms/index.ts#L16)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/DeletePendingTransactionToSign" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | string | - |
`revert` | boolean | true |

**Returns:** Promise\<void>

___

### getPendingTransactionsKMSByChain

▸ `Const`**getPendingTransactionsKMSByChain**(`chain`: [Currency](../enums/_src_model_request_currency_.currency.md)): Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)[]>

*Defined in [src/kms/index.ts:30](https://github.com/tatumio/tatum-js/blob/8f0f126/src/kms/index.ts#L30)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`chain` | [Currency](../enums/_src_model_request_currency_.currency.md) |

**Returns:** Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)[]>

___

### getTransactionKMS

▸ `Const`**getTransactionKMS**(`id`: string): Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)>

*Defined in [src/kms/index.ts:9](https://github.com/tatumio/tatum-js/blob/8f0f126/src/kms/index.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/GetPendingTransactionToSign" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)>
