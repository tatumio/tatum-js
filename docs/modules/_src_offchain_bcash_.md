**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/bcash"

# Module: "src/offchain/bcash"

## Index

### Functions

* [prepareBitcoinCashSignedOffchainTransaction](_src_offchain_bcash_.md#preparebitcoincashsignedoffchaintransaction)
* [sendBitcoinCashOffchainTransaction](_src_offchain_bcash_.md#sendbitcoincashoffchaintransaction)
* [signBitcoinCashOffchainKMSTransaction](_src_offchain_bcash_.md#signbitcoincashoffchainkmstransaction)

## Functions

### prepareBitcoinCashSignedOffchainTransaction

▸ `Const`**prepareBitcoinCashSignedOffchainTransaction**(`testnet`: boolean, `data`: [WithdrawalResponseData](../interfaces/_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md)[], `amount`: string, `address`: string, `mnemonic?`: undefined \| string, `keyPair?`: [KeyPair](../classes/_src_model_request_transferbtcbasedoffchain_.keypair.md)[], `changeAddress?`: undefined \| string): Promise\<any>

*Defined in [src/offchain/bcash.ts:89](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/offchain/bcash.ts#L89)*

Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`data` | [WithdrawalResponseData](../interfaces/_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md)[] | data from Tatum system to prepare transaction from |
`amount` | string | amount to send |
`address` | string | recipient address |
`mnemonic?` | undefined \| string | mnemonic to sign transaction from. mnemonic or keyPair must be present |
`keyPair?` | [KeyPair](../classes/_src_model_request_transferbtcbasedoffchain_.keypair.md)[] | keyPair to sign transaction from. keyPair or mnemonic must be present |
`changeAddress?` | undefined \| string | address to send the rest of the unused coins |

**Returns:** Promise\<any>

transaction data to be broadcast to blockchain.

___

### sendBitcoinCashOffchainTransaction

▸ `Const`**sendBitcoinCashOffchainTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedOffchain](../classes/_src_model_request_transferbtcbasedoffchain_.transferbtcbasedoffchain.md)): Promise\<{ id: string  }>

*Defined in [src/offchain/bcash.ts:23](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/offchain/bcash.ts#L23)*

Send Bitcoin Cash transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedOffchain](../classes/_src_model_request_transferbtcbasedoffchain_.transferbtcbasedoffchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<{ id: string  }>

transaction id of the transaction in the blockchain

___

### signBitcoinCashOffchainKMSTransaction

▸ `Const`**signBitcoinCashOffchainKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `mnemonic`: string, `testnet`: boolean): Promise\<any>

*Defined in [src/offchain/bcash.ts:59](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/offchain/bcash.ts#L59)*

Sign Bitcoin Cash pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`mnemonic` | string | mnemonic to generate private keys to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<any>

transaction data to be broadcast to blockchain.
