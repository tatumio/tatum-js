**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ledger/OrderBook"](../modules/_src_model_response_ledger_orderbook_.md) / OrderBookResponse

# Interface: OrderBookResponse

## Hierarchy

* **OrderBookResponse**

## Index

### Properties

* [amount](_src_model_response_ledger_orderbook_.orderbookresponse.md#amount)
* [created](_src_model_response_ledger_orderbook_.orderbookresponse.md#created)
* [currency1AccountId](_src_model_response_ledger_orderbook_.orderbookresponse.md#currency1accountid)
* [currency2AccountId](_src_model_response_ledger_orderbook_.orderbookresponse.md#currency2accountid)
* [fill](_src_model_response_ledger_orderbook_.orderbookresponse.md#fill)
* [id](_src_model_response_ledger_orderbook_.orderbookresponse.md#id)
* [pair](_src_model_response_ledger_orderbook_.orderbookresponse.md#pair)
* [price](_src_model_response_ledger_orderbook_.orderbookresponse.md#price)
* [type](_src_model_response_ledger_orderbook_.orderbookresponse.md#type)

## Properties

### amount

•  **amount**: string

*Defined in [src/model/response/ledger/OrderBook.ts:31](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L31)*

Amount of the trade to be bought / sold.

**`memberof`** OrderBook

___

### created

•  **created**: number

*Defined in [src/model/response/ledger/OrderBook.ts:66](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L66)*

Creation date, UTC millis.

**`memberof`** OrderBook

___

### currency1AccountId

•  **currency1AccountId**: string

*Defined in [src/model/response/ledger/OrderBook.ts:52](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L52)*

ID of the account of the currency 1 trade currency.

**`memberof`** OrderBook

___

### currency2AccountId

•  **currency2AccountId**: string

*Defined in [src/model/response/ledger/OrderBook.ts:59](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L59)*

ID of the account of the currency 2 trade currency.

**`memberof`** OrderBook

___

### fill

•  **fill**: string

*Defined in [src/model/response/ledger/OrderBook.ts:45](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L45)*

How much of the trade was already filled.

**`memberof`** OrderBook

___

### id

•  **id**: string

*Defined in [src/model/response/ledger/OrderBook.ts:10](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L10)*

ID of the trade.

**`memberof`** OrderBook

___

### pair

•  **pair**: string

*Defined in [src/model/response/ledger/OrderBook.ts:38](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L38)*

Trading pair.

**`memberof`** OrderBook

___

### price

•  **price**: string

*Defined in [src/model/response/ledger/OrderBook.ts:24](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L24)*

Price to buy / sell.

**`memberof`** OrderBook

___

### type

•  **type**: [TradeType](../enums/_src_model_request_tradetype_.tradetype.md)

*Defined in [src/model/response/ledger/OrderBook.ts:17](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/OrderBook.ts#L17)*

Type of the trade, BUY or SELL.

**`memberof`** OrderBook
