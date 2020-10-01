**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/ledger/account"

# Module: "src/ledger/account"

## Index

### Functions

* [activateAccount](_src_ledger_account_.md#activateaccount)
* [blockAmount](_src_ledger_account_.md#blockamount)
* [createAccount](_src_ledger_account_.md#createaccount)
* [deactivateAccount](_src_ledger_account_.md#deactivateaccount)
* [deleteBlockedAmount](_src_ledger_account_.md#deleteblockedamount)
* [deleteBlockedAmountForAccount](_src_ledger_account_.md#deleteblockedamountforaccount)
* [freezeAccount](_src_ledger_account_.md#freezeaccount)
* [getAccountBalance](_src_ledger_account_.md#getaccountbalance)
* [getAccountById](_src_ledger_account_.md#getaccountbyid)
* [getAccountsByCustomerId](_src_ledger_account_.md#getaccountsbycustomerid)
* [getAllAccounts](_src_ledger_account_.md#getallaccounts)
* [getBlockedAmountsByAccountId](_src_ledger_account_.md#getblockedamountsbyaccountid)
* [unfreezeAccount](_src_ledger_account_.md#unfreezeaccount)

## Functions

### activateAccount

▸ `Const`**activateAccount**(`id`: string): Promise\<void>

*Defined in [src/ledger/account.ts:53](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L53)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/activateAccount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### blockAmount

▸ `Const`**blockAmount**(`id`: string, `block`: [BlockAmount](../classes/_src_model_request_blockamount_.blockamount.md)): Promise\<{ id: string  }>

*Defined in [src/ledger/account.ts:31](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L31)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/blockAmount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`block` | [BlockAmount](../classes/_src_model_request_blockamount_.blockamount.md) |

**Returns:** Promise\<{ id: string  }>

___

### createAccount

▸ `Const`**createAccount**(`account`: [CreateAccount](../classes/_src_model_request_createaccount_.createaccount.md)): Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

*Defined in [src/ledger/account.ts:16](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L16)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/createAccount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`account` | [CreateAccount](../classes/_src_model_request_createaccount_.createaccount.md) |

**Returns:** Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

___

### deactivateAccount

▸ `Const`**deactivateAccount**(`id`: string): Promise\<void>

*Defined in [src/ledger/account.ts:60](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L60)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deactivateAccount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### deleteBlockedAmount

▸ `Const`**deleteBlockedAmount**(`id`: string): Promise\<void>

*Defined in [src/ledger/account.ts:39](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L39)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteBlockAmount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### deleteBlockedAmountForAccount

▸ `Const`**deleteBlockedAmountForAccount**(`id`: string): Promise\<void>

*Defined in [src/ledger/account.ts:46](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L46)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteAllBlockAmount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### freezeAccount

▸ `Const`**freezeAccount**(`id`: string): Promise\<void>

*Defined in [src/ledger/account.ts:67](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L67)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/freezeAccount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### getAccountBalance

▸ `Const`**getAccountBalance**(`id`: string): Promise\<[AccountBalance](../interfaces/_src_model_response_ledger_accountbalance_.accountbalance.md)>

*Defined in [src/ledger/account.ts:97](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L97)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getAccountBalance" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[AccountBalance](../interfaces/_src_model_response_ledger_accountbalance_.accountbalance.md)>

___

### getAccountById

▸ `Const`**getAccountById**(`id`: string): Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

*Defined in [src/ledger/account.ts:9](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getAccountByAccountId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

___

### getAccountsByCustomerId

▸ `Const`**getAccountsByCustomerId**(`id`: string, `pageSize`: number, `offset`: number): Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>

*Defined in [src/ledger/account.ts:81](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L81)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getAccountsByCustomerId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>

___

### getAllAccounts

▸ `Const`**getAllAccounts**(`pageSize`: number, `offset`: number): Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>

*Defined in [src/ledger/account.ts:89](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L89)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getAllAccounts" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>

___

### getBlockedAmountsByAccountId

▸ `Const`**getBlockedAmountsByAccountId**(`id`: string, `pageSize`: number, `offset`: number): Promise\<[Blockage](../interfaces/_src_model_response_ledger_blockage_.blockage.md)[]>

*Defined in [src/ledger/account.ts:24](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getBlockAmount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Blockage](../interfaces/_src_model_response_ledger_blockage_.blockage.md)[]>

___

### unfreezeAccount

▸ `Const`**unfreezeAccount**(`id`: string): Promise\<void>

*Defined in [src/ledger/account.ts:74](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/account.ts#L74)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/unfreezeAccount" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>
