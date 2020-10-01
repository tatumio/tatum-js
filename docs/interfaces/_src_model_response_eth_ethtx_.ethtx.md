**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/eth/EthTx"](../modules/_src_model_response_eth_ethtx_.md) / EthTx

# Interface: EthTx

**`export`** 

**`interface`** EthTx

## Hierarchy

* **EthTx**

## Index

### Properties

* [blockHash](_src_model_response_eth_ethtx_.ethtx.md#blockhash)
* [blockNumber](_src_model_response_eth_ethtx_.ethtx.md#blocknumber)
* [contractAddress](_src_model_response_eth_ethtx_.ethtx.md#contractaddress)
* [cumulativeGasUsed](_src_model_response_eth_ethtx_.ethtx.md#cumulativegasused)
* [from](_src_model_response_eth_ethtx_.ethtx.md#from)
* [gas](_src_model_response_eth_ethtx_.ethtx.md#gas)
* [gasPrice](_src_model_response_eth_ethtx_.ethtx.md#gasprice)
* [gasUsed](_src_model_response_eth_ethtx_.ethtx.md#gasused)
* [input](_src_model_response_eth_ethtx_.ethtx.md#input)
* [logs](_src_model_response_eth_ethtx_.ethtx.md#logs)
* [nonce](_src_model_response_eth_ethtx_.ethtx.md#nonce)
* [status](_src_model_response_eth_ethtx_.ethtx.md#status)
* [to](_src_model_response_eth_ethtx_.ethtx.md#to)
* [transactionHash](_src_model_response_eth_ethtx_.ethtx.md#transactionhash)
* [transactionIndex](_src_model_response_eth_ethtx_.ethtx.md#transactionindex)
* [value](_src_model_response_eth_ethtx_.ethtx.md#value)

## Properties

### blockHash

•  **blockHash**: string

*Defined in [src/model/response/eth/EthTx.ts:12](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L12)*

Hash of the block where this transaction was in.

**`memberof`** EthTx

___

### blockNumber

•  **blockNumber**: number

*Defined in [src/model/response/eth/EthTx.ts:24](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L24)*

Block number where this transaction was in.

**`memberof`** EthTx

___

### contractAddress

•  **contractAddress**: string

*Defined in [src/model/response/eth/EthTx.ts:96](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L96)*

The contract address created, if the transaction was a contract creation, otherwise null.

**`memberof`** EthTx

___

### cumulativeGasUsed

•  **cumulativeGasUsed**: number

*Defined in [src/model/response/eth/EthTx.ts:90](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L90)*

The total amount of gas used when this transaction was executed in the block.

**`memberof`** EthTx

___

### from

•  **from**: string

*Defined in [src/model/response/eth/EthTx.ts:30](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L30)*

Address of the sender.

**`memberof`** EthTx

___

### gas

•  **gas**: number

*Defined in [src/model/response/eth/EthTx.ts:36](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L36)*

Gas provided by the sender.

**`memberof`** EthTx

___

### gasPrice

•  **gasPrice**: string

*Defined in [src/model/response/eth/EthTx.ts:42](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L42)*

Gas price provided by the sender in wei.

**`memberof`** EthTx

___

### gasUsed

•  **gasUsed**: number

*Defined in [src/model/response/eth/EthTx.ts:84](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L84)*

The amount of gas used by this specific transaction alone.

**`memberof`** EthTx

___

### input

•  **input**: string

*Defined in [src/model/response/eth/EthTx.ts:54](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L54)*

The data sent along with the transaction.

**`memberof`** EthTx

___

### logs

•  **logs**: [EthTxLogs](_src_model_response_eth_ethtx_.ethtxlogs.md)[]

*Defined in [src/model/response/eth/EthTx.ts:102](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L102)*

Log events, that happened in this transaction.

**`memberof`** EthTx

___

### nonce

•  **nonce**: number

*Defined in [src/model/response/eth/EthTx.ts:60](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L60)*

The number of transactions made by the sender prior to this one.

**`memberof`** EthTx

___

### status

•  **status**: boolean

*Defined in [src/model/response/eth/EthTx.ts:18](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L18)*

TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.

**`memberof`** EthTx

___

### to

•  **to**: string

*Defined in [src/model/response/eth/EthTx.ts:66](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L66)*

Address of the receiver. 'null' when its a contract creation transaction.

**`memberof`** EthTx

___

### transactionHash

•  **transactionHash**: string

*Defined in [src/model/response/eth/EthTx.ts:48](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L48)*

Hash of the transaction.

**`memberof`** EthTx

___

### transactionIndex

•  **transactionIndex**: number

*Defined in [src/model/response/eth/EthTx.ts:72](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L72)*

Integer of the transactions index position in the block.

**`memberof`** EthTx

___

### value

•  **value**: string

*Defined in [src/model/response/eth/EthTx.ts:78](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/eth/EthTx.ts#L78)*

Value transferred in wei.

**`memberof`** EthTx
