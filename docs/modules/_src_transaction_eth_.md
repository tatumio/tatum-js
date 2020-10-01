**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / "src/transaction/eth"

# Module: "src/transaction/eth"

## Index

### Functions

* [ethGetGasPriceInWei](_src_transaction_eth_.md#ethgetgaspriceinwei)
* [prepareCustomErc20SignedTransaction](_src_transaction_eth_.md#preparecustomerc20signedtransaction)
* [prepareDeployErc20SignedTransaction](_src_transaction_eth_.md#preparedeployerc20signedtransaction)
* [prepareEthOrErc20SignedTransaction](_src_transaction_eth_.md#prepareethorerc20signedtransaction)
* [prepareStoreDataTransaction](_src_transaction_eth_.md#preparestoredatatransaction)
* [sendCustomErc20Transaction](_src_transaction_eth_.md#sendcustomerc20transaction)
* [sendDeployErc20Transaction](_src_transaction_eth_.md#senddeployerc20transaction)
* [sendEthOrErc20Transaction](_src_transaction_eth_.md#sendethorerc20transaction)
* [sendStoreDataTransaction](_src_transaction_eth_.md#sendstoredatatransaction)
* [signEthKMSTransaction](_src_transaction_eth_.md#signethkmstransaction)

## Functions

### ethGetGasPriceInWei

▸ `Const`**ethGetGasPriceInWei**(`client`: Web3): Promise\<string>

*Defined in [src/transaction/eth.ts:21](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L21)*

Estimate Gas price for the transaction.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | Web3 |   |

**Returns:** Promise\<string>

___

### prepareCustomErc20SignedTransaction

▸ `Const`**prepareCustomErc20SignedTransaction**(`testnet`: boolean, `body`: [TransferCustomErc20](../classes/_src_model_request_transfercustomerc20_.transfercustomerc20.md), `provider?`: undefined \| string): Promise\<string>

*Defined in [src/transaction/eth.ts:150](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L150)*

Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferCustomErc20](../classes/_src_model_request_transfercustomerc20_.transfercustomerc20.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### prepareDeployErc20SignedTransaction

▸ `Const`**prepareDeployErc20SignedTransaction**(`testnet`: boolean, `body`: [DeployEthErc20](../classes/_src_model_request_deployetherc20_.deployetherc20.md), `provider?`: undefined \| string): Promise\<string>

*Defined in [src/transaction/eth.ts:195](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L195)*

Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [DeployEthErc20](../classes/_src_model_request_deployetherc20_.deployetherc20.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### prepareEthOrErc20SignedTransaction

▸ `Const`**prepareEthOrErc20SignedTransaction**(`testnet`: boolean, `body`: [TransferEthErc20](../classes/_src_model_request_transferetherc20_.transferetherc20.md), `provider?`: undefined \| string): Promise\<string>

*Defined in [src/transaction/eth.ts:94](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L94)*

Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferEthErc20](../classes/_src_model_request_transferetherc20_.transferetherc20.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### prepareStoreDataTransaction

▸ `Const`**prepareStoreDataTransaction**(`testnet`: boolean, `body`: [CreateRecord](../classes/_src_model_request_createrecord_.createrecord.md), `provider?`: undefined \| string): Promise\<string>

*Defined in [src/transaction/eth.ts:54](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L54)*

Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [CreateRecord](../classes/_src_model_request_createrecord_.createrecord.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<string>

transaction data to be broadcast to blockchain.

___

### sendCustomErc20Transaction

▸ `Const`**sendCustomErc20Transaction**(`testnet`: boolean, `body`: [TransferCustomErc20](../classes/_src_model_request_transfercustomerc20_.transfercustomerc20.md), `provider?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/eth.ts:274](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L274)*

Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferCustomErc20](../classes/_src_model_request_transfercustomerc20_.transfercustomerc20.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### sendDeployErc20Transaction

▸ `Const`**sendDeployErc20Transaction**(`testnet`: boolean, `body`: [DeployEthErc20](../classes/_src_model_request_deployetherc20_.deployetherc20.md), `provider?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/eth.ts:286](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L286)*

Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [DeployEthErc20](../classes/_src_model_request_deployetherc20_.deployetherc20.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### sendEthOrErc20Transaction

▸ `Const`**sendEthOrErc20Transaction**(`testnet`: boolean, `body`: [TransferEthErc20](../classes/_src_model_request_transferetherc20_.transferetherc20.md), `provider?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/eth.ts:262](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L262)*

Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [TransferEthErc20](../classes/_src_model_request_transferetherc20_.transferetherc20.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### sendStoreDataTransaction

▸ `Const`**sendStoreDataTransaction**(`testnet`: boolean, `body`: [CreateRecord](../classes/_src_model_request_createrecord_.createrecord.md), `provider?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/transaction/eth.ts:250](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L250)*

Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
This operation is irreversible.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | mainnet or testnet version |
`body` | [CreateRecord](../classes/_src_model_request_createrecord_.createrecord.md) | content of the transaction to broadcast |
`provider?` | undefined \| string | url of the Ethereum Server to connect to. If not set, default public server will be used. |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

transaction id of the transaction in the blockchain

___

### signEthKMSTransaction

▸ `Const`**signEthKMSTransaction**(`tx`: [TransactionKMS](../classes/_src_model_response_kms_transactionkms_.transactionkms.md), `fromPrivateKey`: string, `testnet`: boolean, `provider?`: undefined \| string): Promise\<string>

*Defined in [src/transaction/eth.ts:34](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/transaction/eth.ts#L34)*

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
