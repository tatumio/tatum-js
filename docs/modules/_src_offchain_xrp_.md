**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/xrp"

# Module: "src/offchain/xrp"

## Index

### Functions

* [prepareXrpSignedOffchainTransaction](_src_offchain_xrp_.md#preparexrpsignedoffchaintransaction)
* [sendXrpOffchainTransaction](_src_offchain_xrp_.md#sendxrpoffchaintransaction)
* [signXrpOffchainKMSTransaction](_src_offchain_xrp_.md#signxrpoffchainkmstransaction)

## Functions

### prepareXrpSignedOffchainTransaction

▸ `Const`**prepareXrpSignedOffchainTransaction**(`testnet`: boolean, `amount`: string, `address`: string, `secret`: string, `account`: any, `fee`: string, `sourceTag?`: undefined \| number, `destinationTag?`: undefined \| string): Promise\<string>

*Defined in [src/offchain/xrp.ts:72](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/offchain/xrp.ts#L72)*

Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`amount` | string | amount to send |
`address` | string | recipient address |
`secret` | string | secret to sign transaction with |
`account` | any | Xrp source account |
`fee` | string | fee to pay |
`sourceTag?` | undefined \| number | source tag to include in transaction |
`destinationTag?` | undefined \| string |  |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### sendXrpOffchainTransaction

▸ `Const`**sendXrpOffchainTransaction**(`testnet`: boolean, `body`: [TransferXrpOffchain](../classes/_src_model_request_transferxrpoffchain_.transferxrpoffchain.md)): Promise\<{ id: string  }>

*Defined in [src/offchain/xrp.ts:15](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/offchain/xrp.ts#L15)*

Send Xrp transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferXrpOffchain](../classes/_src_model_request_transferxrpoffchain_.transferxrpoffchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<{ id: string  }>

transaction id of the transaction in the blockchain

___

### signXrpOffchainKMSTransaction

▸ `Const`**signXrpOffchainKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `secret`: string): Promise\<string>

*Defined in [src/offchain/xrp.ts:52](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/offchain/xrp.ts#L52)*

Sign Xrp pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`secret` | string | secret key to sign transaction with. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
