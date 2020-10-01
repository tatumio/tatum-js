**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/transaction/xrp"

# Module: "src/transaction/xrp"

## Index

### Functions

* [prepareXrpSignedTransaction](_src_transaction_xrp_.md#preparexrpsignedtransaction)
* [sendXrpTransaction](_src_transaction_xrp_.md#sendxrptransaction)
* [signXrpKMSTransaction](_src_transaction_xrp_.md#signxrpkmstransaction)

## Functions

### prepareXrpSignedTransaction

▸ `Const`**prepareXrpSignedTransaction**(`body`: [TransferXrp](../classes/_src_model_request_transferxrp_.transferxrp.md)): Promise\<string>

*Defined in [src/transaction/xrp.ts:37](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/xrp.ts#L37)*

Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`body` | [TransferXrp](../classes/_src_model_request_transferxrp_.transferxrp.md) | content of the transaction to broadcast |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### sendXrpTransaction

▸ `Const`**sendXrpTransaction**(`body`: [TransferXrp](../classes/_src_model_request_transferxrp_.transferxrp.md)): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/xrp.ts:14](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/xrp.ts#L14)*

Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`body` | [TransferXrp](../classes/_src_model_request_transferxrp_.transferxrp.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### signXrpKMSTransaction

▸ `Const`**signXrpKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `secret`: string): Promise\<string>

*Defined in [src/transaction/xrp.ts:24](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/xrp.ts#L24)*

Sign Xrp pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`secret` | string | secret key to sign transaction with. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
