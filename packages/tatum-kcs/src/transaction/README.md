# Transaction API guide

In following guide we will see how to work with transaction endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other transaction endpoints.

## Import required libraries

```typescript
import { sendBitcoinTransaction } from '@tatumio/tatum';
```

## Send bitcoin transaction - from address

```typescript
const transactionHash = await sendBitcoinTransaction(false, {
        fromAddress: [
            {
                address: "mhuKgqf7SLRWPX8Sfrqn68i5YcdWsFMRXF",
                privateKey: "cNkXKkQ4YoNS2LmnvhtGqWBQKg7oo3BRaowPhSDPvTRjxXyGG6yr"
            }
        ],
        to: [
            {
                address: "n1XD955iuticPuKoJJr8XfAjDw2gYadNrR",
                value: 0.15991455
            },
            {
                address: "mhuKgqf7SLRWPX8Sfrqn68i5YcdWsFMRXF",
                value: 0.4
            }
        ]
    }
);
```

## Send bitcoin transaction - from utxo

```typescript
const transactionHash = await sendBitcoinTransaction(false, {
        fromUTXO: [
            {
                txHash: "887dd5221800c65ada2a2081e65a14b5421b30600d4ab112421a44b17ded6ed4",
                index: 0,
                privateKey: "cNkXKkQ4YoNS2LmnvhtGqWBQKg7oo3BRaowPhSDPvTRjxXyGG6yr"
            }
        ],
        to: [
            {
                address: "n1XD955iuticPuKoJJr8XfAjDw2gYadNrR",
                value: 0.15991455
            },
            {
                address: "mhuKgqf7SLRWPX8Sfrqn68i5YcdWsFMRXF",
                value: 0.4
            }
        ]
    }
);
```

