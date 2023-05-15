import {Network, TatumSDK} from "../service";
import {Tron} from "../dto";

const getTronRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Tron>({
    network: testnet ? Network.TRON_SHASTA : Network.TRON,
    verbose: true,
    retryCount: 1,
    retryDelay: 2000,
  })
describe('RPCs', () => {
  describe('TRON', () => {
    describe('testnet', () => {
      it('getNowBlock', async () => {
        const tatum = await getTronRpc(true)
        const res = await tatum.rpc.getNowBlock()
        expect(res.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getChainParameters', async () => {
        const tatum = await getTronRpc(true)
        const res = await tatum.rpc.getChainParameters()
        expect(res.chainParameter.length).toBeGreaterThan(0)
      })
      it('getBlockByNum', async () => {
        const tatum = await getTronRpc(true)
        const res = await tatum.rpc.getBlock("1000000")
        expect(res.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getBlockById', async () => {
        const tatum = await getTronRpc(true)
        const res = await tatum.rpc.getBlock("00000000000f424013e51b18e0782a32fa079ddafdb2f4c343468cf8896dc887")
        expect(res.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getTransactionById', async () => {
        const tatum = await getTronRpc(true)
        const res = await tatum.rpc.getTransactionById("7c2d4206c03a883dd9066d620335dc1be272a8dc733cfa3f6d10308faa37facc")
        expect(res.txID).toBe("7c2d4206c03a883dd9066d620335dc1be272a8dc733cfa3f6d10308faa37facc")
      })
    })
    describe('mainnet', () => {
      it('getNowBlock', async () => {
        const tatum = await getTronRpc(false)
        const res = await tatum.rpc.getNowBlock()
        expect(res.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getChainParameters', async () => {
        const tatum = await getTronRpc(false)
        const res = await tatum.rpc.getChainParameters()
        expect(res.chainParameter.length).toBeGreaterThan(0)
      })
      it('getBlockByNum', async () => {
        const tatum = await getTronRpc(false)
        const res = await tatum.rpc.getBlock("51173114")
        expect(res.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getBlockById', async () => {
        const tatum = await getTronRpc(false)
        const res = await tatum.rpc.getBlock("00000000030cd6faf6c282df598285c51bd61e108f98e90ea8a0ef4bd0b2d9ec")
        expect(res.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getTransactionById', async () => {
        const tatum = await getTronRpc(false)
        const res = await tatum.rpc.getTransactionById("eb49c1c052fb23a9b909a0f487602459112d1fb41276361752e9bc491e649598")
        expect(res.txID).toBe("eb49c1c052fb23a9b909a0f487602459112d1fb41276361752e9bc491e649598")
      })
    })
  })
})
