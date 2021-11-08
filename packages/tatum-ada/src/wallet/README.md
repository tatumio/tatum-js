# Wallet API guide

In following guide we will see how to work with wallet endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-ada/) to see how to use other wallet endpoints.

## Import required libraries

```typescript
import { generateWallet } from '@tatumio/tatum-ada';
```

## Generate a cardano wallet

```typescript
const wallet = await generateAdaWallet(Currency.ADA, false);
```

## Generate an address

```typescript
const address = await generateAddressFromXPub(
    Currency.ADA,
    false,
    'tpubDFmuT6v3SjkMcChBVLmfYnn8j2AEAxmsCyMA3JUvWGhSxoutQw1L4rywLUzgfAdkE894gJrFqTqCvV6neUYXGQFmd61G6D6XsTr93tZi237',
    1
);
```

## Generate a private key

```typescript
const privateKey = await generatePrivateKeyFromMnemonic(
    Currency.ADA,
    false,
    'critic spatial rug valley spawn grape humble motor burger direct jump galaxy still swim foot real vast tribe blast fence virtual away spice funny',
    1
);
```
