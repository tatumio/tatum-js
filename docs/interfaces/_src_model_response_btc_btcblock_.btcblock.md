**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/btc/BtcBlock"](../modules/_src_model_response_btc_btcblock_.md) / BtcBlock

# Interface: BtcBlock

**`export`** 

**`interface`** BtcBlock

## Hierarchy

* **BtcBlock**

## Index

### Properties

* [bits](_src_model_response_btc_btcblock_.btcblock.md#bits)
* [depth](_src_model_response_btc_btcblock_.btcblock.md#depth)
* [hash](_src_model_response_btc_btcblock_.btcblock.md#hash)
* [height](_src_model_response_btc_btcblock_.btcblock.md#height)
* [merkleRoot](_src_model_response_btc_btcblock_.btcblock.md#merkleroot)
* [nonce](_src_model_response_btc_btcblock_.btcblock.md#nonce)
* [prevBlock](_src_model_response_btc_btcblock_.btcblock.md#prevblock)
* [time](_src_model_response_btc_btcblock_.btcblock.md#time)
* [txs](_src_model_response_btc_btcblock_.btcblock.md#txs)
* [version](_src_model_response_btc_btcblock_.btcblock.md#version)

## Properties

### bits

•  **bits**: number

*Defined in [src/model/response/btc/BtcBlock.ts:56](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L56)*

**`memberof`** BtcBlock

___

### depth

•  **depth**: number

*Defined in [src/model/response/btc/BtcBlock.ts:26](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L26)*

The number of blocks following a particular block on a block chain, including current one.

**`memberof`** BtcBlock

___

### hash

•  **hash**: string

*Defined in [src/model/response/btc/BtcBlock.ts:14](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L14)*

Hash of block.

**`memberof`** BtcBlock

___

### height

•  **height**: number

*Defined in [src/model/response/btc/BtcBlock.ts:20](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L20)*

The number of blocks preceding a particular block on a block chain.

**`memberof`** BtcBlock

___

### merkleRoot

•  **merkleRoot**: string

*Defined in [src/model/response/btc/BtcBlock.ts:44](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L44)*

The root node of a merkle tree, a descendant of all the hashed pairs in the tree.

**`memberof`** BtcBlock

___

### nonce

•  **nonce**: number

*Defined in [src/model/response/btc/BtcBlock.ts:62](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L62)*

Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.

**`memberof`** BtcBlock

___

### prevBlock

•  **prevBlock**: string

*Defined in [src/model/response/btc/BtcBlock.ts:38](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L38)*

Hash of the previous block.

**`memberof`** BtcBlock

___

### time

•  **time**: number

*Defined in [src/model/response/btc/BtcBlock.ts:50](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L50)*

Time of the block.

**`memberof`** BtcBlock

___

### txs

•  **txs**: [BtcTx](_src_model_response_btc_btctx_.btctx.md)[]

*Defined in [src/model/response/btc/BtcBlock.ts:68](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L68)*

**`memberof`** BtcBlock

___

### version

•  **version**: number

*Defined in [src/model/response/btc/BtcBlock.ts:32](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcBlock.ts#L32)*

Block version.

**`memberof`** BtcBlock
