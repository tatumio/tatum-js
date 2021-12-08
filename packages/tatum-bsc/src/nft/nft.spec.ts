import { Currency, MintErc721 } from '@tatumio/tatum-core'
import { readFileSync } from 'fs'
import { deployNFT, mintMultipleNFTWithUri, mintNFTWithUri, createNFT, transferNFT } from '../'

describe('NFT tests', () => {
  jest.setTimeout(99999)
  describe('NFT BSC transactions', () => {
    it('should test eth 721 deploy transaction', async () => {
      const deployErc721Token = await deployNFT({
        symbol: 'TatumToken',
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        name: 'TatumToken',
        fee: { gasLimit: '6000000', gasPrice: '100' },
      })
      expect(deployErc721Token).not.toBeNull()
      console.log(deployErc721Token)
    })
    it('should test bep 721 mint multiple transaction with cashback', async () => {
      const firstTokenId = new Date().getTime()
      const secondTokenId = firstTokenId + 1
      const mintedTokens = await mintMultipleNFTWithUri({
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xf59d331098f721fd4f6d4651c27e32daae5c1fdd',
        authorAddresses: [
          ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        ],
        cashbackValues: [
          ['0.25', '0.25'],
          ['0.25', '0.25'],
        ],
        fee: { gasLimit: '6000000', gasPrice: '100' },
      })
      console.log(mintedTokens)
      expect(mintedTokens).not.toBeNull()
    })
    it('should test bep 721 mint transaction', async () => {
      try {
        const mintedToken = await mintNFTWithUri({
          to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
          tokenId: '1',
          url: 'test.com',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
          authorAddresses: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
          cashbackValues: ['0.25'],
        })
        console.log('mintedToken', mintedToken)
        expect(mintedToken).not.toBeNull()
      } catch (e) {
        console.log(e)
      }
    })
    it('should test valid mint 721 transaction on IPFS', async () => {
      const body: MintErc721 = {
        to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
        chain: Currency.BSC,
        tokenId: `${Date.now()}`,
        url: '',
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xC25f71fEaD66A160758265321e4c2Fb93b83BabF',
      }
      console.log(await createNFT(true, body, readFileSync('/Users/ssramko/Downloads/logo_tatum.png'), 'Tatum LOGO', 'description'))
    })
    it('should test BSC send transaction', async () => {
      const sendErc721Token = await transferNFT({
        to: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        tokenId: '1',
        fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
        contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
        value: '1',
      })
      console.log('response: ', sendErc721Token)
      expect(sendErc721Token).not.toBeNull()
    })
  })
})
