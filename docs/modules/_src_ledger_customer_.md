**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / "src/ledger/customer"

# Module: "src/ledger/customer"

## Index

### Functions

* [activateCustomer](_src_ledger_customer_.md#activatecustomer)
* [deactivateCustomer](_src_ledger_customer_.md#deactivatecustomer)
* [disableCustomer](_src_ledger_customer_.md#disablecustomer)
* [enableCustomer](_src_ledger_customer_.md#enablecustomer)
* [getAllCustomers](_src_ledger_customer_.md#getallcustomers)
* [getCustomer](_src_ledger_customer_.md#getcustomer)
* [updateCustomer](_src_ledger_customer_.md#updatecustomer)

## Functions

### activateCustomer

▸ `Const`**activateCustomer**(`id`: string): Promise\<void>

*Defined in [src/ledger/customer.ts:32](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L32)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/activateAccount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### deactivateCustomer

▸ `Const`**deactivateCustomer**(`id`: string): Promise\<void>

*Defined in [src/ledger/customer.ts:39](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L39)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deactivateCustomer" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### disableCustomer

▸ `Const`**disableCustomer**(`id`: string): Promise\<void>

*Defined in [src/ledger/customer.ts:53](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L53)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/disableCustomer" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### enableCustomer

▸ `Const`**enableCustomer**(`id`: string): Promise\<void>

*Defined in [src/ledger/customer.ts:46](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L46)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/enableCustomer" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### getAllCustomers

▸ `Const`**getAllCustomers**(`pageSize`: number, `offset`: number): Promise\<[Customer](../classes/_src_model_response_ledger_customer_.customer.md)[]>

*Defined in [src/ledger/customer.ts:17](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L17)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/findAllCustomers" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Customer](../classes/_src_model_response_ledger_customer_.customer.md)[]>

___

### getCustomer

▸ `Const`**getCustomer**(`id`: string): Promise\<[Customer](../classes/_src_model_response_ledger_customer_.customer.md)>

*Defined in [src/ledger/customer.ts:10](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L10)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getCustomerByExternalId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Customer](../classes/_src_model_response_ledger_customer_.customer.md)>

___

### updateCustomer

▸ `Const`**updateCustomer**(`id`: string, `data`: [CustomerUpdate](../classes/_src_model_request_customerupdate_.customerupdate.md)): Promise\<{ id: string  }>

*Defined in [src/ledger/customer.ts:24](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/ledger/customer.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/updateCustomer" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`data` | [CustomerUpdate](../classes/_src_model_request_customerupdate_.customerupdate.md) |

**Returns:** Promise\<{ id: string  }>
