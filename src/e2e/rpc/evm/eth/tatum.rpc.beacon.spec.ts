import { Network } from '../../../../dto'
import { Ethereum } from '../../../../service'
import { ApiKey } from '../../../e2e.constant'
import { EvmE2eUtils } from '../evm.e2e.utils'

describe('Beacon', () => {
  describe('v1', () => {
    const networks = [Network.ETHEREUM_HOLESKY, Network.ETHEREUM]

    describe.each(networks)('%s', (network) => {
      const apiKey = network === Network.ETHEREUM ? ApiKey.mainnet : ApiKey.testnet

      it.skip('should get node version', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getNodeVersion()
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get genesis', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getGenesis()
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get state root', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getStateRoot({ stateId: 'head' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it.skip('should get block headers', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getBlockHeaders({ slot: '1000' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get block root', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getBlockRoot({ blockId: 'head' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get state committees', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getStateCommittees({ stateId: 'head' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get state finality checkpoints', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getStateFinalityCheckpoints({ stateId: 'head' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get state fork', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getStateFork({ stateId: 'head' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })

      it('should get state sync committees', async () => {
        const tatum = await EvmE2eUtils.initTatum<Ethereum>(network, apiKey)
        const { data } = await tatum.rpc.beacon.v1.getStateSyncCommittees({ stateId: 'head' })
        await tatum.destroy()
        expect(data).toBeDefined()
      })
    })
  })
})
