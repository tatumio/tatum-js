**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ledger/VC"](../modules/_src_model_response_ledger_vc_.md) / VC

# Interface: VC

**`export`** 

**`interface`** VC

## Hierarchy

* **VC**

## Index

### Properties

* [accountId](_src_model_response_ledger_vc_.vc.md#accountid)
* [basePair](_src_model_response_ledger_vc_.vc.md#basepair)
* [baseRate](_src_model_response_ledger_vc_.vc.md#baserate)
* [chain](_src_model_response_ledger_vc_.vc.md#chain)
* [customerId](_src_model_response_ledger_vc_.vc.md#customerid)
* [description](_src_model_response_ledger_vc_.vc.md#description)
* [erc20Address](_src_model_response_ledger_vc_.vc.md#erc20address)
* [initialAddress](_src_model_response_ledger_vc_.vc.md#initialaddress)
* [issuerAccount](_src_model_response_ledger_vc_.vc.md#issueraccount)
* [name](_src_model_response_ledger_vc_.vc.md#name)
* [supply](_src_model_response_ledger_vc_.vc.md#supply)

## Properties

### accountId

•  **accountId**: string

*Defined in [src/model/response/ledger/VC.ts:48](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L48)*

Virtual currency account.

**`memberof`** VC

___

### basePair

•  **basePair**: [BasePairEnum](../enums/_src_model_response_ledger_vc_.basepairenum.md)

*Defined in [src/model/response/ledger/VC.ts:18](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L18)*

Base pair for virtual currency. Transaction value will be calculated according to this base pair. e.g. 1 VC_VIRTUAL is equal to 1 BTC, if basePair is set to BTC.

**`memberof`** VC

___

### baseRate

•  **baseRate**: number

*Defined in [src/model/response/ledger/VC.ts:12](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L12)*

Exchange rate of the base pair. Each unit of the created curency will represent value of baseRate*1 basePair.

**`memberof`** VC

___

### chain

• `Optional` **chain**: undefined \| string

*Defined in [src/model/response/ledger/VC.ts:66](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L66)*

Blockchain, on which this virtual currency is paired on. Not present, when Tatum's private ledger is used as a base ledger.

**`memberof`** VC

___

### customerId

• `Optional` **customerId**: undefined \| string

*Defined in [src/model/response/ledger/VC.ts:24](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L24)*

ID of customer associated with virtual currency.

**`memberof`** VC

___

### description

•  **description**: string

*Defined in [src/model/response/ledger/VC.ts:30](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L30)*

Used as a description within Tatum system.

**`memberof`** VC

___

### erc20Address

• `Optional` **erc20Address**: undefined \| string

*Defined in [src/model/response/ledger/VC.ts:54](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L54)*

Address of ERC20 token.

**`memberof`** VC

___

### initialAddress

• `Optional` **initialAddress**: undefined \| string

*Defined in [src/model/response/ledger/VC.ts:72](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L72)*

Ethereum address, where initial supply was minted.

**`memberof`** VC

___

### issuerAccount

• `Optional` **issuerAccount**: undefined \| string

*Defined in [src/model/response/ledger/VC.ts:60](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L60)*

Virtual currency account, on which initial supply was minted.

**`memberof`** VC

___

### name

•  **name**: string

*Defined in [src/model/response/ledger/VC.ts:36](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L36)*

Virtual currency name. Must be prefixed with 'VC_'.

**`memberof`** VC

___

### supply

•  **supply**: string

*Defined in [src/model/response/ledger/VC.ts:42](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/VC.ts#L42)*

Supply of virtual currency.

**`memberof`** VC
