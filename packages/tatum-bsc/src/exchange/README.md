## Order book endpoints
All order book endpoints are available in the [orderBook.ts](https://github.com/tatumio/tatum-js/blob/master/src/ledger/orderBook.ts) file.

### Store a sell trade
```typescript
const trade = await storeTrade({
    type: "SELL",
    price: "2",
    amount: "2",
    pair: "VC_BTC/VC_ETH",
    currency1AccountId: "60ab440d58019206c876b4f6",
    currency2AccountId: "609d0696bf835c241ac2920f"
});
```

### Store a buy trade
```typescript
const trade = await storeTrade({
    type: "BUY",
    price: "2",
    amount: "2",
    pair: "VC_BTC/VC_ETH",
    currency1AccountId: "60ab440d58019206c876b4f6",
    currency2AccountId: "609d0696bf835c241ac2920f"
});
```

### Get a trade
```typescript
const trade = await getTradeById('60ab440d58019206c876b4f6');
```

### Get all active sell trades
```typescript
const sellTrades = await getActiveSellTrades('60ab440d58019206c876b4f6');
```