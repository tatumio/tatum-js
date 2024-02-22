import { Network, TatumSDK, Tezos } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getTezosRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Tezos>(e2eUtil.initConfig(testnet ? Network.TEZOS_TESTNET : Network.TEZOS))

describe.each([false, true])(`Tezos`, (testnet: boolean) => {
  describe(`${testnet ? 'Testnet' : 'Mainnet'}`, () => {
    it('getBlock', async () => {
      const tatum = await getTezosRpc(testnet)
      const result = await tatum.rpc.getBlock({ block: 'head', chainId: 'main' })
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('getBlocksHead', async () => {
      const tatum = await getTezosRpc(testnet)
      const result = await tatum.rpc.getBlocksHead({ chainId: 'main' })
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    it('getCheckpoint', async () => {
      const tatum = await getTezosRpc(testnet)
      const result = await tatum.rpc.getCheckpoint({ chainId: 'main' })
      await tatum.destroy()
      expect(result).toBeDefined()
    })

    if (!testnet) {
      it('getContract', async () => {
        const tatum = await getTezosRpc(testnet)
        const result = await tatum.rpc.getContract({
          chainId: 'main',
          contractId: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
          block: '3000000',
          normalizeTypes: true,
        })
        await tatum.destroy()
        expect(result).toBeDefined()
      })

      it('getContractBalanceAndFrozenBonds', async () => {
        const tatum = await getTezosRpc(testnet)
        const result = await tatum.rpc.getContractBalanceAndFrozenBonds({
          chainId: 'main',
          contractId: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
          block: '3000000',
        })
        await tatum.destroy()
        expect(result).toBeDefined()
      })

      it('getContractsEntrypoints', async () => {
        const tatum = await getTezosRpc(testnet)
        const result = await tatum.rpc.getContractEntrypoints({
          chainId: 'main',
          contractId: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
          block: '3000000',
        })
        await tatum.destroy()
        expect(result).toBeDefined()
      })
    }

    if (testnet) {
      // working with old data, operation bytes are not valid anymore
      it.skip('Inject Operation', async () => {
        const tatum = await getTezosRpc(testnet)
        const result = await tatum.rpc.injectOperation({
          operationBytes:
            'ddb22ca775467f08ba3288d53a141907d2f26c475f29e06032450749d50f35c86b00452640fe2fdda2ca92b3c2207a740a7909f751c0f602adcdaf0acc0800007ff2737a3f5ed94332c4c44502133487ffcf6b27c1649713adff55345988a7486c00452640fe2fdda2ca92b3c2207a740a7909f751c0f802aecdaf0ac90100c0843d0000452640fe2fdda2ca92b3c2207a740a7909f751c0000c0e091e8d9c8bf0a3747538a03c0b1da5d77d19f7b14ffb6b7a000bf5c368f03c14f5259b4375def0bd5450e55ddbabdca9f645411dbd7dda4160f9cc26ee09',
        })
        await tatum.destroy()
        expect(result).toBeDefined()
      })

      // TODO: Fix this test once will have relevant data https://tezos.stackexchange.com/questions/6309/how-to-properly-call-inject-block-or-protocol-api
      it.skip('Inject Block', async () => {
        const tatum = await getTezosRpc(testnet)
        const result = await tatum.rpc.injectBlock({
          data: '000',
          operations: [
            [
              {
                branch: 'BMPvGANiByxUeTkMJM1LtkEUNapeMcTjxuEAr9crBZdaYwbQX6a',
                data: 'ddb22ca775467f08ba3288d53a141907d2f26c475f29e06032450749d50f35c86b00452640fe2fdda2ca92b3c2207a740a7909f751c0f602adcdaf0acc0800007ff2737a3f5ed94332c4c44502133487ffcf6b27c1649713adff55345988a7486c00452640fe2fdda2ca92b3c2207a740a7909f751c0f802aecdaf0ac90100c0843d0000452640fe2fdda2ca92b3c2207a740a7909f751c0000c0e091e8d9c8bf0a3747538a03c0b1da5d77d19f7b14ffb6b7a000bf5c368f03c14f5259b4375def0bd5450e55ddbabdca9f645411dbd7dda4160f9cc26ee09',
              },
            ],
          ],
        })
        await tatum.destroy()
        expect(result).toBeDefined()
      })

      // TODO: Fix this test once will have relevant data https://tezos.stackexchange.com/questions/6309/how-to-properly-call-inject-block-or-protocol-api
      it.skip('Inject Protocol', async () => {
        const tatum = await getTezosRpc(testnet)
        const result = await tatum.rpc.injectBlock({
          data: '000',
          operations: [
            [
              {
                branch: 'BMPvGANiByxUeTkMJM1LtkEUNapeMcTjxuEAr9crBZdaYwbQX6a',
                data: 'ddb22ca775467f08ba3288d53a141907d2f26c475f29e06032450749d50f35c86b00452640fe2fdda2ca92b3c2207a740a7909f751c0f602adcdaf0acc0800007ff2737a3f5ed94332c4c44502133487ffcf6b27c1649713adff55345988a7486c00452640fe2fdda2ca92b3c2207a740a7909f751c0f802aecdaf0ac90100c0843d0000452640fe2fdda2ca92b3c2207a740a7909f751c0000c0e091e8d9c8bf0a3747538a03c0b1da5d77d19f7b14ffb6b7a000bf5c368f03c14f5259b4375def0bd5450e55ddbabdca9f645411dbd7dda4160f9cc26ee09',
              },
            ],
          ],
        })
        await tatum.destroy()
        expect(result).toBeDefined()
      })
    }
  })
})
