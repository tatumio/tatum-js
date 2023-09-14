# Security API guide

In following guide we will see how to work with security endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other security endpoints.

## Import required libraries
```typescript
import { getTransactionKMS } from '@tatumio/tatum-v1';
```

## Get a KMS transaction
```typescript
const transaction = await getTransactionKMS('60f990befd2f551040f512c0');
```

## Delete a KMS transaction
```typescript
await deleteTransactionKMS('60f990befd2f551040f512c0');
```

## Complete a pending KMS transaction
```typescript
await completePendingTransactionKMS('76da8509079338edd85cecb26ebd0fd644adb347d86e9e3c32bdead4ececb6e3');
```
