**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/transaction/vet"

# Module: "src/transaction/vet"

## Index

### Functions

* [prepareVetSignedTransaction](_src_transaction_vet_.md#preparevetsignedtransaction)
* [sendVetTransaction](_src_transaction_vet_.md#sendvettransaction)
* [signVetKMSTransaction](_src_transaction_vet_.md#signvetkmstransaction)

## Functions

### prepareVetSignedTransaction

▸ `Const`**prepareVetSignedTransaction**(`testnet`: boolean, `body`: [TransferVet](../classes/_src_model_request_transfervet_.transfervet.md), `provider?`: undefined \| string): Promise\<any>

*Defined in [src/transaction/vet.ts:49](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/vet.ts#L49)*

Sign VeChain transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferVet](../classes/_src_model_request_transfervet_.transfervet.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the VeChain Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<any>

transaction data to be broadcast to blockchain.

___

### sendVetTransaction

▸ `Const`**sendVetTransaction**(`testnet`: boolean, `body`: [TransferVet](../classes/_src_model_request_transfervet_.transfervet.md), `provider?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/vet.ts:17](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/vet.ts#L17)*

Send VeChain transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferVet](../classes/_src_model_request_transfervet_.transfervet.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the VeChain Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### signVetKMSTransaction

▸ `Const`**signVetKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `fromPrivateKey`: string, `testnet`: boolean, `provider?`: undefined \| string): Promise\<any>

*Defined in [src/transaction/vet.ts:29](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/transaction/vet.ts#L29)*

Sign VeChain pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`fromPrivateKey` | string | private key to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |
`provider?` | undefined \| string | url of the VeChain Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<any>

transaction data to be broadcast to blockchain.
