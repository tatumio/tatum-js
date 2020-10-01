**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/bch/BchBlock"](../modules/_src_model_response_bch_bchblock_.md) / BchBlock

# Interface: BchBlock

## Hierarchy

* **BchBlock**

## Index

### Properties

* [confirmations](_src_model_response_bch_bchblock_.bchblock.md#confirmations)
* [difficulty](_src_model_response_bch_bchblock_.bchblock.md#difficulty)
* [hash](_src_model_response_bch_bchblock_.bchblock.md#hash)
* [height](_src_model_response_bch_bchblock_.bchblock.md#height)
* [merkleroot](_src_model_response_bch_bchblock_.bchblock.md#merkleroot)
* [nextblockhash](_src_model_response_bch_bchblock_.bchblock.md#nextblockhash)
* [nonce](_src_model_response_bch_bchblock_.bchblock.md#nonce)
* [previousblockhash](_src_model_response_bch_bchblock_.bchblock.md#previousblockhash)
* [size](_src_model_response_bch_bchblock_.bchblock.md#size)
* [time](_src_model_response_bch_bchblock_.bchblock.md#time)
* [tx](_src_model_response_bch_bchblock_.bchblock.md#tx)
* [version](_src_model_response_bch_bchblock_.bchblock.md#version)

## Properties

### confirmations

•  **confirmations**: number

*Defined in [src/model/response/bch/BchBlock.ts:68](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L68)*

Number of blocks mined after this block.

**`memberof`** BchBlock

___

### difficulty

•  **difficulty**: number

*Defined in [src/model/response/bch/BchBlock.ts:62](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L62)*

**`memberof`** BchBlock

___

### hash

•  **hash**: string

*Defined in [src/model/response/bch/BchBlock.ts:14](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L14)*

Hash of block.

**`memberof`** BchBlock

___

### height

•  **height**: number

*Defined in [src/model/response/bch/BchBlock.ts:26](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L26)*

The number of blocks preceding a particular block on a block chain.

**`memberof`** BchBlock

___

### merkleroot

•  **merkleroot**: string

*Defined in [src/model/response/bch/BchBlock.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L38)*

The root node of a merkle tree, a descendant of all the hashed pairs in the tree.

**`memberof`** BchBlock

___

### nextblockhash

•  **nextblockhash**: string

*Defined in [src/model/response/bch/BchBlock.ts:80](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L80)*

Hash of the next block.

**`memberof`** BchBlock

___

### nonce

•  **nonce**: number

*Defined in [src/model/response/bch/BchBlock.ts:56](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L56)*

Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.

**`memberof`** BchBlock

___

### previousblockhash

•  **previousblockhash**: string

*Defined in [src/model/response/bch/BchBlock.ts:74](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L74)*

Hash of the previous block.

**`memberof`** BchBlock

___

### size

•  **size**: number

*Defined in [src/model/response/bch/BchBlock.ts:20](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L20)*

Block size.

**`memberof`** BchBlock

___

### time

•  **time**: number

*Defined in [src/model/response/bch/BchBlock.ts:50](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L50)*

Time of the block.

**`memberof`** BchBlock

___

### tx

•  **tx**: [BchTx](_src_model_response_bch_bchtx_.bchtx.md)[]

*Defined in [src/model/response/bch/BchBlock.ts:44](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L44)*

List of transactions present in the block.

**`memberof`** BchBlock

___

### version

•  **version**: number

*Defined in [src/model/response/bch/BchBlock.ts:32](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/bch/BchBlock.ts#L32)*

Block version.

**`memberof`** BchBlock
