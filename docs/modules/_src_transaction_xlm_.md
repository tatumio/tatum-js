**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/transaction/xlm"

# Module: "src/transaction/xlm"

## Index

### Functions

* [prepareXlmSignedTransaction](_src_transaction_xlm_.md#preparexlmsignedtransaction)
* [sendXlmTransaction](_src_transaction_xlm_.md#sendxlmtransaction)
* [signXlmKMSTransaction](_src_transaction_xlm_.md#signxlmkmstransaction)

## Functions

### prepareXlmSignedTransaction

▸ `Const`**prepareXlmSignedTransaction**(`testnet`: boolean, `body`: [TransferXlm](../classes/_src_model_request_transferxlm_.transferxlm.md)): Promise\<string>

*Defined in [src/transaction/xlm.ts:39](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/xlm.ts#L39)*

Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferXlm](../classes/_src_model_request_transferxlm_.transferxlm.md) | content of the transaction to broadcast |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### sendXlmTransaction

▸ `Const`**sendXlmTransaction**(`testnet`: boolean, `body`: [TransferXlm](../classes/_src_model_request_transferxlm_.transferxlm.md)): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/xlm.ts:13](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/xlm.ts#L13)*

Send Stellar transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferXlm](../classes/_src_model_request_transferxlm_.transferxlm.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### signXlmKMSTransaction

▸ `Const`**signXlmKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `secret`: string, `testnet`: boolean): Promise\<string>

*Defined in [src/transaction/xlm.ts:24](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/xlm.ts#L24)*

Sign Stellar pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`secret` | string | secret key to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
