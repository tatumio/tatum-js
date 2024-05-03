import {tronBroadcast} from '../../blockchain';
import {listing} from '../../contracts/marketplace';
import {ApproveErc20, CreateMarketplaceListing, Currency, DeployMarketplaceListing, InvokeMarketplaceListingOperation, SmartContractReadMethodInvocation} from '../../model';
import {
    sendBscSmartContractMethodInvocationTransaction,
    sendBscSmartContractReadMethodInvocationTransaction,
    sendCeloSmartContractReadMethodInvocationTransaction,
    sendPolygonSmartContractMethodInvocationTransaction,
    sendPolygonSmartContractReadMethodInvocationTransaction
} from '../../transaction';
import {transferNFT} from '../nft';
import {
    deployMarketplaceListing,
    prepareMarketplaceBuyListing,
    prepareMarketplaceCreateListing,
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
            body.chain = Currency.BSC;
            console.log(await sendMarketplaceCreateListing(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545'));

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
            body.chain = Currency.BSC;
            console.log(await sendMarketplaceBuyListing(true, body, 'https://data-seed-prebsc-2-s1.binance.org:8545'));
        })

    })

    describe('Marketplace Listing MATIC transactions', () => {
        it('should deploy marketplace', async () => {
            const body = new DeployMarketplaceListing();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            body.marketplaceFee = 150;
            body.chain = Currency.MATIC;
            const test = await deployMarketplaceListing(true, body, 'https://rpc-amoy.matic.today');
            console.log(test);
            expect(test).toBeDefined();
        })

        it('should create listing native asset', async () => {
            const body = new CreateMarketplaceListing();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31';
            body.nftAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a';
            body.tokenId = '121';
            body.listingId = '111';
            body.isErc721 = true;
            body.price = '0.001';
            body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9';
            body.chain = Currency.MATIC;
            console.log(await sendMarketplaceCreateListing(true, body, 'https://rpc-amoy.matic.today'));

            await new Promise(r => setTimeout(r, 5000));
            console.log(await transferNFT(true, {
                to: '0xc4585ec777ba6dc5d33524ca72c425d512780c31',
                chain: Currency.MATIC,
                tokenId: '121',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a'
            }));
        })

        it('should get listing', async () => {
            const r = new SmartContractReadMethodInvocation();
            r.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31';
            r.methodName = 'getListing';
            r.methodABI = listing.abi.find(a => a.name === r.methodName);
            r.params = ['8'];
            console.log(await sendPolygonSmartContractMethodInvocationTransaction(true, r, 'https://rpc-amoy.matic.today'));
        })

        it('should get marketplace fee', async () => {
            const r = new SmartContractReadMethodInvocation();
            r.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31';
            r.methodName = 'getMarketplaceFee';
            r.methodABI = listing.abi.find(a => a.name === r.methodName);
            r.params = [];
            console.log(await sendPolygonSmartContractReadMethodInvocationTransaction(true, r, 'https://rpc-amoy.matic.today'));
        })

        it('should buy listing native', async () => {
            const body = new InvokeMarketplaceListingOperation();
            body.fromPrivateKey = '0x3497eb7fa0fadf23da006c31f874a5aaed7da58c1caf3d84fa3387e1208ada39';
            body.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31';
            body.listingId = '111';
            body.amount = '0.0015';
            body.chain = Currency.MATIC;
            console.log(await sendMarketplaceBuyListing(true, body, 'https://rpc-amoy.matic.today'));
        })

        it('should approve erc20', async () => {
            const approve = new ApproveErc20();
            approve.contractAddress = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb';
            approve.spender = '0x4153B909f55B0Ec43c11e980dF09b853477D9F79';
            approve.chain = Currency.MATIC;
            approve.amount = '0.002';
            approve.fromPrivateKey = '0xf09110a0aae3dddba3d722c6c629fb08082963d8ed38afaf25cfce084c22e3d2';
            console.log(await sendMarketplaceApproveErc20Spending(true, approve, 'https://rpc-amoy.matic.today'));
        });
    })
    describe.skip('Marketplace Listing TRON transactions', () => {
        it('should deploy marketplace', async () => {
            const test = await deployMarketplaceListing(true, {
                'feeRecipient': 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
                'marketplaceFee': 250,
                'chain': Currency.TRON,
                'fromPrivateKey': '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
                'feeLimit': 500
            });
            console.log(test);
            expect(test).toBeDefined();
        });

        it('should create listing native asset', async () => {
            const txData = await prepareMarketplaceCreateListing(true, {
                'contractAddress': 'TXseqo4U5yZZgVjjDzodA3par23pxevvtD',
                'nftAddress': 'TGXh2YJhfwchMGKuzfEJ27W1VEJRKnMdy9',
                'tokenId': '1',
                'listingId': '1',
                'isErc721': true,
                'price': '0.001',
                'seller': 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh',
                'chain': Currency.TRON,
                'fromPrivateKey': '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
                'feeLimit': 100
            });
            expect(txData).toContain('txID');
            console.log(await tronBroadcast(txData));
        });

        it('should buy listing native asset', async () => {
            const txData = await prepareMarketplaceBuyListing(true, {
                'contractAddress': 'TXseqo4U5yZZgVjjDzodA3par23pxevvtD',
                'listingId': '1',
                'amount': '0.002',
                'chain': Currency.TRON,
                'fromPrivateKey': '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701',
                'feeLimit': 100
            });
            expect(txData).toContain('txID');
            console.log(await tronBroadcast(txData));
        });
    });
})
