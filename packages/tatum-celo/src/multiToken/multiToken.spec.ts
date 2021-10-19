import { Currency } from '@tatumio/tatum-core';
import { CeloDeployMultiToken, deployMultiToken, mintMultiToken, CeloBurnMultiToken, burnMultiToken, mintMultiTokenBatch, CeloBurnMultiTokenBatch, burnMultiTokenBatch, transferMultiTokenBatch, transferMultiToken } from '../';

describe('NFT tests', () => {
    jest.setTimeout(99999);
    
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
                const body = new CeloBurnMultiToken()
                body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
            body.contractAddress = '0x8B98400E45288bDF05A39Ec791C09CBcd57c31F3'
            body.account = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
            body.tokenId = '2'
                body.feeCurrency = Currency.CUSD
                body.chain = Currency.CELO
                body.amount = '1'
                expect(await burnMultiToken(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined()
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
            body.chain = Currency.CELO
            body.amounts = ['1','1']

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
