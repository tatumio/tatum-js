# Marketplace API guide

In following guide we will see how to work with NFT endpoints. Just browse source code
or [Github Pages](https://tatumio.github.io/tatum-js/) to see how to use other NFT endpoints.

## Import required libraries

```typescript
import { 
    deployMarketplaceListing,
    sendMarketplaceApproveErc20Spending,
    sendMarketplaceBuyListing,
    sendMarketplaceCreateListing,
    sendCeloSmartContractReadMethodInvocationTransaction,
    sendAuctionApproveNftTransfer
} from '@tatumio/tatum';
```

## Deploy the smart contract for marketplace

```typescript

        const body = new DeployMarketplaceListing()
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.marketplaceFee = 150
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO
            const test = await deployMarketplaceListing(true, body, 'https://alfajores-forno.celo-testnet.org')
            console.log(test)
```

In the response you will get the transaction id, where you can find the contract address

## Create a listing for an existing NFT
If you want the transfer to be in custom erc20 mention the address of the contract in body.erc20Address

```typescript
        const body = new CreateMarketplaceListing()
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
            body.tokenId = '1'
            body.listingId = '1'
            body.isErc721 = true
            body.price = '1'
            body.erc20Address = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO;
            console.log(await sendMarketplaceCreateListing(true, body, 'https://alfajores-forno.celo-testnet.org'));
```
## Send approval for NFT

```typescript
            console.log(await sendAuctionApproveNftTransfer(true, {
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                chain: Currency.CELO,
                contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
                isErc721: true,
                spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
                tokenId:'1'
            }, 'https://alfajores-forno.celo-testnet.org'));

            const endedAt = (await celoGetCurrentBlock()) + 9;
```


In response you will get a transaction id if the transaction is successful

## Get listings with Listing id
```typescript
        const r = new SmartContractReadMethodInvocation()
            r.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            r.methodName = 'getListing'
            r.methodABI = listing.abi.find(a => a.name === r.methodName)
            r.params = ['1']
            console.log(await sendCeloSmartContractReadMethodInvocationTransaction(true, r, 'https://alfajores-forno.celo-testnet.org'))
```

## Buy asset from listing
In case of cashbacks in custom erc20, you will need to give allowance from buyer account to the nft marketplace address

```typescript
        const approve = new ApproveErc20();
            approve.contractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';
            approve.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            approve.chain = Currency.CELO;
            approve.feeCurrency = Currency.CELO
            approve.amount = '1.015'
            approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            approve.fee = {gasPrice: '5', gasLimit: '300000'};
            console.log(await sendMarketplaceApproveErc20Spending(true, approve, 'https://alfajores-forno.celo-testnet.org'));

        const body = new InvokeMarketplaceListingOperation()
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            body.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            body.listingId = '1'
            body.amount = '1.015'
            body.feeCurrency = Currency.CELO
            body.chain = Currency.CELO;
            console.log(await sendMarketplaceBuyListing(true, body, 'https://alfajores-forno.celo-testnet.org'));
```

## Get marketplace fees
```typescript
 const r = new SmartContractReadMethodInvocation()
            r.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
            r.methodName = 'getMarketplaceFee'
            r.methodABI = listing.abi.find(a => a.name === r.methodName)
            r.params = []
            console.log(await sendCeloSmartContractReadMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
```