import { DeployMarketplaceListing, Currency, CreateMarketplaceListing, SmartContractReadMethodInvocation, listing, InvokeMarketplaceListingOperation, ApproveErc20 } from '@tatumio/tatum-core';
import {
    sendCeloSmartContractReadMethodInvocationTransaction,
} from '../../transaction';
import {
    deployMarketplaceListing,
    sendMarketplaceApproveErc20Spending,
    sendMarketplaceBuyListing,
    sendMarketplaceCreateListing
} from './listing';

describe('Marketplace Listing tests', () => {
    jest.setTimeout(99999)
    
    describe('Marketplace Listing CELO transactions', () => {
        it('should deploy marketplace', async () => {
            const body = new DeployMarketplaceListing()
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.marketplaceFee = 150
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO
            const test = await deployMarketplaceListing(true, body, 'https://alfajores-forno.celo-testnet.org')
            console.log(test)
            expect(test).toBeDefined()
        })

        it('should create listing native asset', async () => {
            const body = new CreateMarketplaceListing()
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
            body.tokenId = '33333'
            body.listingId = '1'
            body.isErc721 = true
            body.price = '1'
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO;
            console.log(await sendMarketplaceCreateListing(true, body, 'https://alfajores-forno.celo-testnet.org'));
        })

        it('should create listing erc20 asset', async () => {
            const body = new CreateMarketplaceListing()
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
            body.tokenId = '33334'
            body.listingId = '2'
            body.isErc721 = true
            body.price = '1'
            body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
            body.erc20Address = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO;
            console.log(await sendMarketplaceCreateListing(true, body, 'https://alfajores-forno.celo-testnet.org'));
        })

        it('should get listing', async () => {
            const r = new SmartContractReadMethodInvocation()
            r.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            r.methodName = 'getListing'
            r.methodABI = listing.abi.find(a => a.name === r.methodName)
            r.params = ['1']
            console.log(await sendCeloSmartContractReadMethodInvocationTransaction(true, r, 'https://alfajores-forno.celo-testnet.org'))
        })

        it('should get marketplace fee', async () => {
            const r = new SmartContractReadMethodInvocation()
            r.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            r.methodName = 'getMarketplaceFee'
            r.methodABI = listing.abi.find(a => a.name === r.methodName)
            r.params = []
            console.log(await sendCeloSmartContractReadMethodInvocationTransaction(true, r, 'https://alfajores-forno.celo-testnet.org'))
        })

        it('should buy listing native', async () => {
            const body = new InvokeMarketplaceListingOperation()
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            body.contractAddress = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
            body.listingId = '1'
            body.amount = '1.015'
            body.feeCurrency = Currency.CELO
            body.chain = Currency.CELO;
            console.log(await sendMarketplaceBuyListing(true, body, 'https://alfajores-forno.celo-testnet.org'));
        })

        it('should buy listing erc20', async () => {

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
            body.contractAddress = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.listingId = '2'
            body.amount = '1.015'
            body.feeCurrency = Currency.CELO
            body.chain = Currency.CELO
            body.fee = {gasPrice: '5', gasLimit: '300000'};
            console.log(await sendMarketplaceBuyListing(true, body, 'https://alfajores-forno.celo-testnet.org'));
        })
    })
})
