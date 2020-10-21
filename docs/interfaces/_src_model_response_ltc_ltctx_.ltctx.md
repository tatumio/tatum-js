**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ltc/LtcTx"](../modules/_src_model_response_ltc_ltctx_.md) / LtcTx

# Interface: LtcTx

**`export`** 

**`interface`** LtcTx

## Hierarchy

* **LtcTx**

## Index

### Properties

* [block](_src_model_response_ltc_ltctx_.ltctx.md#block)
* [fee](_src_model_response_ltc_ltctx_.ltctx.md#fee)
* [flag](_src_model_response_ltc_ltctx_.ltctx.md#flag)
* [hash](_src_model_response_ltc_ltctx_.ltctx.md#hash)
* [height](_src_model_response_ltc_ltctx_.ltctx.md#height)
* [index](_src_model_response_ltc_ltctx_.ltctx.md#index)
* [inputs](_src_model_response_ltc_ltctx_.ltctx.md#inputs)
* [locktime](_src_model_response_ltc_ltctx_.ltctx.md#locktime)
* [outputs](_src_model_response_ltc_ltctx_.ltctx.md#outputs)
* [ps](_src_model_response_ltc_ltctx_.ltctx.md#ps)
* [rate](_src_model_response_ltc_ltctx_.ltctx.md#rate)
* [ts](_src_model_response_ltc_ltctx_.ltctx.md#ts)
* [version](_src_model_response_ltc_ltctx_.ltctx.md#version)
* [witnessHash](_src_model_response_ltc_ltctx_.ltctx.md#witnesshash)

## Properties

### block

•  **block**: string

*Defined in [src/model/response/ltc/LtcTx.ts:48](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L48)*

Hash of the block this transaction belongs to.

**`memberof`** LtcTx

___

### fee

•  **fee**: string

*Defined in [src/model/response/ltc/LtcTx.ts:24](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L24)*

Fee paid for this transaction, in LTC.

**`memberof`** LtcTx

___

### flag

•  **flag**: number

*Defined in [src/model/response/ltc/LtcTx.ts:72](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L72)*

**`memberof`** LtcTx

___

### hash

•  **hash**: string

*Defined in [src/model/response/ltc/LtcTx.ts:12](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L12)*

Transaction hash.

**`memberof`** LtcTx

___

### height

•  **height**: number

*Defined in [src/model/response/ltc/LtcTx.ts:42](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L42)*

Height of the block this transaction belongs to.

**`memberof`** LtcTx

___

### index

•  **index**: number

*Defined in [src/model/response/ltc/LtcTx.ts:60](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L60)*

Index of the transaction in the block.

**`memberof`** LtcTx

___

### inputs

•  **inputs**: [LtcTxInputs](_src_model_response_ltc_ltctx_.ltctxinputs.md)[]

*Defined in [src/model/response/ltc/LtcTx.ts:78](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L78)*

**`memberof`** LtcTx

___

### locktime

•  **locktime**: number

*Defined in [src/model/response/ltc/LtcTx.ts:90](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L90)*

Block this transaction was included in.

**`memberof`** LtcTx

___

### outputs

•  **outputs**: [LtcTxOutputs](_src_model_response_ltc_ltctx_.ltctxoutputs.md)[]

*Defined in [src/model/response/ltc/LtcTx.ts:84](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L84)*

**`memberof`** LtcTx

___

### ps

•  **ps**: number

*Defined in [src/model/response/ltc/LtcTx.ts:36](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L36)*

**`memberof`** LtcTx

___

### rate

•  **rate**: string

*Defined in [src/model/response/ltc/LtcTx.ts:30](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L30)*

**`memberof`** LtcTx

___

### ts

•  **ts**: number

*Defined in [src/model/response/ltc/LtcTx.ts:54](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L54)*

Time of the transaction.

**`memberof`** LtcTx

___

### version

•  **version**: number

*Defined in [src/model/response/ltc/LtcTx.ts:66](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L66)*

Index of the transaction.

**`memberof`** LtcTx

___

### witnessHash

•  **witnessHash**: string

*Defined in [src/model/response/ltc/LtcTx.ts:18](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/ltc/LtcTx.ts#L18)*

Witness hash in case of a SegWit transaction.

**`memberof`** LtcTx
