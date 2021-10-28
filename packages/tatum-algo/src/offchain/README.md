# Offchain API guide

In following guide we will see how to work with offchain endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other offchain endpoints.

## Import required libraries
```typescript
import { sendAlgorandOffchainTransaction } from '@tatumio/tatum-algo';
```

## Send algorand offchain transaction
```typescript
const txHash = await sendAlgorandOffchainTransaction(false, {
    mnemonic: 'artist alarm clerk obscure timber firm reopen provide ankle vicious exhibit waste math toilet believe puppy lucky coast post kind black suspect mule able market',
    senderAccountId: '60f990befd2f551040f512c0',
    address: 'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4',
    amount: '1'
});
```
