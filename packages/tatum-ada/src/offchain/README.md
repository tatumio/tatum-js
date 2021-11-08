# Offchain API guide

In following guide we will see how to work with offchain endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-ada/) to see how to use other offchain endpoints.

## Import required libraries

```typescript
import {sendAdaOffchainTransaction} from '@tatumio/tatum-ada';
```

## Send cardano offchain transaction

```typescript
const txHash = await sendAdaOffchainTransaction(false, {
    mnemonic: 'sorry convince space length yard nation fitness trade act identify live exclude toast category weather news gain game public amateur crisp great seek odor',
    xpub: 'tpubDFm2ZWx6ehiBFvA3bfLJTpPa8aGRnMb69VFrf8n5sjWJ8fspa9qwzGXo3w8DgnMgmnsGBf7whE6qqzp9sVxzn3dBFCmXq4HqYzB45SEZFSE',
    senderAccountId: '60f990befd2f551040f512c0',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    amount: '1'
});
```

## Sign cardano offchain KMS transaction

```typescript
const transaction = await signAdaOffchainKMSTransaction({
    tx: {
        id: '60ab440d58019206c876b4f6',
        chain: 'ADA',
        serializedTransaction: '',
        hashes: ['02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000', '000000000000003650e3f5e4b3573c205eac32c6b60aa0b18b19f7e21c75052a']
    },
    mnemonic: 'sorry convince space length yard nation fitness trade act identify live exclude toast category weather news gain game public amateur crisp great seek odor',
    testnet: false
});
```

## Send cardano from Tatum ledger to blockchain

```typescript
const signatureId = await offchainTransferAdaKMS()
```