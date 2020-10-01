**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/vet/VetBlock"](../modules/_src_model_response_vet_vetblock_.md) / VetBlock

# Interface: VetBlock

**`export`** 

**`interface`** VetBlock

## Hierarchy

* **VetBlock**

## Index

### Properties

* [beneficiary](_src_model_response_vet_vetblock_.vetblock.md#beneficiary)
* [gasLimit](_src_model_response_vet_vetblock_.vetblock.md#gaslimit)
* [gasUsed](_src_model_response_vet_vetblock_.vetblock.md#gasused)
* [id](_src_model_response_vet_vetblock_.vetblock.md#id)
* [number](_src_model_response_vet_vetblock_.vetblock.md#number)
* [parentID](_src_model_response_vet_vetblock_.vetblock.md#parentid)
* [receiptsRoot](_src_model_response_vet_vetblock_.vetblock.md#receiptsroot)
* [signer](_src_model_response_vet_vetblock_.vetblock.md#signer)
* [size](_src_model_response_vet_vetblock_.vetblock.md#size)
* [stateRoot](_src_model_response_vet_vetblock_.vetblock.md#stateroot)
* [timestamp](_src_model_response_vet_vetblock_.vetblock.md#timestamp)
* [totalScore](_src_model_response_vet_vetblock_.vetblock.md#totalscore)
* [transactions](_src_model_response_vet_vetblock_.vetblock.md#transactions)
* [txsFeatures](_src_model_response_vet_vetblock_.vetblock.md#txsfeatures)
* [txsRoot](_src_model_response_vet_vetblock_.vetblock.md#txsroot)

## Properties

### beneficiary

•  **beneficiary**: string

*Defined in [src/model/response/vet/VetBlock.ts:48](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L48)*

Address of account to receive block reward

**`memberof`** VetBlock

___

### gasLimit

•  **gasLimit**: number

*Defined in [src/model/response/vet/VetBlock.ts:42](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L42)*

block gas limit (max allowed accumulative gas usage of transactions)

**`memberof`** VetBlock

___

### gasUsed

•  **gasUsed**: number

*Defined in [src/model/response/vet/VetBlock.ts:54](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L54)*

accumulative gas usage of transactions

**`memberof`** VetBlock

___

### id

•  **id**: string

*Defined in [src/model/response/vet/VetBlock.ts:18](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L18)*

block identifier

**`memberof`** VetBlock

___

### number

•  **number**: number

*Defined in [src/model/response/vet/VetBlock.ts:12](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L12)*

block number (height)

**`memberof`** VetBlock

___

### parentID

•  **parentID**: string

*Defined in [src/model/response/vet/VetBlock.ts:30](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L30)*

parent block ID

**`memberof`** VetBlock

___

### receiptsRoot

•  **receiptsRoot**: string

*Defined in [src/model/response/vet/VetBlock.ts:84](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L84)*

root hash of transaction receipts

**`memberof`** VetBlock

___

### signer

•  **signer**: string

*Defined in [src/model/response/vet/VetBlock.ts:90](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L90)*

the one who signed this block

**`memberof`** VetBlock

___

### size

•  **size**: number

*Defined in [src/model/response/vet/VetBlock.ts:24](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L24)*

RLP encoded block size in bytes

**`memberof`** VetBlock

___

### stateRoot

•  **stateRoot**: string

*Defined in [src/model/response/vet/VetBlock.ts:78](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L78)*

root hash of accounts state

**`memberof`** VetBlock

___

### timestamp

•  **timestamp**: number

*Defined in [src/model/response/vet/VetBlock.ts:36](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L36)*

block unix timestamp

**`memberof`** VetBlock

___

### totalScore

•  **totalScore**: number

*Defined in [src/model/response/vet/VetBlock.ts:60](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L60)*

sum of all ancestral blocks' score

**`memberof`** VetBlock

___

### transactions

•  **transactions**: string[]

*Defined in [src/model/response/vet/VetBlock.ts:96](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L96)*

transactions IDs

**`memberof`** VetBlock

___

### txsFeatures

•  **txsFeatures**: number

*Defined in [src/model/response/vet/VetBlock.ts:72](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L72)*

supported txs features bitset

**`memberof`** VetBlock

___

### txsRoot

•  **txsRoot**: string

*Defined in [src/model/response/vet/VetBlock.ts:66](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/vet/VetBlock.ts#L66)*

root hash of transactions in the block

**`memberof`** VetBlock
