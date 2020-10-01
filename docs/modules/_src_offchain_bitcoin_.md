**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/bitcoin"

# Module: "src/offchain/bitcoin"

## Index

### Functions

* [prepareBitcoinSignedOffchainTransaction](_src_offchain_bitcoin_.md#preparebitcoinsignedoffchaintransaction)
* [sendBitcoinOffchainTransaction](_src_offchain_bitcoin_.md#sendbitcoinoffchaintransaction)
* [signBitcoinOffchainKMSTransaction](_src_offchain_bitcoin_.md#signbitcoinoffchainkmstransaction)

## Functions

### prepareBitcoinSignedOffchainTransaction

▸ `Const`**prepareBitcoinSignedOffchainTransaction**(`testnet`: boolean, `data`: [WithdrawalResponseData](../interfaces/_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md)[], `amount`: string, `address`: string, `mnemonic?`: undefined \| string, `keyPair?`: [KeyPair](../classes/_src_model_request_transferbtcbasedoffchain_.keypair.md)[], `changeAddress?`: undefined \| string): Promise\<string>

*Defined in [src/offchain/bitcoin.ts:78](https://github.com/tatumio/tatum-js/blob/8f0f126/src/offchain/bitcoin.ts#L78)*

Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.

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

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### sendBitcoinOffchainTransaction

▸ `Const`**sendBitcoinOffchainTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedOffchain](../classes/_src_model_request_transferbtcbasedoffchain_.transferbtcbasedoffchain.md)): Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

*Defined in [src/offchain/bitcoin.ts:15](https://github.com/tatumio/tatum-js/blob/8f0f126/src/offchain/bitcoin.ts#L15)*

Send Bitcoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedOffchain](../classes/_src_model_request_transferbtcbasedoffchain_.transferbtcbasedoffchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

transaction id of the transaction in the blockchain

___

### signBitcoinOffchainKMSTransaction

▸ `Const`**signBitcoinOffchainKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `mnemonic`: string, `testnet`: boolean): Promise\<string>

*Defined in [src/offchain/bitcoin.ts:51](https://github.com/tatumio/tatum-js/blob/8f0f126/src/offchain/bitcoin.ts#L51)*

Sign Bitcoin pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`mnemonic` | string | mnemonic to generate private keys to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
