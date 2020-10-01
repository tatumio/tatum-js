**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ledger/Account"](../modules/_src_model_response_ledger_account_.md) / Account

# Interface: Account

## Hierarchy

* **Account**

## Index

### Properties

* [accountCode](_src_model_response_ledger_account_.account.md#accountcode)
* [active](_src_model_response_ledger_account_.account.md#active)
* [balance](_src_model_response_ledger_account_.account.md#balance)
* [created](_src_model_response_ledger_account_.account.md#created)
* [currency](_src_model_response_ledger_account_.account.md#currency)
* [customerId](_src_model_response_ledger_account_.account.md#customerid)
* [frozen](_src_model_response_ledger_account_.account.md#frozen)
* [id](_src_model_response_ledger_account_.account.md#id)
* [xpub](_src_model_response_ledger_account_.account.md#xpub)

## Properties

### accountCode

• `Optional` **accountCode**: undefined \| string

*Defined in [src/model/response/ledger/Account.ts:14](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L14)*

For bookkeeping to distinct account purpose.

**`memberof`** Account

___

### active

•  **active**: boolean

*Defined in [src/model/response/ledger/Account.ts:56](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L56)*

Indicates whether account is active or not.

**`memberof`** Account

___

### balance

•  **balance**: [AccountBalance](_src_model_response_ledger_accountbalance_.accountbalance.md)

*Defined in [src/model/response/ledger/Account.ts:26](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L26)*

**`memberof`** Account

___

### created

•  **created**: string

*Defined in [src/model/response/ledger/Account.ts:32](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L32)*

Time of account creation.

**`memberof`** Account

___

### currency

•  **currency**: string

*Defined in [src/model/response/ledger/Account.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L38)*

Account currency. Supported values are BTC, LTC, BCH, ETH, XRP, Tatum Virtual Currencies started with VC_ prefix or ERC20 customer token created via Tatum Platform.

**`memberof`** Account

___

### customerId

• `Optional` **customerId**: undefined \| string

*Defined in [src/model/response/ledger/Account.ts:44](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L44)*

ID of newly created customer or existing customer associated with account.

**`memberof`** Account

___

### frozen

•  **frozen**: boolean

*Defined in [src/model/response/ledger/Account.ts:50](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L50)*

Indicates whether account is frozen or not.

**`memberof`** Account

___

### id

•  **id**: string

*Defined in [src/model/response/ledger/Account.ts:20](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L20)*

Account ID.

**`memberof`** Account

___

### xpub

• `Optional` **xpub**: undefined \| string

*Defined in [src/model/response/ledger/Account.ts:64](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Account.ts#L64)*

Extended public key to derive address from.
In case of XRP, this is account address, since address is defined as DestinationTag, which is address field.
In case of XLM, this is account address, since address is defined as message, which is address field.

**`memberof`** Account
