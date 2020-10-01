**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/xlm"

# Module: "src/offchain/xlm"

## Index

### Functions

* [prepareXlmSignedOffchainTransaction](_src_offchain_xlm_.md#preparexlmsignedoffchaintransaction)
* [sendXlmOffchainTransaction](_src_offchain_xlm_.md#sendxlmoffchaintransaction)
* [signXlmOffchainKMSTransaction](_src_offchain_xlm_.md#signxlmoffchainkmstransaction)

## Functions

### prepareXlmSignedOffchainTransaction

▸ `Const`**prepareXlmSignedOffchainTransaction**(`testnet`: boolean, `account`: any, `amount`: string, `address`: string, `secret`: string, `memo?`: Memo): Promise\<string>

*Defined in [src/offchain/xlm.ts:72](https://github.com/tatumio/tatum-js/blob/8f0f126/src/offchain/xlm.ts#L72)*

Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`account` | any | Stellar account with information |
`amount` | string | amount to send |
`address` | string | recipient address |
`secret` | string | secret to sign transaction with |
`memo?` | Memo | short memo to include in transaction |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### sendXlmOffchainTransaction

▸ `Const`**sendXlmOffchainTransaction**(`testnet`: boolean, `body`: [TransferXlmOffchain](../classes/_src_model_request_transferxlmoffchain_.transferxlmoffchain.md)): Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

*Defined in [src/offchain/xlm.ts:14](https://github.com/tatumio/tatum-js/blob/8f0f126/src/offchain/xlm.ts#L14)*

Send Stellar transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferXlmOffchain](../classes/_src_model_request_transferxlmoffchain_.transferxlmoffchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

transaction id of the transaction in the blockchain

___

### signXlmOffchainKMSTransaction

▸ `Const`**signXlmOffchainKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `secret`: string, `testnet`: boolean): Promise\<string>

*Defined in [src/offchain/xlm.ts:53](https://github.com/tatumio/tatum-js/blob/8f0f126/src/offchain/xlm.ts#L53)*

Sign Stellar pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`secret` | string | secret key to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
