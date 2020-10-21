**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/offchain/Address"](../modules/_src_model_response_offchain_address_.md) / Address

# Interface: Address

## Hierarchy

* **Address**

## Index

### Properties

* [address](_src_model_response_offchain_address_.address.md#address)
* [currency](_src_model_response_offchain_address_.address.md#currency)
* [derivationKey](_src_model_response_offchain_address_.address.md#derivationkey)
* [destinatinTag](_src_model_response_offchain_address_.address.md#destinatintag)
* [message](_src_model_response_offchain_address_.address.md#message)
* [xpub](_src_model_response_offchain_address_.address.md#xpub)

## Properties

### address

•  **address**: string

*Defined in [src/model/response/offchain/Address.ts:7](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/offchain/Address.ts#L7)*

Blockchain address.

**`memberof`** Address

___

### currency

•  **currency**: string

*Defined in [src/model/response/offchain/Address.ts:13](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/offchain/Address.ts#L13)*

Currency of generated address. BTC, LTC, BCH, ETH, XRP, ERC20.

**`memberof`** Address

___

### derivationKey

• `Optional` **derivationKey**: undefined \| number

*Defined in [src/model/response/offchain/Address.ts:19](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/offchain/Address.ts#L19)*

Derivation key index for given address.

**`memberof`** Address

___

### destinatinTag

• `Optional` **destinatinTag**: undefined \| number

*Defined in [src/model/response/offchain/Address.ts:32](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/offchain/Address.ts#L32)*

In case of XRP, destinationTag is the distinguisher of the account.

**`memberof`** Address

___

### message

• `Optional` **message**: undefined \| string

*Defined in [src/model/response/offchain/Address.ts:38](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/offchain/Address.ts#L38)*

In case of XLM, message is the distinguisher of the account.

**`memberof`** Address

___

### xpub

• `Optional` **xpub**: undefined \| string

*Defined in [src/model/response/offchain/Address.ts:26](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/model/response/offchain/Address.ts#L26)*

Extended public key to derive address from. In case of XRP, this is account address,
since address is defined as DestinationTag, which is address field. In case of XLM, this is account address, since address is defined as message, which is address field.

**`memberof`** Address
