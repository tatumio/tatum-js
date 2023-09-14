# NFT API guide

In following guide we will see how to work with NFT endpoints. Each endpoint below includes a link to the API documentation, where you can find more info about each API call. You can also browse the source code or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other NFT endpoints.

## Import required libraries

First, we must import the required libraries from Tatum JS. 

```typescript
import { mintNFTWithUri } from '@tatumio/tatum-v1';
```
## Deploy NFT
Next, we must [deploy an NFT smart contract](https://apidoc.tatum.io/.php#operation/NftDeployErc721) on our blockchain of choice.

In this call, we designate the chain we will be deploying our NFT smart contract on (Ethereum), the name of the NFT, and it's symbol. We can optionally enable provenance data, which will also allow for minting NFTs that pay royalties as percentages of each sale. 

```typescript
const transactionHash = await deployNFT(false, {
    name: 'MY_NFT',
    chain: Currency.ETH,
    symbol: 'NFT_SYMBOL'
});
```
## Get NFT contract address
To perform further operations, we must [get the contract address](https://apidoc.tatum.io/.php#operation/SCGetContractAddress)of the smart contract we have deployed from the transaction hash in the response to the deploy operation.

```typescript
const contractAddress = await getNFTContractAddress(Currency.ETH, '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492');
```
## Mint NFT
Now, we can [mint an NFT](https://apidoc.tatum.io/.php#operation/NftMintErc721) with metadata we have already uploaded to IPFS. For more info on uploading metadata to IPFS, please consult [this guide](https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft).

It is possible to mint NFTs that pay out royalties to the original authors each time they are transferred, either as a fixed cashback amount or a percentage of the sale price. NFTs that pay cashback as percentages also hold provenance data (i.e. a record of every transfer of the NFT).

To enable royalty payments as fixed values, you must include the authorAddresses and a list of cashbackValues to the corresponding addresses.

To enable royalty payments in percentages and NFT provenance data, the field “provenance: true” must be included in the body of the call. In this case, the cashbackValues field will be indicate percentages * 10,000 (e.g. a value of 15 = 0.15%). The fixedValues field in this case will be the minimum fixed value to be paid for each transaction in the native blockchain currency. If the percentage value is less than that of the fixedValue, the fixed value will be paid to the authors.

In the following example, we are creating an NFT with provenance data and percentage royalty cashback enabled.

```typescript
const transactionHash = await mintNFTWithUri(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    url: 'https://my-token-metadata-url',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
});
```
## Transfer NFT
Use the following API call to [transfer NFTs](https://apidoc.tatum.io/.php#operation/NftTransferErc721). For provenance NFTs with percentage royalties, "provenance: true" must again be included.

```typescript
const transactionHash = await transferNFT(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
});
```
## Get NFTs
Use the following endpoint to get lists of the NFTs held by different blockchain addresses.

```typescript
const nfts = await getNFTsByAddress(
    Currency.ETH,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
);
```

## Get Metadata URI
To [get the metadata](https://apidoc.tatum.io/.php#operation/NftGetMetadataErc721) included in an NFT, use the following endpoint. The required parameters are the chain, the address of the NFT smart contract, and the tokenID of the NFT.

```typescript
const metadataURI = await getNFTMetadataURI(
    Currency.ETH,
    '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
    '15',
);
```

## Get NFT royalty
Use the following endpoint to [get the royalty information](https://apidoc.tatum.io/.php#operation/NftGetRoyaltyErc721) about a specific NFT. The required parameters are the chain, the address of the NFT smart contract, and the tokenID of the NFT.

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
    symbol: 'NFT_SYMBOL'
});
```

## Mint NFT
```typescript
const transactionHash = await mintNFTWithUri(false, {
    to: '0x0ff64c166a462b31ed657c9d88c5ac4fef6b88b6',
    url: 'https://my-token-metadata-url',
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
});
```

## Burn NFT
Use the following endpoint to [burn an NFT](https://apidoc.tatum.io/.php#operation/NftBurnErc721). The required parameters are the chain, the address of the NFT smart contract, and the tokenID of the NFT.

```typescript
const transactionHash = await burnNFT(false, {
    tokenId: '12',
    chain: Currency.ETH,
    contractAddress: '0x7060694f5ce1feb5a255d06fdcf6e4f7a3507492',
});
```

## Update cashback for an author NFT
To [update the cashback value(s) for an author(s) of an NFT](https://apidoc.tatum.io/.php#operation/NftGetRoyaltyErc721), use the following API call. Cashback values for fixed value royalties and percentage royalties can be changed, but the fixedValue parameter for percentage royalties cannot.

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
