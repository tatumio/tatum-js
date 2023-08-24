import { TatumTezosSDK } from '../tezos.sdk'
import { DeployTezosNft, MintTezosNft, Nft } from '../services/tezos.tzip'

describe('TatumTezosSDK - blockchain', () => {
  jest.setTimeout(15000)

  describe('Tezos NFT', () => {
    const testnet = 'https://rpc.ghostnet.teztnets.xyz'
    it.skip('Should deploy TZIP-12 contract on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: DeployTezosNft = {
        privateKey: '',
        owner: 'tz1cCRCbBwnazV6howgD84a6fuhikKTnsWHZ',
        metadata: JSON.stringify({ name: 'contract name', symbol: 'TZ-gold' }),
      }

      const contractAddress = await sdk.nft({ tezosWeb }).deploy.tzip12(body, testnet)

      console.log(contractAddress)
    })

    it('Should mint a new NFT on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const token: Nft = {
        id: '1',
        ipfs: 'ipfs://Qmcz7iquheYehi4rmA2v9ZWakxMJCJusC5K7Harz8WNdza',
      }

      const body: MintTezosNft = {
        contractAddress: 'KT1Th4M8mbfS1PfEidswXp4pX5xcH4tdzKbD',
        to: 'tz1cCRCbBwnazV6howgD84a6fuhikKTnsWHZ',
        nfts: [token],
        privateKey: '',
      }

      const tx = await sdk.nft({ tezosWeb }).mintNft(body, testnet)

      console.log(tx)
    })
  })
})
