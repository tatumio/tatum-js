**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/request/BroadcastWithdrawal"](../modules/_src_model_request_broadcastwithdrawal_.md) / BroadcastWithdrawal

# Interface: BroadcastWithdrawal

**`export`** 

**`interface`** BroadcastWithdrawal

## Hierarchy

* **BroadcastWithdrawal**

## Index

### Properties

* [currency](_src_model_request_broadcastwithdrawal_.broadcastwithdrawal.md#currency)
* [signatureId](_src_model_request_broadcastwithdrawal_.broadcastwithdrawal.md#signatureid)
* [txData](_src_model_request_broadcastwithdrawal_.broadcastwithdrawal.md#txdata)
* [withdrawalId](_src_model_request_broadcastwithdrawal_.broadcastwithdrawal.md#withdrawalid)

## Properties

### currency

•  **currency**: string

*Defined in [src/model/request/BroadcastWithdrawal.ts:12](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/request/BroadcastWithdrawal.ts#L12)*

Currency of signed transaction to be broadcast, BTC, LTC, BCH, ETH, XRP, ERC20

**`memberof`** BroadcastWithdrawal

___

### signatureId

• `Optional` **signatureId**: undefined \| string

*Defined in [src/model/request/BroadcastWithdrawal.ts:30](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/request/BroadcastWithdrawal.ts#L30)*

Signature ID to be completed by transaction broadcast

**`memberof`** BroadcastWithdrawal

___

### txData

•  **txData**: string

*Defined in [src/model/request/BroadcastWithdrawal.ts:18](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/request/BroadcastWithdrawal.ts#L18)*

Raw signed transaction to be published to network.

**`memberof`** BroadcastWithdrawal

___

### withdrawalId

• `Optional` **withdrawalId**: undefined \| string

*Defined in [src/model/request/BroadcastWithdrawal.ts:24](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/request/BroadcastWithdrawal.ts#L24)*

Withdrawal ID to be completed by transaction broadcast

**`memberof`** BroadcastWithdrawal
