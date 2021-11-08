# Blockchain API guide

In following guide we will show how to work with BSC blockchain endpoints.

## Import required libraries

```typescript
import {bscGetCurrentBlock} from '@tatumio/tatum-bsc';
```

## Broadcast BSC transaction

```typescript
const txHash = await bscBroadcast('02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000');
```

## Get Current BSC block

```typescript
const block = await bscGetCurrentBlock();
```

## Get transactions count

```typescript
const transcationsCount = await bscGetTransactionsCount('76da8509079338edd85cecb26ebd0fd644adb347d86e9e3c32bdead4ececb6e3');
```

## Get BSC block for hash

```typescript
const block = await bscGetBlock('000000000000003650e3f5e4b3573c205eac32c6b60aa0b18b19f7e21c75052a');
```

## Get BSC account balance

```typescript
const balance = await bscGetAccountBalance('76da8509079338edd85cecb26ebd0fd644adb347d86e9e3c32bdead4ececb6e3');
```

## Get BSC transaction for hash

```typescript
const transaction = await bscGetTransaction('76da8509079338edd85cecb26ebd0fd644adb347d86e9e3c32bdead4ececb6e3');
```

## Estimate gas limit and has price for transaction

```typescript
const gasEstimate = await bscEstimateGas({
    from: '0x11bb089914dd9bfba33b8dc83a95d368afeb1553',
    to: '0x9b85c57222826d82dd106e8455d3918846b507d5',
    amount: '10'
});
```
