# Offchain API guide

In following guide we will see how to work with offchain endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other offchain endpoints.

## Import required libraries
```typescript
import { sendBitcoinOffchainTransaction } from '@tatumio/tatum';
```

## Send bitcoin offchain transaction
```typescript
const txHash = await sendBitcoinOffchainTransaction(false, {
    mnemonic: 'sorry convince space length yard nation fitness trade act identify live exclude toast category weather news gain game public amateur crisp great seek odor',
    xpub: 'tpubDFm2ZWx6ehiBFvA3bfLJTpPa8aGRnMb69VFrf8n5sjWJ8fspa9qwzGXo3w8DgnMgmnsGBf7whE6qqzp9sVxzn3dBFCmXq4HqYzB45SEZFSE',
    senderAccountId: '60f990befd2f551040f512c0',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    amount: '1'
});
```
