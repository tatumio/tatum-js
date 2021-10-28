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
    currency: 'ALGO'
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
    currencies: ['ALGO']
});
```

### Get transactions by a customer

```typescript
const transactions = await getTransactionsByCustomer({
    id: '60f990befd2f551040f512c0',
    amount: '10',
    currencies: ['ALGO']
});
```

### Get transactions by a ledger (find transactions across whole ledger)

```typescript
const transactions = await getTransactionsByLedger({
    amount: '10',
    currencies: ['ALGO'],
    from: 115565484,
    senderNote: 'Card payment'
});
```

### Get count of the account transactions

```typescript
const transactionsCount = await countTransactionsByAccount({
    id: '60f990befd2f551040f512c0',
    amount: '10',
    currencies: ['ALGO']
});
```
