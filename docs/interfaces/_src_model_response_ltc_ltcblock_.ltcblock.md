**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ltc/LtcBlock"](../modules/_src_model_response_ltc_ltcblock_.md) / LtcBlock

# Interface: LtcBlock

## Hierarchy

* **LtcBlock**

## Index

### Properties

* [bits](_src_model_response_ltc_ltcblock_.ltcblock.md#bits)
* [hash](_src_model_response_ltc_ltcblock_.ltcblock.md#hash)
* [height](_src_model_response_ltc_ltcblock_.ltcblock.md#height)
* [merkleRoot](_src_model_response_ltc_ltcblock_.ltcblock.md#merkleroot)
* [nonce](_src_model_response_ltc_ltcblock_.ltcblock.md#nonce)
* [prevBlock](_src_model_response_ltc_ltcblock_.ltcblock.md#prevblock)
* [ts](_src_model_response_ltc_ltcblock_.ltcblock.md#ts)
* [txs](_src_model_response_ltc_ltcblock_.ltcblock.md#txs)
* [version](_src_model_response_ltc_ltcblock_.ltcblock.md#version)

## Properties

### bits

•  **bits**: number

*Defined in [src/model/response/ltc/LtcBlock.ts:50](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L50)*

**`memberof`** LtcBlock

___

### hash

•  **hash**: string

*Defined in [src/model/response/ltc/LtcBlock.ts:14](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L14)*

Hash of block.

**`memberof`** LtcBlock

___

### height

•  **height**: number

*Defined in [src/model/response/ltc/LtcBlock.ts:20](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L20)*

The number of blocks preceding a particular block on a block chain.

**`memberof`** LtcBlock

___

### merkleRoot

•  **merkleRoot**: string

*Defined in [src/model/response/ltc/LtcBlock.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L38)*

The root node of a merkle tree, a descendant of all the hashed pairs in the tree.

**`memberof`** LtcBlock

___

### nonce

•  **nonce**: number

*Defined in [src/model/response/ltc/LtcBlock.ts:56](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L56)*

Arbitrary number that is used in Litecoin's proof of work consensus algorithm.

**`memberof`** LtcBlock

___

### prevBlock

•  **prevBlock**: string

*Defined in [src/model/response/ltc/LtcBlock.ts:32](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L32)*

Hash of the previous block.

**`memberof`** LtcBlock

___

### ts

•  **ts**: number

*Defined in [src/model/response/ltc/LtcBlock.ts:44](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L44)*

Time of the block.

**`memberof`** LtcBlock

___

### txs

•  **txs**: [LtcTx](_src_model_response_ltc_ltctx_.ltctx.md)[]

*Defined in [src/model/response/ltc/LtcBlock.ts:62](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L62)*

**`memberof`** LtcBlock

___

### version

•  **version**: number

*Defined in [src/model/response/ltc/LtcBlock.ts:26](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ltc/LtcBlock.ts#L26)*

Block version.

**`memberof`** LtcBlock
