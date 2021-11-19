import { Currency } from '@tatumio/tatum-core'
import {
  burnMultiToken,
  burnMultiTokenBatch,
  deployMultiToken,
  mintMultiToken,
  mintMultiTokenBatch,
  transferMultiToken,
  transferMultiTokenBatch,
  sendAddMultiTokenMinter,
} from './index'

describe('NFT tests', () => {
  jest.setTimeout(99999)

  describe('NFT BSC 1155 transactions', () => {
    it('should test bsc 1155 deploy transaction', async () => {
      const deployMultiTokenToken = await deployMultiToken({
        chain: Currency.BSC,
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        uri: 'tatum',
      })
      expect(deployMultiTokenToken).not.toBeNull()
      console.log('response::', deployMultiTokenToken)
    })
    it('should test bsc 1155 mint transaction', async () => {
      const tokenId = '2'
      const mintedToken = await mintMultiToken({
        to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
        chain: Currency.BSC,
        tokenId,
        data: '0x1234',
        amount: '1000',
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
      })
      console.log(tokenId)
      expect(mintedToken).not.toBeNull()
    })
    it('should test bsc 1155 add minter transaction', async () => {
      const tx = await sendAddMultiTokenMinter({
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.BSC,
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      })
      console.log(tx)
      expect(tx).not.toBeNull()
      const mintedToken = await mintMultiToken({
        to: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
        chain: Currency.BSC,
        tokenId: `${Date.now()}`,
        data: '0x1234',
        amount: '1000',
        fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
        contractAddress: '0x2c77a428b01e6403f237b7417a7091a3a5179f14',
      })
      expect(mintedToken).not.toBeNull()
    })
    it('should test bsc 1155 mint batch transaction', async () => {
      const tokenId = [
        ['12101', '12102'],
        ['12101', '12102'],
      ]
      const mintedToken = await mintMultiTokenBatch({
        to: ['0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f', '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f'],
        chain: Currency.BSC,
        tokenId,
        data: '0x1234',
        amounts: [
          ['100', '100'],
          ['100', '100'],
        ],
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
      })
      console.log(mintedToken)
      expect(mintedToken).not.toBeNull()
    })
    it('should test bsc 1155 send batch transaction', async () => {
      const sendMultiTokenToken = await transferMultiTokenBatch({
        to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
        chain: Currency.BSC,
        tokenId: ['1', '2'],
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
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
    it('should test bsc 1155 burn transaction', async () => {
      const burnMultiTokenToken = await burnMultiToken({
        account: '0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f',
        tokenId: '2',
        amount: '1',
        chain: Currency.BSC,
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xe2a8d7c5b2b4acad7e5b9aec0998cdbbeed45e49',
      })
      console.log(burnMultiTokenToken)
      expect(burnMultiTokenToken).not.toBeNull()
    })
    it('should test bsc 1155 burn batch transaction', async () => {
      const burnMultiTokenToken = await burnMultiTokenBatch({
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
      const sendMultiTokenToken = await transferMultiToken({
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
})
