# Blockchain API guide

In following guide we will show how to work with BNB blockchain endpoints.

## Import required libraries

```typescript
import { bnbGetAccount } from '@tatumio/tatum-bnb';
```

## Get BNB account
```typescript
const block = await bnbGetAccount('60f990befd2f551040f512c0');
```

## Broadcast BNB transaction
```typescript
const txHash = await bnbBroadcast('02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000');
```
