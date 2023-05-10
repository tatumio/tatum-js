import { Commitment, Encoding, Solana } from '../dto'
import { Network, TatumSDK } from '../service'

const getClient = async (testnet?: boolean) =>
  await TatumSDK.init<Solana>({
    network: testnet ? Network.SOLANA_DEVNET : Network.SOLANA,
    verbose: true,
    retryCount: 1,
    retryDelay: 2000,
  })
describe('Solana mainnet RPC', () => {
  describe('getBalance', () => {
    it('should return the balance of a public key', async () => {
      const tatum = await getClient()
      const publicKey = '8Ew6iQXcTRHAUNNu3X9VBn1g1bJkXEZJ9gFD2AGKtdPB'

      const balanceResponse = await tatum.rpc.getBalance(publicKey)

      const balance = balanceResponse.value
      expect(typeof balance).toBe('number')
      expect(balance).toBeGreaterThan(0)

      const slot = balanceResponse.context.slot
      expect(typeof slot).toBe('number')
      expect(slot).toBeGreaterThan(0)
    })

    it('should return undefined if an invalid public key is provided', async () => {
      const tatum = await getClient()
      const publicKey = 'invalid-public-key'

      const balanceResponse = await tatum.rpc.getBalance(publicKey)

      expect(balanceResponse).toBe(undefined)
    })
  })

  describe('getBlockHeight', () => {
    test('should return the current block height', async () => {
      const tatum = await getClient()
      const blockHeightResponse = await tatum.rpc.getBlockHeight()

      expect(typeof blockHeightResponse).toBe('number')
      expect(blockHeightResponse).toBeGreaterThan(0)
    })
  })

  describe('getBlock', () => {
    test('should return a recent block', async () => {
      const tatum = await getClient()
      const blockResponse = await tatum.rpc.getBlock(193167072, {
        encoding: Encoding.JsonParsed,
        maxSupportedTransactionVersion: 0,
      })

      expect(blockResponse).toHaveProperty('blockhash')
      expect(blockResponse?.blockhash).toBeTruthy()
      expect(blockResponse?.previousBlockhash).toBeTruthy()
      expect(blockResponse?.blockHeight).toBeGreaterThan(0)
      expect(blockResponse?.parentSlot).toBeGreaterThan(0)
      expect(blockResponse?.blockTime).toBeGreaterThan(0)
      expect(Array.isArray(blockResponse?.transactions)).toBe(true)
    })
  })

  describe('getBlockProduction', () => {
    test('should return block production information', async () => {
      const tatum = await getClient()
      const blockProduction = await tatum.rpc.getBlockProduction()

      expect(blockProduction).toHaveProperty('context.slot')
      expect(blockProduction).toHaveProperty('value.byIdentity')
      expect(blockProduction).toHaveProperty('value.range.firstSlot')
    })
  })

  describe('getBlockCommitment', () => {
    test('should return block commitment information', async () => {
      const tatum = await getClient()
      const result = await tatum.rpc.getBlockCommitment(193167072)

      expect(Array.isArray(result.commitment)).toBe(true)
      expect(result.totalStake).toBeGreaterThan(0)
    })
  })

  describe('getBlocks', () => {
    test('should return an array of block numbers between two slots', async () => {
      const tatum = await getClient()
      const startSlot = 193167060
      const endSlot = 193167070
      const blocksResponse = await tatum.rpc.getBlocks(endSlot, startSlot)

      expect(Array.isArray(blocksResponse)).toBe(true)
    })

    test('should return an array of block numbers between two slots, passing only endSlot', async () => {
      const tatum = await getClient()
      const endSlot = 193167070
      const blocksResponse = await tatum.rpc.getBlocks(endSlot)

      expect(Array.isArray(blocksResponse)).toBe(true)
    })

    test('should return an array of confirmed block numbers between two slots', async () => {
      const tatum = await getClient()
      const startSlot = 193167060
      const endSlot = 193167070
      const blocksResponse = await tatum.rpc.getBlocks(endSlot, startSlot, Commitment.Confirmed)

      expect(Array.isArray(blocksResponse)).toBe(true)
    })
  })
})
