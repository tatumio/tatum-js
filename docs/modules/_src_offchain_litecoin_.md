**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/litecoin"

# Module: "src/offchain/litecoin"

## Index

### Functions

* [prepareLitecoinSignedOffchainTransaction](_src_offchain_litecoin_.md#preparelitecoinsignedoffchaintransaction)
* [sendLitecoinOffchainTransaction](_src_offchain_litecoin_.md#sendlitecoinoffchaintransaction)
* [signLitecoinOffchainKMSTransaction](_src_offchain_litecoin_.md#signlitecoinoffchainkmstransaction)

## Functions

### prepareLitecoinSignedOffchainTransaction

▸ `Const`**prepareLitecoinSignedOffchainTransaction**(`testnet`: boolean, `data`: [WithdrawalResponseData](../interfaces/_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md)[], `amount`: string, `address`: string, `mnemonic?`: undefined \| string, `keyPair?`: [KeyPair](../classes/_src_model_request_transferbtcbasedoffchain_.keypair.md)[], `changeAddress?`: undefined \| string): Promise\<string>

*Defined in [src/offchain/litecoin.ts:79](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/litecoin.ts#L79)*

Sign Litecoin transaction with private keys locally. Nothing is broadcast to the blockchain.

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

### sendLitecoinOffchainTransaction

▸ `Const`**sendLitecoinOffchainTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedOffchain](../classes/_src_model_request_transferbtcbasedoffchain_.transferbtcbasedoffchain.md)): Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

*Defined in [src/offchain/litecoin.ts:16](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/litecoin.ts#L16)*

Send Litecoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedOffchain](../classes/_src_model_request_transferbtcbasedoffchain_.transferbtcbasedoffchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

transaction id of the transaction in the blockchain

___

### signLitecoinOffchainKMSTransaction

▸ `Const`**signLitecoinOffchainKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `mnemonic`: string, `testnet`: boolean): Promise\<string>

*Defined in [src/offchain/litecoin.ts:52](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/litecoin.ts#L52)*

Sign Litecoin pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`mnemonic` | string | mnemonic to generate private keys to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
