**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / "src/security/kms"

# Module: "src/security/kms"

## Index

### Functions

* [completePendingTransactionKMS](_src_security_kms_.md#completependingtransactionkms)
* [deleteTransactionKMS](_src_security_kms_.md#deletetransactionkms)
* [getPendingTransactionsKMSByChain](_src_security_kms_.md#getpendingtransactionskmsbychain)
* [getTransactionKMS](_src_security_kms_.md#gettransactionkms)

## Functions

### completePendingTransactionKMS

▸ `Const`**completePendingTransactionKMS**(`id`: string, `txId`: string): Promise\<void>

*Defined in [src/security/kms.ts:23](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/security/kms.ts#L23)*

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

*Defined in [src/security/kms.ts:16](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/security/kms.ts#L16)*

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

*Defined in [src/security/kms.ts:30](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/security/kms.ts#L30)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`chain` | [Currency](../enums/_src_model_request_currency_.currency.md) |

**Returns:** Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)[]>

___

### getTransactionKMS

▸ `Const`**getTransactionKMS**(`id`: string): Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)>

*Defined in [src/security/kms.ts:9](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/security/kms.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/GetPendingTransactionToSign" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md)>
