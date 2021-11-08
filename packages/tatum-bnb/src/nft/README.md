# NFT API guide

In following guide we will see how to work with NFT endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-bnb/) to see how to use other NFT endpoints.

## Import required libraries

```typescript
import { getNFTsByAddress } from '@tatumio/tatum-bnb';
```

## Get NFTs

```typescript
const nfts = await getNFTsByAddress(
    Currency.BNB,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
);
```

## Get NFT contract address
```typescript
const contractAddress = await getNFTContractAddress(Currency.BNB, '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492');
```

## Get Metadata URI
```typescript
const metadataURI = await getNFTMetadataURI(
    Currency.BNB,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '15',
);
```

## Get NFT image
```typescript
const nftImage = await getNFTImage(
    Currency.BNB,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '15',
);
```

## Get NFT royalty
```typescript
const nftRoyalty = await getNFTRoyalty(
    Currency.BNB,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '15',
);
```
