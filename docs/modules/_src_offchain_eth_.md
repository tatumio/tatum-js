**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/eth"

# Module: "src/offchain/eth"

## Index

### Functions

* [prepareEthErc20SignedOffchainTransaction](_src_offchain_eth_.md#prepareetherc20signedoffchaintransaction)
* [prepareEthSignedOffchainTransaction](_src_offchain_eth_.md#prepareethsignedoffchaintransaction)
* [sendEthErc20OffchainTransaction](_src_offchain_eth_.md#sendetherc20offchaintransaction)
* [sendEthOffchainTransaction](_src_offchain_eth_.md#sendethoffchaintransaction)
* [signEthOffchainKMSTransaction](_src_offchain_eth_.md#signethoffchainkmstransaction)

## Functions

### prepareEthErc20SignedOffchainTransaction

▸ `Const`**prepareEthErc20SignedOffchainTransaction**(`amount`: string, `privateKey`: string, `address`: string, `web3`: Web3, `tokenAddress`: string, `gasPrice`: string, `nonce?`: undefined \| number): Promise\<{ gasLimit: number = tx.gas; txData: string = (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string }>

*Defined in [src/offchain/eth.ts:177](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/offchain/eth.ts#L177)*

Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`amount` | string | amount to send |
`privateKey` | string | private key to sign transaction and send funds from |
`address` | string | recipient address |
`web3` | Web3 | instance of the web3 client |
`tokenAddress` | string | blockchain address of the custom ERC20 token |
`gasPrice` | string | gas price of the blockchain fee |
`nonce?` | undefined \| number | nonce of the transaction. this is counter of the transactions from given address. should be + 1 from previous one. |

**Returns:** Promise\<{ gasLimit: number = tx.gas; txData: string = (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string }>

transaction data to be broadcast to blockchain.

___

### prepareEthSignedOffchainTransaction

▸ `Const`**prepareEthSignedOffchainTransaction**(`amount`: string, `privateKey`: string, `address`: string, `currency`: string, `web3`: Web3, `gasPrice`: string, `nonce?`: undefined \| number): Promise\<{ gasLimit: number = tx.gas; txData: string = (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string }>

*Defined in [src/offchain/eth.ts:133](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/offchain/eth.ts#L133)*

Sign Ethereum transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`amount` | string | amount to send |
`privateKey` | string | private key to sign transaction and send funds from |
`address` | string | recipient address |
`currency` | string | Ethereum or supported ERC20 |
`web3` | Web3 | instance of the web3 client |
`gasPrice` | string | gas price of the blockchain fee |
`nonce?` | undefined \| number | nonce of the transaction. this is counter of the transactions from given address. should be + 1 from previous one. |

**Returns:** Promise\<{ gasLimit: number = tx.gas; txData: string = (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string }>

transaction data to be broadcast to blockchain.

___

### sendEthErc20OffchainTransaction

▸ `Const`**sendEthErc20OffchainTransaction**(`testnet`: boolean, `body`: [TransferEthErc20Offchain](../classes/_src_model_request_transferetherc20offchain_.transferetherc20offchain.md), `provider?`: undefined \| string): Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

*Defined in [src/offchain/eth.ts:64](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/offchain/eth.ts#L64)*

Send Ethereum ERC20 transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferEthErc20Offchain](../classes/_src_model_request_transferetherc20offchain_.transferetherc20offchain.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

transaction id of the transaction in the blockchain

___

### sendEthOffchainTransaction

▸ `Const`**sendEthOffchainTransaction**(`testnet`: boolean, `body`: [TransferEthOffchain](../classes/_src_model_request_transferethoffchain_.transferethoffchain.md), `provider?`: undefined \| string): Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

*Defined in [src/offchain/eth.ts:21](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/offchain/eth.ts#L21)*

Send Ethereum transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferEthOffchain](../classes/_src_model_request_transferethoffchain_.transferethoffchain.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

transaction id of the transaction in the blockchain

___

### signEthOffchainKMSTransaction

▸ `Const`**signEthOffchainKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `fromPrivateKey`: string, `testnet`: boolean, `provider?`: undefined \| string): Promise\<string>

*Defined in [src/offchain/eth.ts:109](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/offchain/eth.ts#L109)*

Sign Ethereum pending transaction from Tatum KMS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md) | pending transaction from KMS |
`fromPrivateKey` | string | private key to sign transaction with. |
`testnet` | boolean | mainnet or testnet version |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.
