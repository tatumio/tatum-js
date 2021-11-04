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
  describe('NFT MultiToken transactions', () => {
    it('should test eth 1155 deploy transaction', async () => {
      const deployMultiTokenToken = await deployMultiToken({
        chain: Currency.ETH,
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        uri: 'tatum',
        fee: {
          gasLimit: '5000000',
          gasPrice: '150',
        },
      })
      expect(deployMultiTokenToken).not.toBeNull()
      console.log('response::', deployMultiTokenToken)
    })
    it('should test eth 1155 mint transaction', async () => {
      const tokenId = '1'
      const mintedToken = await mintMultiToken({
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
        },
      })
      console.log(tokenId)
      expect(mintedToken).not.toBeNull()
    })
    it('should test eth 1155 send batch transaction', async () => {
      const sendMultiTokenToken = await transferMultiTokenBatch({
        to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
        chain: Currency.ETH,
        tokenId: ['12101', '12102'],
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
        amounts: ['10', '10'],
        data: '0x1234',
        fee: {
          gasLimit: '7000000',
          gasPrice: '100',
        },
      })
      console.log('Result::', sendMultiTokenToken)
      expect(sendMultiTokenToken).not.toBeNull()
    })
    it('should test eth 1155 burn transaction', async () => {
      const burnMultiTokenToken = await burnMultiToken({
        account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
        tokenId: '12101',
        amount: '1',
        chain: Currency.ETH,
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
      })
      console.log(burnMultiTokenToken)
      expect(burnMultiTokenToken).not.toBeNull()
    })
    it('should test eth 1155 burn batch transaction', async () => {
      const burnMultiTokenToken = await burnMultiTokenBatch({
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
      const tokenId = [
        ['12101', '12102'],
        ['12101', '12102'],
      ]
      const mintedToken = await mintMultiTokenBatch({
        to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
        chain: Currency.ETH,
        tokenId,
        data: '0x1234',
        amounts: [
          ['100', '100'],
          ['100', '100'],
        ],
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xf659eb344f8226331a7c85778c4d02847e120d96',
        fee: {
          gasLimit: '5000000',
          gasPrice: '150',
        },
      })
      console.log(mintedToken)
      expect(mintedToken).not.toBeNull()
    })
    it('should test eth 1155 send transaction', async () => {
      const sendMultiTokenToken = await transferMultiToken({
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
})
