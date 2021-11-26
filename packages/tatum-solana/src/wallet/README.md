# Wallet API guide

In following guide we will see how to work with wallet endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other wallet endpoints.

## Import required libraries

```typescript
import { generateWallet } from '@tatumio/tatum';
```

## Generate a wallet

```typescript
const wallet = await generateWallet(Currency.SOL, false);
```
