# Ledger API guide

In following guide we will see how to work with Ledger endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other ledger endpoints.

## Import required libraries

```typescript
import { getAccountById } from '@tatumio/tatum';
```

## Account endpoints

All account endpoints are available in
the [account.ts](https://github.com/tatumio/tatum-js/blob/master/src/ledger/account.ts) file.

### Create a ledger account

```typescript
const account = await createAccount({
    currency: 'BTC',
    xpub: 'tpubDFmuT6v3SjkMcChBVLmfYnn8j2AEAxmsCyMA3JUvWGhSxoutQw1L4rywLUzgfAdkE894gJrFqTqCvV6neUYXGQFmd61G6D6XsTr93tZi237' // optional
});
```

### Account endpoints

```typescript
const account = await getAccountById('60f990befd2f551040f512c0');
```

### Get a ledger account

```typescript
const account = await getAccountById('60f990befd2f551040f512c0');
```

### Update a ledger account

```typescript
const account = await updateAccount('60f990befd2f551040f512c0', {
    accountCode: 'personal',
    accountNumber: 'CZK-1',
});
```

### Create a ledger accounts

```typescript
const accounts = await createAccounts({
    accounts: [
        {
            currency: 'BTC',
            xpub: 'tpubDFmuT6v3SjkMcChBVLmfYnn8j2AEAxmsCyMA3JUvWGhSxoutQw1L4rywLUzgfAdkE894gJrFqTqCvV6neUYXGQFmd61G6D6XsTr93tZi237' // optional
        },
        {
            currency: 'ETH',
            xpub: 'xpub6FNhgJaKz3jbXKP7c1QB5EwhFMeGCj6iDa8B2p5eJGWHjdPe2vZYHTfcqoh2B44hkn5sb6jNe7aqh7xqBrYCn67eh95vWwPidZ2jfJxa4fR' // optional
        }
    ]
});
```

### Block amount on a ledger account

```typescript
const blockId = await blockAmount('60f990befd2f551040f512c0', {
    amount: '10',
    type: 'CARD_PAYMENT',
    description: 'Purchase of the laptop via card.'
});
```

### Delete block amount on a ledger account

```typescript
await deleteBlockedAmountForAccount('60f990befd2f551040f512c0');
```

### Get all ledger accounts

```typescript
const accounts = await getAllAccounts();
```

### Get a ledger account balance

```typescript
const balance = await getAccountBalance('60f990befd2f551040f512c0');
```

## Customer endpoints

All customer endpoints are available in
the [customer.ts](https://github.com/tatumio/tatum-js/blob/master/src/ledger/customer.ts) file. There is no direct
create customer endpoint, because customer is automatically created when creating the account.

### Get a customer

```typescript
const customer = await getCustomer('5e6f30625dfb246430ddaca7');
```

### Get all customers

```typescript
const customers = await getAllCustomers();
```

### Update a customer

```typescript
const customer = await updateCustomer('5e6f30625dfb246430ddaca7', {
    customerCountry: Country.DE,
    accountingCurrency: Fiat.EUR,
    externalId: 'ds41das24vhj4d'
});
```

### Activate a customer

```typescript
await activateCustomer('5e6f30625dfb246430ddaca7');
```

### Deactivate a customer

```typescript
await deactivateCustomer('5e6f30625dfb246430ddaca7');
```

## Transaction endpoints

All customer endpoints are available in
the [transaction.ts](https://github.com/tatumio/tatum-js/blob/master/src/ledger/transaction.ts) file.

### Store a transaction

```typescript
const transaction = await storeTransaction({
    'senderAccountId': '603bddc9fbf47f7a279d76ca',
    'recipientAccountId': '603c04950476a57888bc4d02',
    'amount': '6',
    'transactionCode': 'card_payment_1',
    'paymentId': '9625',
    'recipientNote': 'Coffe purchase.',
    'baseRate': 1,
    'senderNote': 'Card purchase.'
})
```

### Get transactions by reference

```typescript
const transactions = await getTransactionsByReference('20398b34-f7a4-446d-8c59-da528b3d50e7')
```

### Get transactions by an account

```typescript
const transactions = await getTransactionsByAccount({
    id: '60f990befd2f551040f512c0',
    amount: '10',
    currencies: ['BTC', 'ETH']
});
```

### Get transactions by a customer

```typescript
const transactions = await getTransactionsByCustomer({
    id: '60f990befd2f551040f512c0',
    amount: '10',
    currencies: ['BTC', 'ETH']
});
```

### Get transactions by a ledger (find transactions across whole ledger)

```typescript
const transactions = await getTransactionsByLedger({
    amount: '10',
    currencies: ['BTC', 'ETH'],
    from: 115565484,
    senderNote: 'Card payment'
});
```

### Get count of the account transactions

```typescript
const transactionsCount = await countTransactionsByAccount({
    id: '60f990befd2f551040f512c0',
    amount: '10',
    currencies: ['BTC', 'ETH']
});
```

## Virtual currency endpoints
All virtual currency endpoints are available in the [vc.ts](https://github.com/tatumio/tatum-js/blob/master/src/ledger/vc.ts) file.

### Create a virtual currency

```typescript
const virtualCurrency = await createVirtualCurrency({
    name: 'VC_BTC_COPY',
    supply: '1000000',
    basePair: Currency.BTC,
    baseRate: 1,
    description: 'BTC Copy.',
    accountCode: 'VC_1'

});
```

### Get a virtual currency by name
```typescript
const virtualCurrency = await getVirtualCurrencyByName('VC_BTC_COPY');
```

### Mint a virtual currency
```typescript
const mintReference = await mintVirtualCurrency({
    accountId: '60f990befd2f551040f512c0',
    amount: '15'
});
```

### Revoke a virtual currency
```typescript
const revokeReference = await revokeVirtualCurrency({
    accountId: '60f990befd2f551040f512c0',
    amount: '15'
});
```

## Subscription endpoints
All subscription endpoints are available in the [subscription.ts](https://github.com/tatumio/tatum-js/blob/master/src/ledger/subscription.ts) file.

### Create a subscription - detect incoming blockchain transactions
```typescript
const subscription = await createNewSubscription({
    type: SubscriptionType.ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION,
    attr: {
        id: '60f990befd2f551040f512c0',
        url: 'https://my-webhook-url',
    },
});
```

### List active subscriptions
```typescript
const subscriptions = await listActiveSubscriptions();
```

### Cancel an existing subscription
```typescript
await cancelExistingSubscription('60f990befd2f551040f512c0');
```

### Obtain report for a subscription
```typescript
await obtainReportForSubscription('60f990befd2f551040f512c0');
```

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