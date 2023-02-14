import { TatumSdk } from '../service/tatum/tatum'
import { Chain, Network } from '../service/tatum/tatum.dto'

describe('Tatum Init', () => {
  describe('Api Key Auth', () => {
    it('Testnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.TESTNET_API_KEY,
        network: Network.Testnet,
      })
      const { testnet } = await tatum.getApiInfo()
      expect(testnet).toBe(true)
    })

    it('Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        apiKey: process.env.MAINNET_API_KEY,
        network: Network.Mainnet,
      })
      const { testnet } = await tatum.getApiInfo()
      expect(testnet).toBe(false)
    })

    it('Testnet with Mainnet Api Key', async () => {
      await expect(
        TatumSdk.init({
          apiKey: process.env.MAINNET_API_KEY,
          network: Network.Testnet,
        }),
      ).rejects.toThrow('Tatum API key is not valid for Testnet')
    })

    it('Mainnet with Testnet Api Key', async () => {
      await expect(
        TatumSdk.init({
          apiKey: process.env.TESTNET_API_KEY,
          network: Network.Mainnet,
        }),
      ).rejects.toThrow('Tatum API key is not valid for Mainnet')
    })
  })

  describe('IP Auth', () => {
    it('Default Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init()
      await checkValidBalancesFlowMainnet(tatum)
    })

    it('Testnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        network: Network.Testnet,
      })
      await checkValidBalancesFlowTestnet(tatum)
    })

    it('Mainnet', async () => {
      const tatum: TatumSdk = await TatumSdk.init({
        network: Network.Mainnet,
      })
      await checkValidBalancesFlowMainnet(tatum)
    })

    const checkValidBalancesFlowMainnet = async (tatum: TatumSdk) => {
      const balances = await tatum.nft.getBalance([
        {
          chain: Chain.ethereum,
          addresses: ['0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F'],
        },
      ])
      expect(balances.ethereum).toBeDefined()
      expect(balances.ethereum!['0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F']).toStrictEqual([
        {
          contractAddress: '0x60f80121c31a0d46b5279700f9df786054aa5ee5',
          metadata: undefined,
          metadataUri: 'ipfs://ipfs/QmfEJFg1oW9gFUmdmD4JcBj9Z3zHA5YHPrdorWTZYjWZci',
          tokenId: '1029979',
        },
      ])
    }

    const checkValidBalancesFlowTestnet = async (tatum: TatumSdk) => {
      const balances = await tatum.nft.getBalance([
        {
          chain: Chain.ethereum,
          addresses: ['0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F'],
        },
      ])
      expect(balances.ethereum).toBeDefined()
      expect(balances.ethereum!['0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F']).toStrictEqual([
        {
          contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
          metadata: null,
          metadataUri: 'https://my_token_data.com',
          tokenId: '1',
        },
      ])
    }
  })
})
