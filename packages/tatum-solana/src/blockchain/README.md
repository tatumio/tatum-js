# Blockchain API guide

In following guide we will show how to work with SOL blockchain endpoints.
Just browse source code or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other blockchains.

## Import required libraries

```typescript
import { solanaGetCurrentBlock, solanaGetAccountBalance, solanaGetBlock, solanaGetTransaction, solanaBroadcast } from '@tatumio/tatum';
```

## Get Current SOL block
```typescript
const block = await solanaGetCurrentBlock();
```

## Get SOL balance for address
```typescript
const balance = await solanaGetAccountBalance('FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ');
```

## Get SOL block for hash
```typescript
const block = await solanaGetBlock('000000000000003650e3f5e4b3573c205eac32c6b60aa0b18b19f7e21c75052a');
```

## Get SOL block hash for index
```typescript
const blockHash = await solanaGetBlock(2064607);
```

## Get SOL transaction for hash
```typescript
const transaction = await solanaGetTransaction('76da8509079338edd85cecb26ebd0fd644adb347d86e9e3c32bdead4ececb6e3');
```

## Broadcast SOL transaction
```typescript
const txHash = await solanaBroadcast('02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000');
```

