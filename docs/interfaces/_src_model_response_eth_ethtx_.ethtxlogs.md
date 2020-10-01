**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/eth/EthTx"](../modules/_src_model_response_eth_ethtx_.md) / EthTxLogs

# Interface: EthTxLogs

**`export`** 

**`interface`** EthTxLogs

## Hierarchy

* **EthTxLogs**

## Index

### Properties

* [address](_src_model_response_eth_ethtx_.ethtxlogs.md#address)
* [data](_src_model_response_eth_ethtx_.ethtxlogs.md#data)
* [logIndex](_src_model_response_eth_ethtx_.ethtxlogs.md#logindex)
* [topic](_src_model_response_eth_ethtx_.ethtxlogs.md#topic)
* [transactionHash](_src_model_response_eth_ethtx_.ethtxlogs.md#transactionhash)
* [transactionIndex](_src_model_response_eth_ethtx_.ethtxlogs.md#transactionindex)

## Properties

### address

•  **address**: string

*Defined in [src/model/response/eth/EthTx.ts:116](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/eth/EthTx.ts#L116)*

From which this event originated from.

**`memberof`** EthTxLogs

___

### data

•  **data**: string

*Defined in [src/model/response/eth/EthTx.ts:128](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/eth/EthTx.ts#L128)*

The data containing non-indexed log parameter.

**`memberof`** EthTxLogs

___

### logIndex

•  **logIndex**: number

*Defined in [src/model/response/eth/EthTx.ts:134](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/eth/EthTx.ts#L134)*

Integer of the event index position in the block.

**`memberof`** EthTxLogs

___

### topic

•  **topic**: string[]

*Defined in [src/model/response/eth/EthTx.ts:122](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/eth/EthTx.ts#L122)*

An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.

**`memberof`** EthTxLogs

___

### transactionHash

•  **transactionHash**: string

*Defined in [src/model/response/eth/EthTx.ts:146](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/eth/EthTx.ts#L146)*

Hash of the transaction this event was created in.

**`memberof`** EthTxLogs

___

### transactionIndex

•  **transactionIndex**: number

*Defined in [src/model/response/eth/EthTx.ts:140](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/eth/EthTx.ts#L140)*

Integer of the transaction’s index position, the event was created in.

**`memberof`** EthTxLogs
