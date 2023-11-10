import process from 'process'
import { AlgorandAlgod, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getAlgorandAlgodRpc = async (testnet?: boolean) =>
  await TatumSDK.init<AlgorandAlgod>({
    network: testnet ? Network.ALGORAND_ALGOD_TESTNET : Network.ALGORAND_ALGOD,
    apiKey: {
      v4: testnet ? process.env.V4_API_KEY_TESTNET : process.env.V4_API_KEY_MAINNET,
    },
    verbose: e2eUtil.isVerbose,
  })

describe.each([false, true])('Algorand Algod', (testnet) => {
  describe(`${testnet ? 'Testnet' : 'Mainnet'}`, () => {
    let tatum: AlgorandAlgod

    beforeEach(async () => {
      tatum = await getAlgorandAlgodRpc(false)
    })

    afterEach(async () => {
      await tatum.destroy()
    })

    it('should correctly get ledger supply', async () => {
      const response = await tatum.rpc.getLedgerSupply()
      expect(response).toBeDefined()
    })

    it('should correctly get block hash', async () => {
      const response = await tatum.rpc.getBlockHash({ round: 10 })
      expect(response).toBeDefined()
    })

    it('should correctly get genesis', async () => {
      const response = await tatum.rpc.getGenesis()
      expect(response).toBeDefined()
    })

    it('should correctly check if node is healthy', async () => {
      await expect(tatum.rpc.isHealthy()).resolves.not.toThrow()
    })

    it('should correctly check if node is ready', async () => {
      await expect(tatum.rpc.isReady()).resolves.not.toThrow()
    })

    // TODO: once allowed remove skip
    it.skip('should correctly get tx params', async () => {
      const response = await tatum.rpc.getTransactionParams()
      expect(response).toBeDefined()
    })
  })
})
