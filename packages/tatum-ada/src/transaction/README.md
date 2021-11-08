# Transaction API guide

In following guide we will see how to work with transaction endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-ada/) to see how to use other transaction endpoints.

## Import required libraries

```typescript
import {sendAdaTransaction} from '@tatumio/tatum-ada';
```

## Send cardano transaction - from address

```typescript
const transactionHash = await sendAdaTransaction({
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

## Prepare cardano transaction with the private key locally - from address

```typescript
const transactionHash = await prepareAdaTransaction({
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

## Sign cardano pending transaction from Tatum KMS

```typescript
const transaction = await signAdaKMSTransaction(
    {
        chain: Currency.ADA,
        serializedTransaction:
            '{"txData":{"fromAddress":[{"address":"addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s","signatureId":"b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"}],"to":[{"address":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3","value":1}]},"privateKeysToSign":["b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"]}',
        hashes: ['b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0'],
        id: '60f67210baf4120bb057c1ce',
    },
    [
        '2090e65cdf985bdada08ee383bfa24cb6c7143916fa948f1883ae1a6c0ff8e546fd2af77272c377a87aca22d75b71a95420c95378d1fd9e7f6a034b8312d47d341c9185113c7d9b2308523844e161f63d038497d7cdee1d989341ee38ef307d34893c218e0aff8561120e95e708fff007a935640f163c186d2865b4067cd959c',
    ]
);
```

## Send cardano transaction - from utxo

```typescript
const transactionHash = await sendAdaTransaction(false, {
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

