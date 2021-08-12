import {CeloProvider} from '@celo-tools/celo-ethers-wrapper'
import {bscBroadcast} from '../../blockchain'
import * as listing from '../../contracts/marketplace'
import {
    ApproveMarketplaceErc20Spending,
    CreateMarketplaceListing,
    Currency,
    DeployMarketplaceListing,
    InvokeMarketplaceListingOperation,
    SmartContractReadMethodInvocation
} from '../../model'
import {
    sendBscSmartContractMethodInvocationTransaction,
    sendBscSmartContractReadMethodInvocationTransaction,
    sendCeloSmartContractReadMethodInvocationTransaction
} from '../../transaction'
import {transferNFT} from '../nft'
import {deployMarketplaceListing, prepareMarketplaceApproveErc20Spending, prepareMarketplaceBuyListing, prepareMarketplaceCreateListing} from './listing'

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
            body.chain = Currency.CELO
            const txData = await prepareMarketplaceCreateListing(true, body, 'https://alfajores-forno.celo-testnet.org')
            expect(txData).toContain('0x')
            const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
            await provider.ready
            console.log(await provider.sendTransaction(txData))
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
            body.chain = Currency.CELO
            const txData = await prepareMarketplaceCreateListing(true, body, 'https://alfajores-forno.celo-testnet.org')
            expect(txData).toContain('0x')
            const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
            await provider.ready
            console.log(await provider.sendTransaction(txData))
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
            body.chain = Currency.CELO
            const txData = await prepareMarketplaceBuyListing(true, body, 'https://alfajores-forno.celo-testnet.org')
            expect(txData).toContain('0x')
            const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
            await provider.ready
            console.log(await provider.sendTransaction(txData))
        })

        it('should buy listing erc20', async () => {

            const approve = new ApproveMarketplaceErc20Spending()
            approve.contractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
            approve.marketplaceAddress = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            approve.chain = Currency.CELO
            approve.feeCurrency = Currency.CELO
            approve.amount = '1.015'
            approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            approve.fee = {gasPrice: '5', gasLimit: '300000'}
            const tx = await prepareMarketplaceApproveErc20Spending(true, approve, 'https://alfajores-forno.celo-testnet.org')
            expect(tx).toContain('0x')
            const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
            await provider.ready
            console.log(await provider.sendTransaction(tx))

            const body = new InvokeMarketplaceListingOperation()
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            body.contractAddress = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.listingId = '2'
            body.amount = '1.015'
            body.feeCurrency = Currency.CELO
            body.chain = Currency.CELO
            body.fee = {gasPrice: '5', gasLimit: '300000'}
            const txData = await prepareMarketplaceBuyListing(true, body, 'https://alfajores-forno.celo-testnet.org')
            expect(txData).toContain('0x')
            console.log(await provider.sendTransaction(txData))
        })
    })

    describe('Marketplace Listing BSC transactions', () => {
        it('should deploy marketplace', async () => {
            const body = new DeployMarketplaceListing()
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
            body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
            body.marketplaceFee = 150
            body.chain = Currency.BSC
            const test = await deployMarketplaceListing(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
            console.log(test)
            expect(test).toBeDefined()
        })

        it('should create listing native asset', async () => {
            const body = new CreateMarketplaceListing()
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
            body.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
            body.nftAddress = '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698'
            body.tokenId = '2'
            body.listingId = '8'
            body.isErc721 = true
            body.price = '1'
            body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
            body.chain = Currency.BSC
            const txData = await prepareMarketplaceCreateListing(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
            expect(txData).toContain('0x')
            console.log(await bscBroadcast(txData))

            await new Promise(r => setTimeout(r, 10000))
            console.log(await transferNFT(true, {
                to: '0xc4585ec777bA6dc5d33524Ca72c425D512780C31',
                chain: Currency.BSC,
                tokenId: '2',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698'
            }))
        })

        it('should get listing', async () => {
            const r = new SmartContractReadMethodInvocation()
            r.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
            r.methodName = 'getListing'
            r.methodABI = listing.abi.find(a => a.name === r.methodName)
            r.params = ['6']
            console.log(await sendBscSmartContractMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
        })

        it('should get marketplace fee', async () => {
            const r = new SmartContractReadMethodInvocation()
            r.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
            r.methodName = 'getMarketplaceFee'
            r.methodABI = listing.abi.find(a => a.name === r.methodName)
            r.params = []
            console.log(await sendBscSmartContractReadMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
        })

        it('should buy listing native', async () => {
            const body = new InvokeMarketplaceListingOperation()
            body.fromPrivateKey = '0x3497eb7fa0fadf23da006c31f874a5aaed7da58c1caf3d84fa3387e1208ada39'
            body.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
            body.listingId = '8'
            body.amount = '1.015'
            body.chain = Currency.BSC
            const txData = await prepareMarketplaceBuyListing(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
            expect(txData).toContain('0x')
            console.log(await bscBroadcast(txData))
        })

    })
})
