**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / "src/ledger/transaction"

# Module: "src/ledger/transaction"

## Index

### Functions

* [countTransactionsByAccount](_src_ledger_transaction_.md#counttransactionsbyaccount)
* [countTransactionsByCustomer](_src_ledger_transaction_.md#counttransactionsbycustomer)
* [countTransactionsByLedger](_src_ledger_transaction_.md#counttransactionsbyledger)
* [getTransactionsByAccount](_src_ledger_transaction_.md#gettransactionsbyaccount)
* [getTransactionsByCustomer](_src_ledger_transaction_.md#gettransactionsbycustomer)
* [getTransactionsByLedger](_src_ledger_transaction_.md#gettransactionsbyledger)
* [getTransactionsByReference](_src_ledger_transaction_.md#gettransactionsbyreference)
* [storeTransaction](_src_ledger_transaction_.md#storetransaction)

## Functions

### countTransactionsByAccount

▸ `Const`**countTransactionsByAccount**(`filter`: [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md)): Promise\<number>

*Defined in [src/ledger/transaction.ts:51](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L51)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`filter` | [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md) |

**Returns:** Promise\<number>

___

### countTransactionsByCustomer

▸ `Const`**countTransactionsByCustomer**(`filter`: [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md)): Promise\<number>

*Defined in [src/ledger/transaction.ts:60](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L60)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`filter` | [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md) |

**Returns:** Promise\<number>

___

### countTransactionsByLedger

▸ `Const`**countTransactionsByLedger**(`filter`: [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md)): Promise\<number>

*Defined in [src/ledger/transaction.ts:69](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L69)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactions" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`filter` | [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md) |

**Returns:** Promise\<number>

___

### getTransactionsByAccount

▸ `Const`**getTransactionsByAccount**(`filter`: [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md), `pageSize`: number, `offset`: number): Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

*Defined in [src/ledger/transaction.ts:24](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L24)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`filter` | [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md) | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

___

### getTransactionsByCustomer

▸ `Const`**getTransactionsByCustomer**(`filter`: [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md), `pageSize`: number, `offset`: number): Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

*Defined in [src/ledger/transaction.ts:33](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L33)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`filter` | [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md) | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

___

### getTransactionsByLedger

▸ `Const`**getTransactionsByLedger**(`filter`: [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md), `pageSize`: number, `offset`: number): Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

*Defined in [src/ledger/transaction.ts:42](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L42)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactions" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`filter` | [TransactionFilter](../classes/_src_model_request_transactionfilter_.transactionfilter.md) | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

___

### getTransactionsByReference

▸ `Const`**getTransactionsByReference**(`reference`: string): Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

*Defined in [src/ledger/transaction.ts:9](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByReference" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`reference` | string |

**Returns:** Promise\<[Transaction](../interfaces/_src_model_response_ledger_transaction_.transaction.md)[]>

___

### storeTransaction

▸ `Const`**storeTransaction**(`transaction`: [CreateTransaction](../classes/_src_model_request_createtransaction_.createtransaction.md)): Promise\<{ reference: string  }>

*Defined in [src/ledger/transaction.ts:16](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/ledger/transaction.ts#L16)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/sendTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`transaction` | [CreateTransaction](../classes/_src_model_request_createtransaction_.createtransaction.md) |

**Returns:** Promise\<{ reference: string  }>
