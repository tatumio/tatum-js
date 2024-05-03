import {readFileSync} from 'fs';
import {CeloBurnErc721, CeloDeployErc721, CeloMintErc721, CeloMintMultipleErc721, CeloTransferErc721, Currency, MintErc721,} from '../model';
import {sendCeloMintErc721Transaction} from '../transaction';
import {burnNFT, createNFT, deployNFT, getNFTImage, mintMultipleNFTWithUri, mintNFTWithUri, sendAddNFTMinter, transferNFT} from './nft';

describe('NFT tests', () => {
    jest.setTimeout(99999);
    describe('NFT CELO transactions', () => {
        it('should test valid deploy 721 transaction', async () => {
            const body = new CeloDeployErc721();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.name = 'Tatum';
            body.symbol = 'TTM';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            const test = await deployNFT(true, body, 'https://alfajores-forno.celo-testnet.org');
            console.log(test);
            expect(test).toBeDefined();
        });
        it('should test celo 721 mint multiple transaction with cashback', async () => {
            const firstTokenId = new Date().getTime();
            const secondTokenId = firstTokenId + 1;
            const mintedTokens = await mintMultipleNFTWithUri(true, {
                to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                chain: Currency.CELO,
                tokenId: [firstTokenId.toString(), secondTokenId.toString()],
                url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
                fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
                contractAddress: '0x69aBb0b2d0fEd5f1Be31b007689181CeE0ed909B',
                authorAddresses: [['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'], ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9']],
                cashbackValues: [['0.25', '0.25'], ['0.25', '0.25']],
                fee: {gasLimit: '6000000', gasPrice: '100'},
                feeCurrency: Currency.CUSD
            });
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
        });
        it('should test valid mint cashback 721 transaction', async () => {
            const body = new CeloMintErc721();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.contractAddress = '0x28980D12Ce9E7Bf6C20f568Db998E9A4d8F13271';
            body.authorAddresses = ['0x7100f8FF8AF3F5e527141039A1ceE9D244f39862'];
            body.cashbackValues = ['0.25'];
            body.tokenId = '1';
            body.url = 'https://google.com';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            const test = await mintNFTWithUri(true, body, 'https://alfajores-forno.celo-testnet.org');
            console.log('test results', test);
            expect(test).toBeDefined();
        });

        it('should test valid mint 721 transaction', async () => {
            const body = new CeloMintErc721();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.tokenId = '33334';
            body.url = 'https://google.com';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await mintNFTWithUri(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });

        it('should test valid mint 721 transaction on IPFS', async () => {
            const body = new CeloMintErc721();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.tokenId = `${Date.now()}`;
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            console.log(await createNFT(true, body, readFileSync('/Users/ssramko/Downloads/logo_tatum.png'),
                'Tatum LOGO', 'description', undefined, 'https://alfajores-forno.celo-testnet.org'));
        });

        it('should test valid mint multiple 721 transaction', async () => {
            const body = new CeloMintMultipleErc721();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
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
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e';
            body.tokenId = '3';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            expect(await burnNFT(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        });

        it('should test valid transfer 721 transaction', async () => {
            const body = new CeloTransferErc721();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.to = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9';
            body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD';
            body.tokenId = '33334';
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
                fee: {gasLimit: '6000000', gasPrice: '100'}
            });
            expect(deployErc721Token).not.toBeNull();
            console.log('response::', deployErc721Token);
        });

        it('should test eth 721 mint transaction', async () => {
            const tokenId = new Date().getTime().toString();
            const mintedToken = await mintNFTWithUri(true, {
                to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
                chain: Currency.ETH,
                tokenId,
                url: 'https://www.seznam.cz',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xE4966098662cF4c8e9BB63D643336b163cB9FFE1'
            });
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 721 mint transaction with cashback', async () => {
            const tokenId = new Date().getTime().toString();
            const mintedToken = await mintNFTWithUri(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId,
                url: 'test.com',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xE4966098662cF4c8e9BB63D643336b163cB9FFE1',
                authorAddresses: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                cashbackValues: ['0.25']
            });
            console.log(mintedToken);
            expect(mintedToken).not.toBeNull();
        });
        it('should test eth 721 mint multiple transaction with cashback', async () => {
            const firstTokenId = new Date().getTime();
            const secondTokenId = firstTokenId + 1;
            const mintedTokens = await mintMultipleNFTWithUri(true, {
                to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                chain: Currency.ETH,
                tokenId: [firstTokenId.toString(), secondTokenId.toString()],
                url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0x17683adfe031d13caca13fc234f222fa3837d4aa',
                authorAddresses: [['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'], ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9']],
                cashbackValues: [['0.25', '0.25'], ['0.25', '0.25']]
            });
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
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
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId: '2',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xE4966098662cF4c8e9BB63D643336b163cB9FFE1',
                value: '1'
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
                value: '1'
            });
            expect(sendErc721Token).not.toBeNull();
        });
    });
    describe('NFT BSC transactions', () => {

        it('should test eth 721 deploy transaction', async () => {
            const deployErc721Token = await deployNFT(true, {
                symbol: 'TatumToken',
                chain: Currency.BSC,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                name: 'TatumToken',
                fee: {gasLimit: '6000000', gasPrice: '100'}
            });
            expect(deployErc721Token).not.toBeNull();
            console.log(deployErc721Token);
        });
        it('should test bep 721 mint multiple transaction with cashback', async () => {
            const firstTokenId = new Date().getTime();
            const secondTokenId = firstTokenId + 1;
            const mintedTokens = await mintMultipleNFTWithUri(true, {
                to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                chain: Currency.BSC,
                tokenId: [firstTokenId.toString(), secondTokenId.toString()],
                url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xf59d331098f721fd4f6d4651c27e32daae5c1fdd',
                authorAddresses: [['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'], ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9']],
                cashbackValues: [['0.25', '0.25'], ['0.25', '0.25']],
                fee: {gasLimit: '6000000', gasPrice: '100'}
            });
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
        });
        it('should test bep 721 mint transaction', async () => {
            try {
                const mintedToken = await mintNFTWithUri(true, {
                    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                    chain: Currency.BSC,
                    tokenId: '1',
                    url: 'test.com',
                    fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                    contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                    authorAddresses: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                    cashbackValues: ['0.25']
                });
                console.log('mintedToken', mintedToken);
                expect(mintedToken).not.toBeNull();
            } catch (e) {
                console.log(e);
            }
        });
        it('should test valid mint 721 transaction on IPFS', async () => {
            const body: MintErc721 = {
                to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                chain: Currency.BSC,
                tokenId: `${Date.now()}`,
                url: '',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xC25f71fEaD66A160758265321e4c2Fb93b83BabF',
            };
            console.log(await createNFT(true, body, readFileSync('/Users/ssramko/Downloads/logo_tatum.png'),
                'Tatum LOGO', 'description'));
        });
        it('should test BSC send transaction', async () => {
            const sendErc721Token = await transferNFT(true, {
                to: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.BSC,
                tokenId: '1',
                fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
                contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                value: '1'
            });
            console.log('response: ', sendErc721Token);
            expect(sendErc721Token).not.toBeNull();
        });
    });
    describe('NFT POLYGON transactions', () => {

        it('should test MATIC 721 deploy transaction', async () => {
            const deployErc721Token = await deployNFT(true, {
                symbol: 'TatumToken',
                chain: Currency.MATIC,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                name: 'TatumToken',
                fee: {gasLimit: '6000000', gasPrice: '5'}
            }, 'https://rpc-amoy.matic.today');
            expect(deployErc721Token).not.toBeNull();
            console.log(deployErc721Token);
        });
        it('should test MATIC 721 mint multiple transaction with cashback', async () => {
            const firstTokenId = new Date().getTime();
            const secondTokenId = firstTokenId + 1;
            const mintedTokens = await mintMultipleNFTWithUri(true, {
                to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                chain: Currency.MATIC,
                tokenId: [firstTokenId.toString(), secondTokenId.toString()],
                url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xf59d331098f721fd4f6d4651c27e32daae5c1fdd',
                authorAddresses: [['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'], ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9']],
                cashbackValues: [['0.25', '0.25'], ['0.25', '0.25']],
                fee: {gasLimit: '6000000', gasPrice: '100'}
            }, 'https://rpc-amoy.matic.today');
            console.log(mintedTokens);
            expect(mintedTokens).not.toBeNull();
        });
        it('should test valid mint 721 transaction on IPFS', async () => {
            const body: MintErc721 = {
                to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                chain: Currency.MATIC,
                tokenId: `${Date.now()}`,
                url: '',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xdb778b39bd7a7c479b3bb1d70df6665fe73e7e1d',
            };
            console.log(await createNFT(true, body, readFileSync('/Users/ssramko/Downloads/logo_tatum.png'),
                'Tatum LOGO', 'description', undefined, 'https://rpc-amoy.matic.today'));
        });
        it('should obtain metadata from NFT on IPFS on MATIC', async () => {
            const data = await getNFTImage(Currency.MATIC, '0x6d8eae641416b8b79e0fb3a92b17448cfff02b11', '1629193549967');
            expect(data.publicUrl).toBe('https://gateway.pinata.cloud/ipfs/Qmaiu5NAXe2gwH734hWhvyharurBjoxi8Kv37sGp1ZhRpf');
            expect(data.originalUrl).toBe('ipfs://Qmaiu5NAXe2gwH734hWhvyharurBjoxi8Kv37sGp1ZhRpf');
        });
        it('should obtain metadata from NFT on IPFS on FLOW', async () => {
            const data = await getNFTImage(Currency.FLOW, '2d103773-50e2-4a37-ac3d-61bc6af8faee', '145', '0x10247089e55180c9');
            expect(data.publicUrl).toBe('https://gateway.pinata.cloud/ipfs/Qmaiu5NAXe2gwH734hWhvyharurBjoxi8Kv37sGp1ZhRpf');
            expect(data.originalUrl).toBe('ipfs://Qmaiu5NAXe2gwH734hWhvyharurBjoxi8Kv37sGp1ZhRpf');
        });
        it('should test MATIC 721 mint transaction', async () => {
            try {
                const mintedToken = await mintNFTWithUri(true, {
                    to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                    chain: Currency.MATIC,
                    tokenId: '1',
                    url: 'test.com',
                    fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                    contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                    authorAddresses: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                    cashbackValues: ['0.25']
                }, 'https://rpc-amoy.matic.today');
                console.log('mintedToken', mintedToken);
                expect(mintedToken).not.toBeNull();
            } catch (e) {
                console.log(e);
            }
        });
        it('should test MATIC send transaction', async () => {
            const sendErc721Token = await transferNFT(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.MATIC,
                tokenId: '1',
                fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
                contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                value: '1'
            }, 'https://rpc-amoy.matic.today');
            console.log('response: ', sendErc721Token);
            expect(sendErc721Token).not.toBeNull();
        });


    });

    describe('NFT built in private key transactions', () => {
        it('should test CELO send mint transaction with built in key', async () => {
            const sendErc721Token = await sendCeloMintErc721Transaction(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.CELO,
                url: 'https://url'
            });
            console.log('response: ', sendErc721Token);
            expect(sendErc721Token).not.toBeNull();
        });

        it('should test CELO send mint transaction with key', async () => {
            const sendErc721Token = await sendCeloMintErc721Transaction(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.CELO,
                url: 'https://url',
                fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
                tokenId: '1',
                contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                feeCurrency: Currency.CELO,
            });
            console.log('response: ', sendErc721Token);
            expect(sendErc721Token).not.toBeNull();
        });

        it('should test CELO send add minter transaction', async () => {
            const sendErc721Token = await sendAddNFTMinter(true, {
                minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
                chain: Currency.CELO,
                fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
                contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
                feeCurrency: Currency.CELO,
            });
            console.log('response: ', sendErc721Token);
            expect(sendErc721Token).not.toBeNull();
        });
    })
});
