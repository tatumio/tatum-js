import {CeloBurnMultiToken, CeloBurnMultiTokenBatch, CeloDeployMultiToken, Currency} from '../model';
import {
    burnMultiToken,
    burnMultiTokenBatch,
    deployMultiToken,
    mintMultiToken,
    mintMultiTokenBatch,
    sendAddMultiTokenMinter,
    transferMultiToken,
    transferMultiTokenBatch,
} from './index';

describe('NFT tests', () => {
    jest.setTimeout(99999);
    describe('NFT MultiToken transactions', () => {
        it('should test eth 1155 deploy transaction', async () => {
            const deployMultiTokenToken = await deployMultiToken(true, {
                chain: Currency.ETH,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                uri: 'tatum',
                fee: {
                    gasLimit: '5000000',
                    gasPrice: '150',
                }
            })
            expect(deployMultiTokenToken).not.toBeNull()
            console.log('response::', deployMultiTokenToken)
        })
        it('should test eth 1155 mint transaction', async () => {
            const tokenId = '1'
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.ETH,
                tokenId,
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
                fee: {
                    gasLimit: '5000000',
                    gasPrice: '150',
                }
            })
            console.log(tokenId)
            expect(mintedToken).not.toBeNull()
        })
        it('should test eth 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
                chain: Currency.ETH,
                tokenId: ['12101', '12102'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
                amounts: ['10', '10'],
                data: '0x1234',
                fee: {
                    gasLimit: '7000000',
                    gasPrice: '100'
                },
            })
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
        it('should test eth 1155 burn transaction', async () => {
            const burnMultiTokenToken = await burnMultiToken(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: '12101',
                amount: '1',
                chain: Currency.ETH,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96'
            })
            console.log(burnMultiTokenToken)
            expect(burnMultiTokenToken).not.toBeNull()
        })
        it('should test eth 1155 burn batch transaction', async () => {
            const burnMultiTokenToken = await burnMultiTokenBatch(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: ['1', '2'],
                amounts: ['1', '1'],
                chain: Currency.ETH,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',

            })
            expect(burnMultiTokenToken).not.toBeNull()
        })
        it('should test eth 1155 mint batch transaction', async () => {
            const tokenId = [['12101', '12102'], ['12101', '12102']];
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
                chain: Currency.ETH,
                tokenId,
                data: '0x1234',
                amounts: [['100', '100'], ['100', '100']],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
                fee: {
                    gasLimit: '5000000',
                    gasPrice: '150',
                }
            })
            console.log(mintedToken)
            expect(mintedToken).not.toBeNull()
        })
        it('should test eth 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.ETH,
                tokenId: '12101',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
                amount: '1',
                data: '0x1234',
            })
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
    })
    describe('NFT BSC 1155 transactions', () => {
        it('should test bsc 1155 deploy transaction', async () => {
            const deployMultiTokenToken = await deployMultiToken(true, {
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                uri: 'tatum',
            })
            expect(deployMultiTokenToken).not.toBeNull()
            console.log('response::', deployMultiTokenToken)
        })
        it('should test bsc 1155 mint transaction', async () => {
            const tokenId = '2'
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.BSC,
                tokenId,
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49'
            })
            console.log(tokenId);
            expect(mintedToken).not.toBeNull();
        })
        it('should test bsc 1155 add minter transaction', async () => {
            const tx = await sendAddMultiTokenMinter(true, {
                minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14'
            });
            console.log(tx);
            expect(tx).not.toBeNull();
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.BSC,
                tokenId: `${Date.now()}`,
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
                contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14'
            });
            expect(mintedToken).not.toBeNull();
        });
        it('should test bsc 1155 mint batch transaction', async () => {
            const tokenId = [['12101', '12102'], ['12101', '12102']];
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
                chain: Currency.BSC,
                tokenId,
                data: '0x1234',
                amounts: [['100', '100'], ['100', '100']],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49'
            });
            console.log(mintedToken)
            expect(mintedToken).not.toBeNull()
        })
        it('should test bsc 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
                chain: Currency.BSC,
                tokenId: ['1', '2'],
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
                amounts: ['10', '10'],
                data: '0x1234',
                fee: {
                    gasLimit: '7000000',
                    gasPrice: '100'
                },
            })
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
        it('should test bsc 1155 burn transaction', async () => {
            const burnMultiTokenToken = await burnMultiToken(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: '2',
                amount: '1',
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49'
            })
            console.log(burnMultiTokenToken)
            expect(burnMultiTokenToken).not.toBeNull()
        })
        it('should test bsc 1155 burn batch transaction', async () => {
            const burnMultiTokenToken = await burnMultiTokenBatch(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: ['12101', '12102'],
                amounts: ['1', '1'],
                chain: Currency.BSC,
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',

            })
            expect(burnMultiTokenToken).not.toBeNull()
        })

        it('should test bsc 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.BSC,
                tokenId: '12101',
                fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
                amount: '1',
                data: '0x1234',
            })
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
    })
    describe('NFT POLYGON 1155 transactions', () => {
        it('should test polygon 1155 deploy transaction', async () => {
            const deployMultiTokenToken = await deployMultiToken(true, {
                chain: Currency.MATIC,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                uri: 'tatum',
            }, 'https://rpc-amoy.matic.today')
            expect(deployMultiTokenToken).not.toBeNull()
            console.log('response::', deployMultiTokenToken)
        })
        it('should test polygon 1155 mint transaction', async () => {
            const tokenId = '2'
            const mintedToken = await mintMultiToken(true, {
                to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                chain: Currency.MATIC,
                tokenId,
                data: '0x1234',
                amount: '1000',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49'
            }, 'https://rpc-amoy.matic.today')
            console.log(tokenId)
            expect(mintedToken).not.toBeNull()
        })
        it('should test polygon 1155 mint batch transaction', async () => {
            const tokenId = [['12101', '12102'], ['12101', '12102']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
                chain: Currency.MATIC,
                tokenId,
                data: '0x1234',
                amounts: [['100', '100'], ['100', '100']],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49'
            }, 'https://rpc-amoy.matic.today')
            console.log(mintedToken)
            expect(mintedToken).not.toBeNull()
        })
        it('should test polygon 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
                chain: Currency.MATIC,
                tokenId: ['1', '2'],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
                amounts: ['10', '10'],
                data: '0x1234',
                fee: {
                    gasLimit: '7000000',
                    gasPrice: '100'
                },
            }, 'https://rpc-amoy.matic.today')
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
        it('should test polygon 1155 burn transaction', async () => {
            const burnMultiTokenToken = await burnMultiToken(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: '2',
                amount: '1',
                chain: Currency.MATIC,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49'
            }, 'https://rpc-amoy.matic.today')
            console.log(burnMultiTokenToken)
            expect(burnMultiTokenToken).not.toBeNull()
        })
        it('should test polygon 1155 burn batch transaction', async () => {
            const burnMultiTokenToken = await burnMultiTokenBatch(true, {
                account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
                tokenId: ['12101', '12102'],
                amounts: ['1', '1'],
                chain: Currency.MATIC,
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',

            }, 'https://rpc-amoy.matic.today')
            expect(burnMultiTokenToken).not.toBeNull()
        })

        it('should test polygon 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.MATIC,
                tokenId: '12101',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
                amount: '1',
                data: '0x1234',
            }, 'https://rpc-amoy.matic.today')
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
    })
    describe('NFT CELO 1155 transactions', () => {
        it('should test valid deploy 1155 transaction', async () => {
            const body = new CeloDeployMultiToken()
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.uri = 'Tatum'
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO
            const test = await deployMultiToken(true, body, 'https://alfajores-forno.celo-testnet.org')
            console.log(test)
            expect(test).toBeDefined()
        })
        it('should test celo 1155 mint transaction with', async () => {
            const mintedTokens = await mintMultiToken(true, {
                to: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
                chain: Currency.CELO,
                tokenId: '2',
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3',
                data: '0x1234',
                amount: '1000',
                feeCurrency: Currency.CUSD
            })
            console.log(mintedTokens)
            expect(mintedTokens).not.toBeNull()
        })
        it('should test valid burn 1155 transaction', async () => {
            const body = new CeloBurnMultiToken();
            body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236';
            body.contractAddress = '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3';
            body.account = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f';
            body.tokenId = '2';
            body.feeCurrency = Currency.CUSD;
            body.chain = Currency.CELO;
            body.amount = '1';
            expect(await burnMultiToken(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined();
        })
        it('should test CELO MultiToken mint batch transaction', async () => {
            const tokenId = [['1', '2'], ['3', '4']]
            const mintedToken = await mintMultiTokenBatch(true, {
                to: ['0x48d4bA7B2698A4b89635b9a2E391152350DB740f', '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
                chain: Currency.CELO,
                tokenId,
                data: '0x1234',
                amounts: [['100', '100'], ['100', '100']],
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3',
                feeCurrency: Currency.CUSD
            })
            console.log(mintedToken)
            expect(mintedToken).not.toBeNull()
        })
        it('should test valid burn batch 1155 transaction', async () => {
            const body = new CeloBurnMultiTokenBatch()
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            body.contractAddress = '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3'
            body.account = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
            body.tokenId = ['1', '2']
            body.feeCurrency = Currency.CUSD
            body.chain = Currency.CELO;
            body.amounts = ['1', '1'];

            expect(await burnMultiTokenBatch(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined()
        })
        it('should test celo 1155 send batch transaction', async () => {
            const sendMultiTokenToken = await transferMultiTokenBatch(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.CELO,
                tokenId: ['1', '2'],
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3',
                amounts: ['1', '1'],
                data: '0x1234',
                feeCurrency: Currency.CUSD
            })
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
        it('should test celo 1155 send transaction', async () => {
            const sendMultiTokenToken = await transferMultiToken(true, {
                to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
                chain: Currency.CELO,
                tokenId: '1',
                fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
                contractAddress: '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3',
                amount: '1',
                feeCurrency: Currency.CUSD,
                data: '0x1234',
            })
            console.log('Result::', sendMultiTokenToken)
            expect(sendMultiTokenToken).not.toBeNull()
        })
    })

})
