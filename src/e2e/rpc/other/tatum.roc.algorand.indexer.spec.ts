import process from 'process'
import { AlgorandIndexer, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getAlgorandIndexerRpc = async (testnet?: boolean) =>
  await TatumSDK.init<AlgorandIndexer>({
    network: testnet ? Network.ALGORAND_INDEXER_TESTNET : Network.ALGORAND_INDEXER,
    apiKey: {
      v4: testnet ? process.env.V4_API_KEY_TESTNET : process.env.V4_API_KEY_MAINNET,
    },
    verbose: e2eUtil.isVerbose,
  })

describe.each([false, true])('Algorand Indexer', (testnet) => {
  describe(`${testnet ? 'Testnet' : 'Mainnet'}`, () => {
    let indexer: AlgorandIndexer

    beforeEach(async () => {
      indexer = await getAlgorandIndexerRpc(false)
    })

    afterEach(async () => {
      await indexer.destroy()
    })

    it('should correctly get health status', async () => {
      const health = await indexer.rpc.getHealth()
      expect(health).toBeDefined()
      expect(health.data).toBeDefined()
    })

    it('should correctly get accounts', async () => {
      const accountRequest = {
        limit: 10,
      }
      const accountsResponse = await indexer.rpc.getAccounts(accountRequest)
      expect(accountsResponse).toBeDefined()
    })

    it('should correctly get account by address', async () => {
      const accountRequest = {
        limit: 1,
      }
      const accountsResponse = (await indexer.rpc.getAccounts(accountRequest)) as any
      const account = accountsResponse.accounts[0]

      const accountResponse = await indexer.rpc.getAccount({ accountId: account.address })
      expect(accountResponse).toBeDefined()
    })

    it('should correctly get assets', async () => {
      const assetsRequest = {
        limit: 10,
      }
      const assetsResponse = await indexer.rpc.getAssets(assetsRequest)
      expect(assetsResponse).toBeDefined()
    })

    it('should correctly get asset by id', async () => {
      const assetsRequest = {
        limit: 10,
      }
      const assetsResponse = (await indexer.rpc.getAssets(assetsRequest)) as any
      const asset = assetsResponse.assets[0]

      const assetResponse = await indexer.rpc.getAsset({ assetId: asset.index })
      expect(assetResponse).toBeDefined()
    })

    it('should correctly get asset balances', async () => {
      const assetsRequest = {
        limit: 10,
      }
      const assetsResponse = (await indexer.rpc.getAssets(assetsRequest)) as any
      const asset = assetsResponse.assets[0]

      const assetBalancesResponse = await indexer.rpc.getAssetBalances({ assetId: asset.index, limit: 2 })
      expect(assetBalancesResponse).toBeDefined()
    })

    it('should correctly get asset transactions', async () => {
      const assetsRequest = {
        limit: 10,
      }
      const assetsResponse = (await indexer.rpc.getAssets(assetsRequest)) as any
      const asset = assetsResponse.assets[0]

      const assetTransactionsResponse = await indexer.rpc.getAssetTransactions({ assetId: asset.index })
      expect(assetTransactionsResponse).toBeDefined()
    })

    it('should correctly get block', async () => {
      const blockResponse = await indexer.rpc.getBlock({ roundNumber: 10 })
      expect(blockResponse).toBeDefined()
    })
  })
})
