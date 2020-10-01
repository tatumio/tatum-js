**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/ledger/subscription"

# Module: "src/ledger/subscription"

## Index

### Functions

* [cancelExistingSubscription](_src_ledger_subscription_.md#cancelexistingsubscription)
* [createNewSubscription](_src_ledger_subscription_.md#createnewsubscription)
* [listActiveSubscriptions](_src_ledger_subscription_.md#listactivesubscriptions)
* [obtainReportForSubscription](_src_ledger_subscription_.md#obtainreportforsubscription)

## Functions

### cancelExistingSubscription

▸ `Const`**cancelExistingSubscription**(`id`: string): Promise\<void>

*Defined in [src/ledger/subscription.ts:23](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/ledger/subscription.ts#L23)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteSubscription" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### createNewSubscription

▸ `Const`**createNewSubscription**(`data`: [Subscription](../interfaces/_src_model_response_ledger_subscription_.subscription.md)): Promise\<{ id: string  }>

*Defined in [src/ledger/subscription.ts:9](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/ledger/subscription.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/createSubscription" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [Subscription](../interfaces/_src_model_response_ledger_subscription_.subscription.md) |

**Returns:** Promise\<{ id: string  }>

___

### listActiveSubscriptions

▸ `Const`**listActiveSubscriptions**(`pageSize`: number, `offset`: number): Promise\<[Subscription](../interfaces/_src_model_response_ledger_subscription_.subscription.md)[]>

*Defined in [src/ledger/subscription.ts:16](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/ledger/subscription.ts#L16)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getSubscriptions" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Subscription](../interfaces/_src_model_response_ledger_subscription_.subscription.md)[]>

___

### obtainReportForSubscription

▸ `Const`**obtainReportForSubscription**(`id`: string): Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[] \| [Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>

*Defined in [src/ledger/subscription.ts:30](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/ledger/subscription.ts#L30)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getSubscriptionReport" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[] \| [Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>
