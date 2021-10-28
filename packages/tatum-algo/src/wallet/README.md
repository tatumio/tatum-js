# Wallet API guide

In following guide we will see how to work with wallet endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other wallet endpoints.

## Import required libraries

```typescript
import { generateWallet } from '@tatumio/tatum-algo';
```

## Generate a wallet

```typescript
const wallet = await generateWallet(Currency.ALGO, true);
```

## Generate an address

```typescript
const address = await generateAlgodAddressFromPrivatetKey(
    '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
);
```
