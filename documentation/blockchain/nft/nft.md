# NFT API guide

In following guide we will see how to work with NFT endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other NFT endpoints.

## Import required libraries

```typescript
import { mintNFTWithUri } from '@tatumio/tatum-v1';
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
    fromPrivateKey:'0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
});
```

## Mint NFT
if cashbacks are to be made in custom erc20 add erc20:'contract address here' to the body
```typescript
const transactionHash = await mintNFTWithUri(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    url: 'https://my-token-metadata-url',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    authorAddresses: ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85"],
    cashbackValues: ["0.5"],
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
In case of custom erc20 cashbacks please send approval of erc20 to nft address
```typescript
const transactionHash = await transferNFT(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
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
