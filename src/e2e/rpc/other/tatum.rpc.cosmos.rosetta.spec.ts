import { CosmosRosetta, Network, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getCosmosRosettaRpc = async () =>
  await TatumSDK.init<CosmosRosetta>(e2eUtil.initConfig(Network.COSMONS_ROSETTA))

const networks = [{ blockchain: 'cosmos', network: 'mainnet' }]

describe.skip.each(networks)('Cosmos Rosetta', ({ network, blockchain }) => {
  describe('Mainnet', () => {
    let tatum: CosmosRosetta

    beforeEach(async () => {
      tatum = await getCosmosRosettaRpc()
    })

    afterEach(async () => {
      await tatum.destroy()
    })

    it('should get network status', async () => {
      const response = await tatum.rpc.getNetworkStatus({
        networkIdentifier: { blockchain, network },
      })
      expect(response).toBeDefined()
    })

    it('should get network list', async () => {
      const response = await tatum.rpc.getNetworkList({})
      expect(response).toBeDefined()
    })

    it('should get block', async () => {
      const response = await tatum.rpc.getBlock({
        networkIdentifier: { blockchain, network },
        blockIdentifier: { index: 19853111 },
      })
      expect(response).toBeDefined()
    })
  })
})
