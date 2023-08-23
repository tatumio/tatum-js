import { TatumTezosSDK } from '../tezos.sdk'
import { DeployTezosNft } from '../services/tezos.tzip'

describe.skip('TatumTezosSDK - blockchain', () => {
  jest.setTimeout(15000)

  describe('Tezos NFT', () => {
    it('Should deploy TZIP-12 contract on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const testnet = 'https://rpc.ghostnet.teztnets.xyz'

      const body: DeployTezosNft = {
        privateKey: '',
        owner: 'tz1cCRCbBwnazV6howgD84a6fuhikKTnsWHZ',
        metadata: JSON.stringify({ name: 'contract name', symbol: 'TZ-gold' }),
      }

      const contractAddress = await sdk.nft({ tezosWeb }).deploy.deployTzip12(body, testnet)

      console.log(contractAddress)
    })
  })
})
