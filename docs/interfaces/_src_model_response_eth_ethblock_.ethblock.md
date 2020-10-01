**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/eth/EthBlock"](../modules/_src_model_response_eth_ethblock_.md) / EthBlock

# Interface: EthBlock

## Hierarchy

* **EthBlock**

## Index

### Properties

* [difficulty](_src_model_response_eth_ethblock_.ethblock.md#difficulty)
* [extraData](_src_model_response_eth_ethblock_.ethblock.md#extradata)
* [gasLimit](_src_model_response_eth_ethblock_.ethblock.md#gaslimit)
* [gasUsed](_src_model_response_eth_ethblock_.ethblock.md#gasused)
* [hash](_src_model_response_eth_ethblock_.ethblock.md#hash)
* [logsBloom](_src_model_response_eth_ethblock_.ethblock.md#logsbloom)
* [miner](_src_model_response_eth_ethblock_.ethblock.md#miner)
* [mixHash](_src_model_response_eth_ethblock_.ethblock.md#mixhash)
* [nonce](_src_model_response_eth_ethblock_.ethblock.md#nonce)
* [number](_src_model_response_eth_ethblock_.ethblock.md#number)
* [parentHash](_src_model_response_eth_ethblock_.ethblock.md#parenthash)
* [receiptsRoot](_src_model_response_eth_ethblock_.ethblock.md#receiptsroot)
* [sha3Uncles](_src_model_response_eth_ethblock_.ethblock.md#sha3uncles)
* [size](_src_model_response_eth_ethblock_.ethblock.md#size)
* [stateRoot](_src_model_response_eth_ethblock_.ethblock.md#stateroot)
* [timestamp](_src_model_response_eth_ethblock_.ethblock.md#timestamp)
* [totalDifficulty](_src_model_response_eth_ethblock_.ethblock.md#totaldifficulty)
* [transactions](_src_model_response_eth_ethblock_.ethblock.md#transactions)
* [transactionsRoot](_src_model_response_eth_ethblock_.ethblock.md#transactionsroot)

## Properties

### difficulty

•  **difficulty**: string

*Defined in [src/model/response/eth/EthBlock.ts:14](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L14)*

Difficulty for this block.

**`memberof`** EthBlock

___

### extraData

•  **extraData**: string

*Defined in [src/model/response/eth/EthBlock.ts:20](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L20)*

The 'extra data' field of this block.

**`memberof`** EthBlock

___

### gasLimit

•  **gasLimit**: number

*Defined in [src/model/response/eth/EthBlock.ts:26](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L26)*

The maximum gas allowed in this block.

**`memberof`** EthBlock

___

### gasUsed

•  **gasUsed**: number

*Defined in [src/model/response/eth/EthBlock.ts:32](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L32)*

The total used gas by all transactions in this block.

**`memberof`** EthBlock

___

### hash

•  **hash**: string

*Defined in [src/model/response/eth/EthBlock.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L38)*

Hash of the block. 'null' when its pending block.

**`memberof`** EthBlock

___

### logsBloom

•  **logsBloom**: string

*Defined in [src/model/response/eth/EthBlock.ts:44](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L44)*

The bloom filter for the logs of the block. 'null' when its pending block.

**`memberof`** EthBlock

___

### miner

•  **miner**: string

*Defined in [src/model/response/eth/EthBlock.ts:50](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L50)*

The address of the beneficiary to whom the mining rewards were given.

**`memberof`** EthBlock

___

### mixHash

•  **mixHash**: string

*Defined in [src/model/response/eth/EthBlock.ts:56](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L56)*

**`memberof`** EthBlock

___

### nonce

•  **nonce**: string

*Defined in [src/model/response/eth/EthBlock.ts:62](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L62)*

Hash of the generated proof-of-work. 'null' when its pending block.

**`memberof`** EthBlock

___

### number

•  **number**: number

*Defined in [src/model/response/eth/EthBlock.ts:68](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L68)*

The block number. 'null' when its pending block.

**`memberof`** EthBlock

___

### parentHash

•  **parentHash**: string

*Defined in [src/model/response/eth/EthBlock.ts:74](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L74)*

Hash of the parent block.

**`memberof`** EthBlock

___

### receiptsRoot

•  **receiptsRoot**: string

*Defined in [src/model/response/eth/EthBlock.ts:80](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L80)*

**`memberof`** EthBlock

___

### sha3Uncles

•  **sha3Uncles**: string

*Defined in [src/model/response/eth/EthBlock.ts:86](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L86)*

SHA3 of the uncles data in the block.

**`memberof`** EthBlock

___

### size

•  **size**: number

*Defined in [src/model/response/eth/EthBlock.ts:92](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L92)*

The size of this block in bytes.

**`memberof`** EthBlock

___

### stateRoot

•  **stateRoot**: string

*Defined in [src/model/response/eth/EthBlock.ts:98](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L98)*

The root of the final state trie of the block.

**`memberof`** EthBlock

___

### timestamp

•  **timestamp**: number

*Defined in [src/model/response/eth/EthBlock.ts:104](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L104)*

The unix timestamp for when the block was collated.

**`memberof`** EthBlock

___

### totalDifficulty

•  **totalDifficulty**: string

*Defined in [src/model/response/eth/EthBlock.ts:110](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L110)*

Total difficulty of the chain until this block.

**`memberof`** EthBlock

___

### transactions

•  **transactions**: [EthTx](_src_model_response_eth_ethtx_.ethtx.md)[]

*Defined in [src/model/response/eth/EthBlock.ts:116](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L116)*

Array of transactions.

**`memberof`** EthBlock

___

### transactionsRoot

•  **transactionsRoot**: string

*Defined in [src/model/response/eth/EthBlock.ts:122](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/eth/EthBlock.ts#L122)*

The root of the transaction trie of the block.

**`memberof`** EthBlock
