# NFT API guide

Royalty payment and provenance NFTs:

It is possible to mint NFTs that pay out royalties to the original authors each time they are transferred, either as a fixed cashback amount or a percentage of the sale price. NFTs that pay cashback as percentages also hold provenance data (i.e. a record of every transfer of the NFT).

To enable royalty payments as fixed values, you must include the authorAddresses and a list of cashbackValues to the corresponding addresses.

To enable royalty payments in percentages and NFT provenance data, the field “provenance: true” must be included in the body of the call. In this case, the cashbackValues field will be indicate percentages * 10,000 (e.g. a value of 15 = 0.15%). The fixedValues field in this case will be the minimum fixed value to be paid for each transaction in the native blockchain currency. If the percentage value is less than that of the fixedValue, the fixed value will be paid to the authors.


## Import required libraries

```typescript
import { 
    deployNFT,
    mintNFTWithUri,
    mintMultipleNFTWithUri,
    getNFTsByAddress,
    getNFTContractAddress,
    getNFTMetadataURI
    } from '@tatumio/tatum';
```

## Get NFTs

```typescript
const nfts = await getNFTsByAddress(
    Currency.ETH,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
);
```

## Get NFT contract address
```typescript
const contractAddress = await getNFTContractAddress(Currency.ETH, '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492');
```

## Get Metadata URI
```typescript
const metadataURI = await getNFTMetadataURI(
    Currency.ETH,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '15',
);
```

## Get NFT royalty
```typescript
const nftRoyalty = await getNFTRoyalty(
    Currency.ETH,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '15',
);
```

## Deploy NFT
```typescript
const transactionHash = await deployNFT(false, {
    name: 'MY_NFT',
    chain: Currency.ETH,
    symbol: 'NFT_SYMBOL',
    provenance: true,
    fromPrivateKey:'0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
});
```

## Mint NFT
```typescript
const transactionHash = await mintNFTWithUri(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    url: 'https://my-token-metadata-url',
    tokenId: '12',
    provenance: true,
    chain: Currency.ETH,
    fromPrivateKey:'0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
});
```
## Mint NFT with cashback
```typescript
const transactionHash = await mintNFTWithUri(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    url: 'https://my-token-metadata-url',
    tokenId: '12',
    provenance: true,
    authorAddresses: ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85"],
    cashbackValues: ["0.5"],
    fixedValues: ["0.5"],
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    fromPrivateKey:'0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
});
```

## Burn NFT
```typescript
const transactionHash = await burnNFT(false, {
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    fromPrivateKey:'0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
});
```

## Transfer NFT
### In case of cashbacks, the user has to provide allowance to the nft address
```typescript
const transactionHash = await transferNFT(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    provenance: true,
    provenanceData: "test",
    tokenPrice: "1",
    fromPrivateKey:'0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
});
```

## Update cashback for an author NFT
```typescript
const transactionHash = await updateCashbackForAuthorNFT(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    cashbackValue: '15',
    fromPrivateKey: '0x315ea1dae65c75f088542161a0777525a8de1153904c745cb8131a9e0c632204'
});
```

## Get provenance data

```typescript
    const obj = await getNFTProvenanceData(Currency.ETH,contractAddress,tokenId)
```