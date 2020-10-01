**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/offchain/WithdrawalResponse"](../modules/_src_model_response_offchain_withdrawalresponse_.md) / WithdrawalResponseData

# Interface: WithdrawalResponseData

**`export`** 

**`interface`** WithdrawalResponseData

## Hierarchy

* **WithdrawalResponseData**

## Index

### Properties

* [address](_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md#address)
* [amount](_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md#amount)
* [scriptPubKey](_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md#scriptpubkey)
* [vIn](_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md#vin)
* [vInIndex](_src_model_response_offchain_withdrawalresponse_.withdrawalresponsedata.md#vinindex)

## Properties

### address

•  **address**: [Address](_src_model_response_offchain_address_.address.md)

*Defined in [src/model/response/offchain/WithdrawalResponse.ts:40](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/offchain/WithdrawalResponse.ts#L40)*

**`memberof`** WithdrawalResponseData

___

### amount

•  **amount**: number

*Defined in [src/model/response/offchain/WithdrawalResponse.ts:46](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/offchain/WithdrawalResponse.ts#L46)*

Amount of unprocessed transaction outputs, that can be used for withdrawal. Bitcoin, Litecoin, Bitcoin Cash only.

**`memberof`** WithdrawalResponseData

___

### scriptPubKey

•  **scriptPubKey**: string

*Defined in [src/model/response/offchain/WithdrawalResponse.ts:65](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/offchain/WithdrawalResponse.ts#L65)*

Script of last unprocessed UTXO. Bitcoin SV only.

**`memberof`** WithdrawalResponseData

___

### vIn

•  **vIn**: string

*Defined in [src/model/response/offchain/WithdrawalResponse.ts:53](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/offchain/WithdrawalResponse.ts#L53)*

Last used unprocessed transaction output, that can be used.
Bitcoin, Litecoin, Bitcoin Cash only. If -1, it indicates prepared vOut with amount to be transferred to pool address.

**`memberof`** WithdrawalResponseData

___

### vInIndex

•  **vInIndex**: number

*Defined in [src/model/response/offchain/WithdrawalResponse.ts:59](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/offchain/WithdrawalResponse.ts#L59)*

Index of last used unprocessed transaction output in raw transaction, that can be used. Bitcoin, Litecoin, Bitcoin Cash only.

**`memberof`** WithdrawalResponseData
