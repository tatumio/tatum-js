**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/btc/BtcTx"](../modules/_src_model_response_btc_btctx_.md) / BtcTx

# Interface: BtcTx

**`export`** 

**`interface`** BtcTx

## Hierarchy

* **BtcTx**

## Index

### Properties

* [block](_src_model_response_btc_btctx_.btctx.md#block)
* [fee](_src_model_response_btc_btctx_.btctx.md#fee)
* [hash](_src_model_response_btc_btctx_.btctx.md#hash)
* [height](_src_model_response_btc_btctx_.btctx.md#height)
* [index](_src_model_response_btc_btctx_.btctx.md#index)
* [inputs](_src_model_response_btc_btctx_.btctx.md#inputs)
* [locktime](_src_model_response_btc_btctx_.btctx.md#locktime)
* [mtime](_src_model_response_btc_btctx_.btctx.md#mtime)
* [outputs](_src_model_response_btc_btctx_.btctx.md#outputs)
* [rate](_src_model_response_btc_btctx_.btctx.md#rate)
* [time](_src_model_response_btc_btctx_.btctx.md#time)
* [version](_src_model_response_btc_btctx_.btctx.md#version)
* [witnessHash](_src_model_response_btc_btctx_.btctx.md#witnesshash)

## Properties

### block

•  **block**: string

*Defined in [src/model/response/btc/BtcTx.ts:48](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L48)*

Hash of the block this transaction belongs to.

**`memberof`** BtcTx

___

### fee

•  **fee**: number

*Defined in [src/model/response/btc/BtcTx.ts:24](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L24)*

Fee paid for this transaction, in satoshis.

**`memberof`** BtcTx

___

### hash

•  **hash**: string

*Defined in [src/model/response/btc/BtcTx.ts:12](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L12)*

Transaction hash.

**`memberof`** BtcTx

___

### height

•  **height**: number

*Defined in [src/model/response/btc/BtcTx.ts:42](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L42)*

Height of the block this transaction belongs to.

**`memberof`** BtcTx

___

### index

•  **index**: number

*Defined in [src/model/response/btc/BtcTx.ts:60](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L60)*

Index of the transaction in the block.

**`memberof`** BtcTx

___

### inputs

•  **inputs**: [BtcTxInputs](_src_model_response_btc_btctx_.btctxinputs.md)[]

*Defined in [src/model/response/btc/BtcTx.ts:72](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L72)*

**`memberof`** BtcTx

___

### locktime

•  **locktime**: number

*Defined in [src/model/response/btc/BtcTx.ts:84](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L84)*

Block this transaction was included in.

**`memberof`** BtcTx

___

### mtime

•  **mtime**: number

*Defined in [src/model/response/btc/BtcTx.ts:36](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L36)*

**`memberof`** BtcTx

___

### outputs

•  **outputs**: [BtcTxOutputs](_src_model_response_btc_btctx_.btctxoutputs.md)[]

*Defined in [src/model/response/btc/BtcTx.ts:78](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L78)*

**`memberof`** BtcTx

___

### rate

•  **rate**: number

*Defined in [src/model/response/btc/BtcTx.ts:30](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L30)*

**`memberof`** BtcTx

___

### time

•  **time**: number

*Defined in [src/model/response/btc/BtcTx.ts:54](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L54)*

Time of the transaction.

**`memberof`** BtcTx

___

### version

•  **version**: number

*Defined in [src/model/response/btc/BtcTx.ts:66](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L66)*

Index of the transaction.

**`memberof`** BtcTx

___

### witnessHash

•  **witnessHash**: string

*Defined in [src/model/response/btc/BtcTx.ts:18](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/model/response/btc/BtcTx.ts#L18)*

Witness hash in case of a SegWit transaction.

**`memberof`** BtcTx
