**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/ledger/orderBook"

# Module: "src/ledger/orderBook"

## Index

### Functions

* [deleteAccountTrades](_src_ledger_orderbook_.md#deleteaccounttrades)
* [deleteTrade](_src_ledger_orderbook_.md#deletetrade)
* [getActiveBuyTrades](_src_ledger_orderbook_.md#getactivebuytrades)
* [getActiveSellTrades](_src_ledger_orderbook_.md#getactiveselltrades)
* [getHistoricalTrades](_src_ledger_orderbook_.md#gethistoricaltrades)
* [getTradeById](_src_ledger_orderbook_.md#gettradebyid)
* [storeTrade](_src_ledger_orderbook_.md#storetrade)

## Functions

### deleteAccountTrades

▸ `Const`**deleteAccountTrades**(`id`: string): Promise\<void>

*Defined in [src/ledger/orderBook.ts:64](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L64)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteAccountTrades" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### deleteTrade

▸ `Const`**deleteTrade**(`id`: string): Promise\<void>

*Defined in [src/ledger/orderBook.ts:55](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L55)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteTrade" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<void>

___

### getActiveBuyTrades

▸ `Const`**getActiveBuyTrades**(`id`: string, `pageSize`: number, `offset`: number): Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)[]>

*Defined in [src/ledger/orderBook.ts:18](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L18)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getBuyTrades" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)[]>

___

### getActiveSellTrades

▸ `Const`**getActiveSellTrades**(`id`: string, `pageSize`: number, `offset`: number): Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)[]>

*Defined in [src/ledger/orderBook.ts:27](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L27)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getSellTrades" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | string | - |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)[]>

___

### getHistoricalTrades

▸ `Const`**getHistoricalTrades**(`pageSize`: number, `offset`: number): Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)[]>

*Defined in [src/ledger/orderBook.ts:9](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getHistoricalTrades" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`pageSize` | number | 50 |
`offset` | number | 0 |

**Returns:** Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)[]>

___

### getTradeById

▸ `Const`**getTradeById**(`id`: string): Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)>

*Defined in [src/ledger/orderBook.ts:46](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L46)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getTradeById" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[OrderBookResponse](../interfaces/_src_model_response_ledger_orderbook_.orderbookresponse.md)>

___

### storeTrade

▸ `Const`**storeTrade**(`data`: [OrderBookRequest](../classes/_src_model_request_orderbook_.orderbookrequest.md)): Promise\<{ id: string  }>

*Defined in [src/ledger/orderBook.ts:36](https://github.com/tatumio/tatum-js/blob/8f0f126/src/ledger/orderBook.ts#L36)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/storeTrade" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [OrderBookRequest](../classes/_src_model_request_orderbook_.orderbookrequest.md) |

**Returns:** Promise\<{ id: string  }>
