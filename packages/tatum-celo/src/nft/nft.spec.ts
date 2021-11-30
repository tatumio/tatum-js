import { Currency } from '@tatumio/tatum-core'
import { readFileSync } from 'fs'
import {
  CeloDeployErc721,
  deployNFT,
  mintMultipleNFTWithUri,
  CeloMintErc721,
  mintNFTWithUri,
  createNFT,
  CeloMintMultipleErc721,
  CeloBurnErc721,
  burnNFT,
  CeloTransferErc721,
  transferNFT,
} from '../'

describe('NFT tests', () => {
  jest.setTimeout(99999)
  describe('NFT CELO transactions', () => {
    it('should test valid deploy 721 transaction', async () => {
      const body = new CeloDeployErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.name = 'Tatum'
      body.symbol = 'TTM'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      const test = await deployNFT(true, body, 'https://alfajores-forno.celo-testnet.org')
      console.log(test)
      expect(test).toBeDefined()
    })
    it('should test celo 721 mint multiple transaction with cashback', async () => {
      const firstTokenId = new Date().getTime()
      const secondTokenId = firstTokenId + 1
      const mintedTokens = await mintMultipleNFTWithUri(true, {
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        chain: Currency.CELO,
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
        contractAddress: '0x69aBb0b2d0fEd5f1Be31b007689181CeE0ed909B',
        authorAddresses: [
          ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        ],
        cashbackValues: [
          ['0.25', '0.25'],
          ['0.25', '0.25'],
        ],
        feeCurrency: Currency.CUSD,
      })
      console.log(mintedTokens)
      expect(mintedTokens).not.toBeNull()
    })
    it('should test valid mint cashback 721 transaction', async () => {
      const body = new CeloMintErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      body.contractAddress = '0x28980D12Ce9E7Bf6C20f568Db998E9A4d8F13271'
      body.authorAddresses = ['0x7100f8FF8AF3F5e527141039A1ceE9D244f39862']
      body.cashbackValues = ['0.25']
      body.tokenId = '1'
      body.url = 'https://google.com'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      const test = await mintNFTWithUri(body, { testnet: true, provider: 'https://alfajores-forno.celo-testnet.org' })
      console.log('test results', test)
      expect(test).toBeDefined()
    })

    it('should test valid mint 721 transaction', async () => {
      const body = new CeloMintErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      body.tokenId = '33334'
      body.url = 'https://google.com'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      expect(
        await mintNFTWithUri(body, {
          testnet: true,
          provider: 'https://alfajores-forno.celo-testnet.org',
        })
      ).toBeDefined()
    })

    it('should test valid mint 721 transaction on IPFS', async () => {
      const body = new CeloMintErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      body.tokenId = `${Date.now()}`
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      console.log(
        await createNFT(
          true,
          body,
          readFileSync('/Users/ssramko/Downloads/logo_tatum.png'),
          'Tatum LOGO',
          'description',
          undefined,
          'https://alfajores-forno.celo-testnet.org'
        )
      )
    })

    it('should test valid mint multiple 721 transaction', async () => {
      const body = new CeloMintMultipleErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.to = ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea', '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea']
      body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e'
      body.tokenId = ['4', '5']
      body.url = ['https://google.com', 'https://google.com']
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      expect(await mintMultipleNFTWithUri(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined()
    })

    it('should test valid burn 721 transaction', async () => {
      const body = new CeloBurnErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.contractAddress = '0x3e1a302DA9345ae6f8188607C017d342A4CCf22e'
      body.tokenId = '3'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      expect(await burnNFT(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined()
    })

    it('should test valid transfer 721 transaction', async () => {
      const body = new CeloTransferErc721()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.to = '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9'
      body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      body.tokenId = '33334'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      expect(await transferNFT(true, body, 'https://alfajores-forno.celo-testnet.org')).toBeDefined()
    })
  })
})
