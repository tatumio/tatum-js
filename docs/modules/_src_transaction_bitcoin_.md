**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/transaction/bitcoin"

# Module: "src/transaction/bitcoin"

## Index

### Functions

* [prepareBitcoinSignedTransaction](_src_transaction_bitcoin_.md#preparebitcoinsignedtransaction)
* [prepareLitecoinSignedTransaction](_src_transaction_bitcoin_.md#preparelitecoinsignedtransaction)
* [prepareSignedTransaction](_src_transaction_bitcoin_.md#preparesignedtransaction)
* [sendBitcoinTransaction](_src_transaction_bitcoin_.md#sendbitcointransaction)
* [sendLitecoinTransaction](_src_transaction_bitcoin_.md#sendlitecointransaction)
* [signBitcoinKMSTransaction](_src_transaction_bitcoin_.md#signbitcoinkmstransaction)
* [signLitecoinKMSTransaction](_src_transaction_bitcoin_.md#signlitecoinkmstransaction)

## Functions

### prepareBitcoinSignedTransaction

▸ `Const`**prepareBitcoinSignedTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md)): Promise\<string>

*Defined in [src/transaction/bitcoin.ts:104](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L104)*

Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### prepareLitecoinSignedTransaction

▸ `Const`**prepareLitecoinSignedTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md)): Promise\<string>

*Defined in [src/transaction/bitcoin.ts:114](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L114)*

Sign Litcoin transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### prepareSignedTransaction

▸ `Const`**prepareSignedTransaction**(`network`: Network, `body`: [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md), `curency`: [Currency](../enums/_src_model_request_currency_.currency.md)): Promise\<string>

*Defined in [src/transaction/bitcoin.ts:15](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`network` | Network |
`body` | [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md) |
`curency` | [Currency](../enums/_src_model_request_currency_.currency.md) |

**Returns:** Promise\<string>

___

### sendBitcoinTransaction

▸ `Const`**sendBitcoinTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md)): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/bitcoin.ts:125](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L125)*

Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### sendLitecoinTransaction

▸ `Const`**sendLitecoinTransaction**(`testnet`: boolean, `body`: [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md)): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/bitcoin.ts:136](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L136)*

Send Litecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferBtcBasedBlockchain](../classes/_src_model_request_transferbtcbasedblockchain_.transferbtcbasedblockchain.md) | content of the transaction to broadcast |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### signBitcoinKMSTransaction

▸ `Const`**signBitcoinKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `privateKeys`: string[], `testnet`: boolean): Promise\<string>

*Defined in [src/transaction/bitcoin.ts:65](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L65)*

Sign Bitcoin pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`privateKeys` | string[] | private keys to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### signLitecoinKMSTransaction

▸ `Const`**signLitecoinKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `privateKeys`: string[], `testnet`: boolean): Promise\<string>

*Defined in [src/transaction/bitcoin.ts:85](https://github.com/tatumio/tatum-js/blob/8f0f126/src/transaction/bitcoin.ts#L85)*

Sign Litecoin pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`privateKeys` | string[] | private keys to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
