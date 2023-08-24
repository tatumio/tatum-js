import { TatumTezosSDK } from '../tezos.sdk'
import {
  BurnTezosNft,
  DeployTezosNft,
  MintTezosNft,
  Nft,
  TransferTezosNft,
  UpdateOperatorTezosNft,
} from '../services/tezos.tzip'

describe.skip('TatumTezosSDK - blockchain', () => {
  jest.setTimeout(15000)

  describe('Tezos NFT', () => {
    const testnet = 'https://rpc.ghostnet.teztnets.xyz'
    const contractAddress = 'KT1Th4M8mbfS1PfEidswXp4pX5xcH4tdzKbD'
    const addr1 = 'tz1cCRCbBwnazV6howgD84a6fuhikKTnsWHZ'
    const addr2 = 'tz1f1nboqWEhZJHwZnxnokQ9QoTiT21qMZxG'
    const addr3 = 'tz1LszyhzQS6JgySBSNkM55szM18inGwEgPa'
    const privateKey = ''
    const privateKey2 = ''

    it.skip('Should deploy TZIP-12 contract on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: DeployTezosNft = {
        privateKey,
        owner: addr1,
        metadata: JSON.stringify({ name: 'contract name', symbol: 'TZ-gold' }),
      }

      const contractAddress = await sdk.nft({ tezosWeb }).deploy.tzip12(body, testnet)

      console.log(contractAddress)
    })

    it.skip('Should mint an NFT collection on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const token: Nft = {
        id: '6',
        ipfs: 'ipfs://Qmcz7iquheYehi4rmA2v9ZWakxMJCJusC5K7Harz8WNdza',
      }

      const token2: Nft = {
        id: '7',
        ipfs: 'ipfs://QmS7W7vtC6f3kSPUUkapVtW5bAXQvtn2tDDBDiBH1R3g2h',
      }

      const body: MintTezosNft = {
        contractAddress,
        owner: addr1,
        nfts: [token, token2],
        privateKey,
      }

      const tx = await sdk.nft({ tezosWeb }).mintNft(body, testnet)

      console.log(tx)
    })

    it.skip('Should burn an NFT on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: BurnTezosNft = {
        contractAddress,
        owner: addr1,
        tokens: ['1'],
        privateKey,
      }

      const tx = await sdk.nft({ tezosWeb }).burnNft(body, testnet)

      console.log(tx)
    })
    it.skip('Should transfer an NFT on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: TransferTezosNft = {
        contractAddress,
        from: addr2,
        to: addr3,
        tokenId: '3',
        amount: '1',
        privateKey: privateKey2,
      }

      const tx = await sdk.nft({ tezosWeb }).transferNft(body, testnet)

      console.log(tx)
    })
    it.skip('Should add operator to a token on testnet', async () => {
      const sdk = TatumTezosSDK()
      const tezosWeb = sdk.tezosWeb

      const body: UpdateOperatorTezosNft = {
        contractAddress,
        owner: addr1,
        operator: addr2,
        tokenId: '3',
        privateKey,
      }

      const tx = await sdk.nft({ tezosWeb }).updateOperator(body, true, testnet)

      console.log(tx)
    })
  })
})
