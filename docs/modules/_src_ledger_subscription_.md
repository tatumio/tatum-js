**@tatumio/tatum - v1.4.4**

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

*Defined in [src/ledger/subscription.ts:22](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/subscription.ts#L22)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteSubscription" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### createNewSubscription

▸ `Const`**createNewSubscription**(`data`: [CreateSubscription](../interfaces/_src_model_response_ledger_subscription_.createsubscription.md)): Promise\<{ id: string  }>

*Defined in [src/ledger/subscription.ts:8](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/subscription.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/createSubscription" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [CreateSubscription](../interfaces/_src_model_response_ledger_subscription_.createsubscription.md) |

**Returns:** Promise\<{ id: string  }>

___

### listActiveSubscriptions

▸ `Const`**listActiveSubscriptions**(`pageSize`: number, `offset`: number): Promise\<[Subscription](../interfaces/_src_model_response_ledger_subscription_.subscription.md)[]>

*Defined in [src/ledger/subscription.ts:15](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/subscription.ts#L15)*

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

*Defined in [src/ledger/subscription.ts:29](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/subscription.ts#L29)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getSubscriptionReport" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[] \| [Account](../interfaces/_src_model_response_ledger_account_.account.md)[]>
