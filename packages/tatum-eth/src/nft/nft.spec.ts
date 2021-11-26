import { Currency } from '@tatumio/tatum-core'
import { burnNFT, deployNFT, mintMultipleNFTWithUri, mintNFTWithUri, transferNFT } from './nft'

describe('NFT tests', () => {
  jest.setTimeout(99999)
  describe('NFT ETH transactions', () => {
    it('should test eth 721 deploy transaction', async () => {
      const deployErc721Token = await deployNFT({
        symbol: 'TatumToken',
        chain: Currency.ETH,
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        name: 'TatumToken',
        fee: { gasLimit: '6000000', gasPrice: '100' },
      })
      expect(deployErc721Token).not.toBeNull()
      console.log('response::', deployErc721Token)
    })

    it('should test eth 721 mint transaction', async () => {
      const tokenId = new Date().getTime().toString()
      const mintedToken = await mintNFTWithUri({
        to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        chain: Currency.ETH,
        tokenId,
        url: 'https://www.seznam.cz',
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xE4966098662cF4c8e9BB63D643336b163cB9FFE1',
      })
      console.log(tokenId)
      expect(mintedToken).not.toBeNull()
    })

    it('should test eth 721 mint transaction with cashback', async () => {
      const tokenId = new Date().getTime().toString()
      const mintedToken = await mintNFTWithUri({
        to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
        chain: Currency.ETH,
        tokenId,
        url: 'test.com',
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xE4966098662cF4c8e9BB63D643336b163cB9FFE1',
        authorAddresses: ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342'],
        cashbackValues: ['0.25'],
      })
      console.log(mintedToken)
      expect(mintedToken).not.toBeNull()
    })

    it('should test eth 721 mint multiple transaction with cashback', async () => {
      const firstTokenId = new Date().getTime()
      const secondTokenId = firstTokenId + 1
      const mintedTokens = await mintMultipleNFTWithUri({
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        chain: Currency.ETH,
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0x17683adfe031d13caca13fc234f222fa3837d4aa',
        authorAddresses: [
          ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          ['0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        ],
        cashbackValues: [
          ['0.25', '0.25'],
          ['0.25', '0.25'],
        ],
      })
      console.log(mintedTokens)
      expect(mintedTokens).not.toBeNull()
    })
    it('should test eth 721 mint multiple transaction', async () => {
      const firstTokenId = new Date().getTime()
      const secondTokenId = firstTokenId + 1
      const mintedTokens = await mintMultipleNFTWithUri({
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        chain: Currency.ETH,
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xab12c6c926cc3c9547aad71d6082fa724152a442',
        fee: {
          gasLimit: '500000',
          gasPrice: '100',
        },
      })
      console.log(mintedTokens)
      expect(mintedTokens).not.toBeNull()
    })

    it('should test eth 721 burn transaction', async () => {
      const burnErc721Token = await burnNFT({
        tokenId: '1615884747446',
        chain: Currency.ETH,
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xab12c6c926cc3c9547aad71d6082fa724152a442',
        fee: {
          gasLimit: '5000000',
          gasPrice: '1100',
        },
      })
      expect(burnErc721Token).not.toBeNull()
    })

    it('should test eth 721 send transaction', async () => {
      const sendErc721Token = await transferNFT({
        to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
        chain: Currency.ETH,
        tokenId: '2',
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xE4966098662cF4c8e9BB63D643336b163cB9FFE1',
        value: '1',
      })
      expect(sendErc721Token).not.toBeNull()
    })

    it('should test eth 721 send transaction', async () => {
      const sendErc721Token = await transferNFT({
        to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
        chain: Currency.ETH,
        tokenId: '1615884907854',
        fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
        contractAddress: '0xab12c6c926cc3c9547aad71d6082fa724152a442',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
        value: '1',
      })
      expect(sendErc721Token).not.toBeNull()
    })
  })
})
