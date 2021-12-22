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