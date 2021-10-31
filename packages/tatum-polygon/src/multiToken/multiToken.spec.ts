import { Currency } from '@tatumio/tatum-core'
import {
  burnMultiToken,
  burnMultiTokenBatch,
  deployMultiToken,
  mintMultiToken,
  mintMultiTokenBatch,
  transferMultiToken,
  transferMultiTokenBatch,
} from './index'

describe('NFT tests', () => {
  jest.setTimeout(99999)

  describe('NFT POLYGON 1155 transactions', () => {
    it('should test polygon 1155 deploy transaction', async () => {
      const deployMultiTokenToken = await deployMultiToken(
        true,
        {
          chain: Currency.MATIC,
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          uri: 'tatum',
        },
        'https://rpc-mumbai.matic.today'
      )
      expect(deployMultiTokenToken).not.toBeNull()
      console.log('response::', deployMultiTokenToken)
    })
    it('should test polygon 1155 mint transaction', async () => {
      const tokenId = '2'
      const mintedToken = await mintMultiToken(
        true,
        {
          to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
          chain: Currency.MATIC,
          tokenId,
          data: '0x1234',
          amount: '1000',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
        },
        'https://rpc-mumbai.matic.today'
      )
      console.log(tokenId)
      expect(mintedToken).not.toBeNull()
    })
    it('should test polygon 1155 mint batch transaction', async () => {
      const tokenId = [
        ['12101', '12102'],
        ['12101', '12102'],
      ]
      const mintedToken = await mintMultiTokenBatch(
        true,
        {
          to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
          chain: Currency.MATIC,
          tokenId,
          data: '0x1234',
          amounts: [
            ['100', '100'],
            ['100', '100'],
          ],
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
        },
        'https://rpc-mumbai.matic.today'
      )
      console.log(mintedToken)
      expect(mintedToken).not.toBeNull()
    })
    it('should test polygon 1155 send batch transaction', async () => {
      const sendMultiTokenToken = await transferMultiTokenBatch(
        true,
        {
          to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
          chain: Currency.MATIC,
          tokenId: ['1', '2'],
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
          amounts: ['10', '10'],
          data: '0x1234',
          fee: {
            gasLimit: '7000000',
            gasPrice: '100',
          },
        },
        'https://rpc-mumbai.matic.today'
      )
      console.log('Result::', sendMultiTokenToken)
      expect(sendMultiTokenToken).not.toBeNull()
    })
    it('should test polygon 1155 burn transaction', async () => {
      const burnMultiTokenToken = await burnMultiToken(
        true,
        {
          account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
          tokenId: '2',
          amount: '1',
          chain: Currency.MATIC,
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
        },
        'https://rpc-mumbai.matic.today'
      )
      console.log(burnMultiTokenToken)
      expect(burnMultiTokenToken).not.toBeNull()
    })
    it('should test polygon 1155 burn batch transaction', async () => {
      const burnMultiTokenToken = await burnMultiTokenBatch(
        true,
        {
          account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
          tokenId: ['12101', '12102'],
          amounts: ['1', '1'],
          chain: Currency.MATIC,
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
        },
        'https://rpc-mumbai.matic.today'
      )
      expect(burnMultiTokenToken).not.toBeNull()
    })

    it('should test polygon 1155 send transaction', async () => {
      const sendMultiTokenToken = await transferMultiToken(
        true,
        {
          to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
          chain: Currency.MATIC,
          tokenId: '12101',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
          amount: '1',
          data: '0x1234',
        },
        'https://rpc-mumbai.matic.today'
      )
      console.log('Result::', sendMultiTokenToken)
      expect(sendMultiTokenToken).not.toBeNull()
    })
  })
})
