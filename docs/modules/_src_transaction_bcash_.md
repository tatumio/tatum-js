**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/transaction/bcash"

# Module: "src/transaction/bcash"

## Index

### Functions

* [getTransactions](_src_transaction_bcash_.md#gettransactions)
* [prepareBitcoinCashSignedTransaction](_src_transaction_bcash_.md#preparebitcoincashsignedtransaction)
* [sendBitcoinCashTransaction](_src_transaction_bcash_.md#sendbitcoincashtransaction)
* [signBitcoinCashKMSTransaction](_src_transaction_bcash_.md#signbitcoincashkmstransaction)

## Functions

### getTransactions

▸ `Const`**getTransactions**(`txHash`: string[]): Promise\<[BchTx](../interfaces/_src_model_response_bch_bchtx_.bchtx.md)[]>

*Defined in [src/transaction/bcash.ts:81](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bcash.ts#L81)*

#### Parameters:

Name | Type |
------ | ------ |
`txHash` | string[] |

**Returns:** Promise\<[BchTx](../interfaces/_src_model_response_bch_bchtx_.bchtx.md)[]>

___

### prepareBitcoinCashSignedTransaction

▸ `Const`**prepareBitcoinCashSignedTransaction**(`testnet`: boolean, `body`: [TransferBchBlockchain](../classes/_src_model_request_transferbchblockchain_.transferbchblockchain.md)): Promise\<any>

*Defined in [src/transaction/bcash.ts:57](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bcash.ts#L57)*

Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBchBlockchain](../classes/_src_model_request_transferbchblockchain_.transferbchblockchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<any>

transaction data to be broadcast to blockchain.

___

### sendBitcoinCashTransaction

▸ `Const`**sendBitcoinCashTransaction**(`testnet`: boolean, `body`: [TransferBchBlockchain](../classes/_src_model_request_transferbchblockchain_.transferbchblockchain.md)): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/bcash.ts:24](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bcash.ts#L24)*

Send Bitcoin Cash transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBchBlockchain](../classes/_src_model_request_transferbchblockchain_.transferbchblockchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### signBitcoinCashKMSTransaction

▸ `Const`**signBitcoinCashKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `privateKeys`: string[], `testnet`: boolean): Promise\<any>

*Defined in [src/transaction/bcash.ts:35](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bcash.ts#L35)*

Sign Bitcoin Cash pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`privateKeys` | string[] | private keys to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<any>

transaction data to be broadcast to blockchain.
