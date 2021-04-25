import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    Currency,
    Fee
} from '../model';
import {burnNFT, deployNFT, mintMultipleNFTWithUri, mintNFTWithUri, transferNFT} from './index';
describe('NFT tests', () => {
    jest.setTimeout(19999);
    describe('NFT CELO transactions', () => {
        // ERC-721
        it('should test valid deploy 721 transaction', async () => {
            const body = new CeloDeployErc721();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.name = 'Tatum';
            body.symbol = 'TTM';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await deployNFT(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });

        it('should test valid mint 721 transaction', async () => {
            const body = new CeloMintErc721();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
            body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e';
            body.tokenId = '3';
            body.url = 'https://google.com';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await mintNFTWithUri(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });

        it('should test valid mint multiple 721 transaction', async () => {
            const body = new CeloMintMultipleErc721();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.to = ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea', '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'];
            body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e';
            body.tokenId = ['4', '5'];
            body.url = ['https://google.com', 'https://google.com'];
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await mintMultipleNFTWithUri(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });

        it('should test valid burn 721 transaction', async () => {
            const body = new CeloBurnErc721();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e';
            body.tokenId = '3';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await burnNFT(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });

        it('should test valid transfer 721 transaction', async () => {
            const body = new CeloTransferErc721();
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
            body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e';
            body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a';
            body.tokenId = '5';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await transferNFT(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });
    });

    describe('NFT ETH transactions', () => {

        it('should test eth 721 deploy transaction', async () => {
            const deployErc721Token = await deployNFT(true, {
                symbol: 'TatumToken',
                chain: Currency.ETH,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                name: 'TatumToken',
                fee: { gasLimit: '6000000', gasPrice: '100' }
            });
            expect(deployErc721Token).not.toBeNull();
            console.log('response::',deployErc721Token);
        });

        it('should test eth 721 mint transaction', async () => {
            const tokenId = new Date().getTime().toString();
            const mintedToken = await mintNFTWithUri(true, {
                to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
                chain: Currency.ETH,
                tokenId,
                url: 'https://www.seznam.cz',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0x2d8deac4918e51b2a5361560042465ecd38740c4',
                fee: {
                    gasLimit: '600000',
                    gasPrice: '100'
                }
            });
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 721 mint transaction with cashback', async () => {
            const tokenId = new Date().getTime().toString();
            const mintedToken = await mintNFTWithUri(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId:'1',
                url: 'test.com',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xee024650b583c69d50d5e917a712a1198127753f',
                authorAddresses:['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                cashbackValues:['0.25']
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 721 mint multiple transaction', async () => {
            const firstTokenId = new Date().getTime();
            const secondTokenId = firstTokenId + 1;
            const mintedTokens = await mintMultipleNFTWithUri(true, {
                to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                chain: Currency.ETH,
                tokenId: [firstTokenId.toString(), secondTokenId.toString()],
                url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xab12c6c926cc3c9547aad71d6082fa724152a442',
                fee: {
                    gasLimit: '500000',
                    gasPrice: '100'
                }
            });
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
        });

        it('should test eth 721 burn transaction', async () => {
            const burnErc721Token = await burnNFT(true, {
                tokenId: '1615884747446',
                chain: Currency.ETH,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xab12c6c926cc3c9547aad71d6082fa724152a442',
                fee: {
                    gasLimit: '5000000',
                    gasPrice: '1100'
                },
            });
            expect(burnErc721Token).not.toBeNull();
        });

        it('should test eth 721 send transaction', async () => {
            const sendErc721Token = await transferNFT(true, {
                to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
                chain: Currency.ETH,
                tokenId: '1',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xee024650b583c69d50d5e917a712a1198127753f',
                value:'1'
            });
            expect(sendErc721Token).not.toBeNull();
        });
        it('should test eth 721 send transaction', async () => {
            const sendErc721Token = await transferNFT(true, {
                to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                chain: Currency.ETH,
                tokenId: '1615884907854',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xab12c6c926cc3c9547aad71d6082fa724152a442',
                fee: {
                    gasLimit: '5000000',
                    gasPrice: '100'
                },
                value:'1'
            });
            expect(sendErc721Token).not.toBeNull();
        });
    });
});
