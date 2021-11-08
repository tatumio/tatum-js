# Transaction API guide

In following guide we will see how to work with transaction endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-bsc/) to see how to use other transaction endpoints.

## Import required libraries

```typescript
import {sendBscOrBep20Transaction} from '@tatumio/tatum-bsc';
```

## Estimate Has price for transaction

```typescript
const gasPrice = await bscGetGasPriceInWei()
```

## Returns BSC server to connect to

```typescript
const client = await getBscClient()
```

## Sign BSC pending transaction

```typescript
const transaction = await signBscKMSTransaction(
    {
        chain: 'BSC',
        serializedTransaction:
            '{"txData":{"fromAddress":[{"address":"addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s","signatureId":"b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"}],"to":[{"address":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3","value":1}]},"privateKeysToSign":["b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"]}',
        hashes: ['02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000', '000000000000003650e3f5e4b3573c205eac32c6b60aa0b18b19f7e21c75052a'],
        id: '60f67210baf4120bb057c1ce',
    },
    [
        '2090e65cdf985bdada08ee383bfa24cb6c7143916fa948f1883ae1a6c0ff8e546fd2af77272c377a87aca22d75b71a95420c95378d1fd9e7f6a034b8312d47d341c9185113c7d9b2308523844e161f63d038497d7cdee1d989341ee38ef307d34893c218e0aff8561120e95e708fff007a935640f163c186d2865b4067cd959c',
    ]
);
```

## Sign BSC store data transaction with private keys locally

```typescript
const rawTransaction = await prepareBscStoreDataTransaction({
    data: 'transaction data',
    chain: 'BSC'
});
```

## Sign BEP20 transaction with private keys locally

```typescript
const transaction = await prepareMintBep20SignedTransaction({
    to: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
    amount: '10',
    contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3'
})
```

## Sign BEP20 transaction with private keys locally

```typescript
const transaction = await prepareBurnBep20SignedTransaction({
    amount: '10',
    contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3'
})
```

## Sign BSC or BEP20 transaction with private keys locally

```typescript
const transaction = await prepareBurnBep20SignedTransaction({
    amount: '10',
    contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3'
})
```

