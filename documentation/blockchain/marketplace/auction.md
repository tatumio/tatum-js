# Auction API guide

In following guide we will see how to work with NFT endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other NFT endpoints.

## Import required libraries

```typescript
import { 
    DeployNftAuction,
    deployAuction,
    CreateAuction,
    sendAuctionCreate,
    sendCeloSmartContractReadMethodInvocationTransaction,
    sendAuctionApproveNftTransfer,
    InvokeAuctionOperation,
    sendAuctionSettle,
    sendAuctionBid,
    sendAuctionApproveNftTransfer,
    celoGetCurrentBlock
} from '@tatumio/tatum-v1';
```

## Deploy the auction smart contract

```typescript

        const body = new DeployNftAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.auctionFee = 150;
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            const test = await deployAuction(true, body, 'https://alfajores-forno.celo-testnet.org');
            console.log(test);
```

In the response you will get the transaction id, where you can find the contract address


## Create an auction for an existing NFT in native asset
```typescript
        const mint = new CeloMintErc721();
            mint.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            mint.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            mint.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            mint.tokenId = tokenId;
            mint.url = 'https://google.com';
            mint.feeCurrency = Currency.CUSD;
            mint.chain = Currency.CELO;
            console.log(await mintNFTWithUri(true, mint, 'https://alfajores-forno.celo-testnet.org'));

```
### Send auction approval for NFT

```typescript
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                chain: Currency.CELO, contractAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
                isErc721: true, spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038', tokenId
            }, 'https://alfajores-forno.celo-testnet.org'));

            const endedAt = (await celoGetCurrentBlock()) + 9;
```

### Create an auction
```typescript
            const body = new CreateAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.endedAt = endedAt;
            body.tokenId = tokenId;
            body.id = tokenId;
            body.isErc721 = true;
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            console.log(await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org'));
```
### Place a bid
```typescript
            const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            bid.id = tokenId;
            bid.bidValue = '0.001015';
            bid.feeCurrency = Currency.CELO;
            bid.chain = Currency.CELO;
            console.log(await sendAuctionBid(true, bid, 'https://alfajores-forno.celo-testnet.org'));
```
### Settle Auction

```typescript
            const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            settle.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            settle.id = tokenId;
            settle.feeCurrency = Currency.CUSD;
            settle.chain = Currency.CELO;
            console.log(await sendAuctionSettle(true, settle, 'https://alfajores-forno.celo-testnet.org'));
```

## Create an auction for an existing NFT in erc20 asset

### Send approval for NFT
```typescript
            await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                chain: Currency.CELO, contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                isErc721: true, spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038', tokenId
            }, 'https://alfajores-forno.celo-testnet.org');
```

### Create Auction
```typescript
    const endedAt = (await celoGetCurrentBlock()) + 7;
            const body = new CreateAuction();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            body.nftAddress = '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3';
            body.tokenId = tokenId;
            body.id = `${tokenId}1`;
            body.endedAt = endedAt;
            body.isErc721 = true;
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.erc20Address = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            console.log(await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org'));

```

### Approve erc20 transfer, and if cashbacks then approve for NFT address
```typescript
    const approve = new ApproveErc20();
            approve.contractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';
            approve.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            approve.chain = Currency.CELO;
            approve.feeCurrency = Currency.CELO;
            approve.amount = '0.001015';
            approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            approve.fee = {gasPrice: '5', gasLimit: '300000'};
            console.log(await sendAuctionApproveErc20Transfer(true, approve, 'https://alfajores-forno.celo-testnet.org'));
```

### Place a bid
```typescript
           const bid = new InvokeAuctionOperation();
            bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            bid.contractAddress = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            bid.id = `${tokenId}1`;
            bid.bidValue = '0.001015';
            bid.feeCurrency = Currency.CELO;
            bid.chain = Currency.CELO;
            bid.fee = {gasPrice: '5', gasLimit: '300000'};
            console.log(await sendAuctionBid(true, bid, 'https://alfajores-forno.celo-testnet.org'));
```

### Settle Auction
```typescript
        const settle = new InvokeAuctionOperation();
            settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            settle.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038';
            settle.id = tokenId;
            settle.feeCurrency = Currency.CUSD;
            settle.chain = Currency.CELO;
            console.log(await sendAuctionSettle(true, settle, 'https://alfajores-forno.celo-testnet.org'));

```
