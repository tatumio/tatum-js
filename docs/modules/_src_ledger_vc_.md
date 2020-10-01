**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/ledger/vc"

# Module: "src/ledger/vc"

## Index

### Functions

* [createVirtualCurrency](_src_ledger_vc_.md#createvirtualcurrency)
* [getVirtualCurrencyByName](_src_ledger_vc_.md#getvirtualcurrencybyname)
* [mintVirtualCurrency](_src_ledger_vc_.md#mintvirtualcurrency)
* [revokeVirtualCurrency](_src_ledger_vc_.md#revokevirtualcurrency)
* [updateVirtualCurrency](_src_ledger_vc_.md#updatevirtualcurrency)

## Functions

### createVirtualCurrency

▸ `Const`**createVirtualCurrency**(`data`: [CreateCurrency](../classes/_src_model_request_createcurrency_.createcurrency.md)): Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

*Defined in [src/ledger/vc.ts:20](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/vc.ts#L20)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/createCurrency" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [CreateCurrency](../classes/_src_model_request_createcurrency_.createcurrency.md) |

**Returns:** Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

___

### getVirtualCurrencyByName

▸ `Const`**getVirtualCurrencyByName**(`name`: string): Promise\<[VC](../interfaces/_src_model_response_ledger_vc_.vc.md)>

*Defined in [src/ledger/vc.ts:13](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/vc.ts#L13)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getCurrency" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** Promise\<[VC](../interfaces/_src_model_response_ledger_vc_.vc.md)>

___

### mintVirtualCurrency

▸ `Const`**mintVirtualCurrency**(`data`: [CurrencyOperation](../classes/_src_model_request_currencyoperation_.currencyoperation.md)): Promise\<{ reference: string  }>

*Defined in [src/ledger/vc.ts:36](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/vc.ts#L36)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/mintCurrency" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [CurrencyOperation](../classes/_src_model_request_currencyoperation_.currencyoperation.md) |

**Returns:** Promise\<{ reference: string  }>

___

### revokeVirtualCurrency

▸ `Const`**revokeVirtualCurrency**(`data`: [CurrencyOperation](../classes/_src_model_request_currencyoperation_.currencyoperation.md)): Promise\<{ reference: string  }>

*Defined in [src/ledger/vc.ts:44](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/vc.ts#L44)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/revokeCurrency" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [CurrencyOperation](../classes/_src_model_request_currencyoperation_.currencyoperation.md) |

**Returns:** Promise\<{ reference: string  }>

___

### updateVirtualCurrency

▸ `Const`**updateVirtualCurrency**(`data`: [UpdateCurrency](../classes/_src_model_request_updatecurrency_.updatecurrency.md)): Promise\<void>

*Defined in [src/ledger/vc.ts:28](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/vc.ts#L28)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/updateCurrency" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [UpdateCurrency](../classes/_src_model_request_updatecurrency_.updatecurrency.md) |

**Returns:** Promise\<void>
