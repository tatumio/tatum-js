import BigNumber from 'bignumber.js'
import * as process from 'process'
import { BlockIdentifier } from '../../../dto'
import { Network, TatumSDK, Tron } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getTronRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Tron>(e2eUtil.initConfig(testnet ? Network.TRON_SHASTA : Network.TRON, testnet ? process.env.V3_API_KEY_TESTNET : process.env.V4_API_KEY_MAINNET))

describe.skip('RPCs', () => {
  describe('TRON', () => {
    describe('testnet', () => {
      it('getNowBlock', async () => {
        const tatum = await getTronRpc(true)
        const result = await tatum.rpc.getNowBlock()
        expect(result.block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getChainParameters', async () => {
        const tatum = await getTronRpc(true)
        const result = await tatum.rpc.getChainParameters()
        expect(result.chainParameter.length).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getBlockByNum', async () => {
        const tatum = await getTronRpc(true)
        const result = await tatum.rpc.getBlock('1000000')
        expect(result.block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getBlockById', async () => {
        const tatum = await getTronRpc(true)
        const result = await tatum.rpc.getBlock(
          '00000000000f424013e51b18e0782a32fa079ddafdb2f4c343468cf8896dc887',
        )
        expect(result.block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getTransactionById', async () => {
        const tatum = await getTronRpc(true)
        const result = await tatum.rpc.getTransactionById(
          '7c2d4206c03a883dd9066d620335dc1be272a8dc733cfa3f6d10308faa37facc',
        )
        expect(result.txID).toBe('7c2d4206c03a883dd9066d620335dc1be272a8dc733cfa3f6d10308faa37facc')
        await tatum.destroy()
      })
    })
    describe('mainnet', () => {
      it('getNowBlock', async () => {
        const tatum = await getTronRpc(false)
        const result = await tatum.rpc.getNowBlock()
        expect(result.block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getChainParameters', async () => {
        const tatum = await getTronRpc(false)
        const result = await tatum.rpc.getChainParameters()
        expect(result.chainParameter.length).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getBlockByNum', async () => {
        const tatum = await getTronRpc(false)
        const result = await tatum.rpc.getBlock('51173114')
        expect(result.block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getBlockById', async () => {
        const tatum = await getTronRpc(false)
        const result = await tatum.rpc.getBlock(
          '00000000030cd6faf6c282df598285c51bd61e108f98e90ea8a0ef4bd0b2d9ec',
        )
        expect(result.block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getTransactionById', async () => {
        const tatum = await getTronRpc(false)
        const result = await tatum.rpc.getTransactionById(
          'eb49c1c052fb23a9b909a0f487602459112d1fb41276361752e9bc491e649598',
        )
        expect(result.txID).toBe('eb49c1c052fb23a9b909a0f487602459112d1fb41276361752e9bc491e649598')
        await tatum.destroy()
      })

      it('getBlockByLimitNext', async () => {
        const tatum = await getTronRpc(false)
        const result = await tatum.rpc.getBlockByLimitNext(1, 5)
        expect(result.block).toHaveLength(4)
        expect(result.block[0].block_header.raw_data.number).toBeGreaterThan(0)
        await tatum.destroy()
      })

      it('getAccountBalance', async () => {
        const address = 'TQuDQGdYmzuicmjkWrdpFWXKxpb9P17777'
        const blockHash = '0000000003153ce39bcd0a9832ab6783b629b43d656107bb26f18697095ec073'
        const blockNumber = new BigNumber(51723491)

        const tatum = await getTronRpc(false)
        const accountIdentifier = {
          address: address,
        }

        const blockIdentifier: BlockIdentifier = {
          hash: blockHash,
          number: blockNumber,
        }
        const res = await tatum.rpc.getAccountBalance(accountIdentifier, blockIdentifier, { visible: true })

        expect(res.error).toBeUndefined()
        expect(res).toStrictEqual({
          balance: 19220661330,
          block_identifier: {
            hash: '0000000003153ce39bcd0a9832ab6783b629b43d656107bb26f18697095ec073',
            number: 51723491,
          },
        })
        await tatum.destroy()
      })
    })
  })
})
