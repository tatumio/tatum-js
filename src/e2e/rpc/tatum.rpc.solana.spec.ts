import { Commitment, Encoding } from '../../dto'
import { Network, Solana, TatumSDK } from '../../service'
import { Status } from '../../util'

const getClient = async (testnet?: boolean): Promise<Solana> =>
  await TatumSDK.init<Solana>({
    network: testnet ? Network.SOLANA_DEVNET : Network.SOLANA,
    retryCount: 1,
    retryDelay: 2000,
  })

const blockNumber = 203046000

describe('Solana mainnet RPC', () => {
  describe('getAccountInfo', () => {
    it('should return account info', async () => {
      const tatum = await getClient()
      const publicKey = '8Ew6iQXcTRHAUNNu3X9VBn1g1bJkXEZJ9gFD2AGKtdPB'
      const { data, status } = await tatum.rpc.getAccountInfo(publicKey)

      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data.value?.lamports).toBeGreaterThan(0)
    })
  })
  describe('getBalance', () => {
    it('should return the balance of a public key', async () => {
      const tatum = await getClient()
      const publicKey = '8Ew6iQXcTRHAUNNu3X9VBn1g1bJkXEZJ9gFD2AGKtdPB'

      const { data, status } = await tatum.rpc.getBalance(publicKey)

      expect(status).toBe(Status.SUCCESS)

      const balance = data.value
      expect(typeof balance).toBe('number')
      expect(balance).toBeGreaterThan(0)

      expect(data.context.slot).toBeGreaterThan(0)
    })

    it('should return undefined if an invalid public key is provided', async () => {
      const tatum = await getClient()
      const publicKey = 'invalid-public-key'

      const { error, status } = await tatum.rpc.getBalance(publicKey)

      expect(status).toBe(Status.ERROR)
      expect(Array.isArray(error?.message)).toBe(true)
      expect(error?.message[0]).toBe('Invalid param: Invalid')
    })
  })

  describe('getBlockHeight', () => {
    it('should return the current block height', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getBlockHeight()

      expect(status).toBe(Status.SUCCESS)
      expect(typeof data).toBe('number')
      expect(data).toBeGreaterThan(0)
    })
  })

  describe('getBlock', () => {
    it('should return a recent block', async () => {
      const tatum = await getClient()
      const { data: slot } = await tatum.rpc.getSlot()
      const { data, status } = await tatum.rpc.getBlock(slot, {
        encoding: Encoding.JsonParsed,
        maxSupportedTransactionVersion: 0,
      })
      expect(status).toBe(Status.SUCCESS)
      expect(data).toHaveProperty('blockhash')
      expect(data?.blockhash).toBeTruthy()
      expect(data?.previousBlockhash).toBeTruthy()
      expect(data?.blockHeight).toBeGreaterThan(0)
      expect(data?.parentSlot).toBeGreaterThan(0)
      expect(data?.blockTime).toBeGreaterThan(0)
      expect(Array.isArray(data?.transactions)).toBe(true)
    })
  })

  describe('getBlockProduction', () => {
    it('should return block production information', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getBlockProduction()

      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data).toHaveProperty('value.byIdentity')
      expect(data).toHaveProperty('value.range.firstSlot')
    })
  })

  describe('getBlockCommitment', () => {
    it('should return block commitment information', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getBlockCommitment(blockNumber)

      expect(status).toBe(Status.SUCCESS)
      expect(data).toHaveProperty('commitment')
      expect(data.totalStake).toBeGreaterThan(0)
    })
  })

  describe('getBlocks', () => {
    it('should return an array of block numbers between two slots', async () => {
      const tatum = await getClient()
      const startSlot = 193167060
      const endSlot = 193167070
      const { data, status } = await tatum.rpc.getBlocks(endSlot, startSlot)

      expect(status).toBe(Status.SUCCESS)
      expect(Array.isArray(data)).toBe(true)
    })

    // Sometimes this test fails, so we skip it for now
    it.skip('should return an array of block numbers between two slots, passing only endSlot', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getBlocks(blockNumber)

      expect(status).toBe(Status.SUCCESS)
      expect(Array.isArray(data)).toBe(true)
    }, 9000000)

    it('should return an array of confirmed block numbers between two slots', async () => {
      const tatum = await getClient()
      const startSlot = 193167060
      const endSlot = 193167070
      const { data, status } = await tatum.rpc.getBlocks(endSlot, startSlot, {
        commitment: Commitment.Confirmed,
      })

      expect(status).toBe(Status.SUCCESS)
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('getBlockTime', () => {
    it('should return block time ', async () => {
      const tatum = await getClient()
      const { data: slot } = await tatum.rpc.getSlot()
      const { data, status } = await tatum.rpc.getBlockTime(slot)

      expect(status).toBe(Status.SUCCESS)
      expect(typeof data).toBe('number')
      expect(data).toBeGreaterThan(0)
    })
  })

  describe('getClusterNodes', () => {
    it('should return cluster nodes info ', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getClusterNodes()

      expect(status).toBe(Status.SUCCESS)
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('getEpochInfo', () => {
    it('should return epoch info ', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getEpochInfo()

      expect(status).toBe(Status.SUCCESS)
      expect(data.epoch).toBeGreaterThan(0)
    })
  })

  describe('getEpochSchedule', () => {
    it('should return epoch schedule ', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getEpochSchedule()

      expect(status).toBe(Status.SUCCESS)
      expect(data.slotsPerEpoch).toBeGreaterThan(0)
    })
  })

  describe('getFirstAvailableBlock', () => {
    it('should return first available block', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getFirstAvailableBlock()

      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeGreaterThan(0)
    })
  })

  describe('getGenesisHash', () => {
    it('should return genesis hash', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getGenesisHash()

      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeTruthy()
    })
  })

  describe('getHealth', () => {
    it('should return health status', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getHealth()

      expect(status).toBe(Status.SUCCESS)
      expect(data).toEqual('ok')
    })
  })

  describe('getHighestSnapshotSlot', () => {
    it('should return highest snapshot slot', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getHighestSnapshotSlot()

      expect(status).toBe(Status.SUCCESS)
      expect(data.full).toBeGreaterThan(0)
    })
  })

  describe('getIdentity', () => {
    it('should return identity', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getIdentity()

      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeTruthy()
    })
  })

  describe('getInflationGovernor', () => {
    it('should return inflation governor info', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getInflationGovernor()

      expect(status).toBe(Status.SUCCESS)
      expect(data.terminal).toBeGreaterThan(0)
    })
  })

  describe('getInflationRate', () => {
    it('should return inflation rate', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getInflationRate()

      expect(status).toBe(Status.SUCCESS)
      expect(data.total).toBeGreaterThan(0)
      expect(data.epoch).toBeGreaterThan(0)
    })
  })

  describe('getInflationReward', () => {
    it.skip('should return inflation reward', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getInflationReward([
        'GUP3BG93X9EoDor3bDarTqv8n653u1Bkr2NbQqRqBZwF',
      ])

      expect(status).toBe(Status.SUCCESS)
      expect(data[0].epoch).toBeGreaterThan(0)
    })
  })

  //takes long time to finish
  describe('getLargestAccounts', () => {
    it.skip('should return largest accounts', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getLargestAccounts()

      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data.value.length).toBeGreaterThan(0)
    })
  })

  describe('getLatestBlockhash', () => {
    it('should return latest blockhash', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getLatestBlockhash()

      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data.value.blockhash).toBeTruthy()
      expect(data.value.lastValidBlockHeight).toBeGreaterThan(0)
    })
  })

  describe('getLeaderSchedule', () => {
    it('should return leader schedule', async () => {
      const tatum = await getClient()
      const { data, status } = await tatum.rpc.getLeaderSchedule()

      expect(status).toBe(Status.SUCCESS)
      //binance validator
      expect(data?.DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy.length).toBeGreaterThan(0)
    })
  })

  describe('getMultipleAccounts', () => {
    it('should return account info', async () => {
      const tatum = await getClient()
      //binance validator
      const { data, status } = await tatum.rpc.getMultipleAccounts([
        'DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy',
      ])
      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data.value[0]?.lamports).toBeGreaterThan(0)
    })
  })

  describe('getSlot', () => {
    it('should return slot number', async () => {
      const tatum = await getClient()

      const { data, status } = await tatum.rpc.getSlot()
      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeGreaterThan(0)
    })
  })

  describe('getSlotLeaders', () => {
    it('should return slot leader info', async () => {
      const tatum = await getClient()

      const { data, status } = await tatum.rpc.getSlotLeader()
      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeTruthy()
    })
  })

  describe('getTokenAccountBalance', () => {
    it('should return token account balance', async () => {
      const tatum = await getClient()

      const { data, status } = await tatum.rpc.getTokenAccountBalance(
        'DhzDoryP2a4rMK2bcWwJxrE2uW6ir81ES8ZwJJPPpxDN',
      )
      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data.value.amount).toBeTruthy()
    })
  })

  describe('getTokenAccountsByOwner', () => {
    it('should return token accounts by owner', async () => {
      const tatum = await getClient()

      const { data, status } = await tatum.rpc.getTokenAccountsByOwner(
        'GgPpTKg78vmzgDtP1DNn72CHAYjRdKY7AV6zgszoHCSa',
        {
          mint: '1YDQ35V8g68FGvcT85haHwAXv1U7XMzuc4mZeEXfrjE',
        },
        { encoding: Encoding.JsonParsed },
      )
      expect(status).toBe(Status.SUCCESS)
      expect(data.context.slot).toBeGreaterThan(0)
      expect(data.value.length).toBeGreaterThan(0)
    })
  })

  describe('getTransaction', () => {
    it('should return transaction data', async () => {
      const tatum = await getClient()

      const { data: slot } = await tatum.rpc.getSlot()
      const { data: blockResponse } = await tatum.rpc.getBlock(slot, {
        encoding: Encoding.JsonParsed,
        maxSupportedTransactionVersion: 0,
      })

      const { data, status } = await tatum.rpc.getTransaction(
        blockResponse?.transactions[0].transaction.signatures[0],
      )

      expect(status).toBe(Status.SUCCESS)
      expect(data?.slot).toBeGreaterThan(0)
      expect(data?.transaction).toBeTruthy()
    })
  })

  //takes too long to finish
  describe('getProgramAccount', () => {
    it.skip('should return account data', async () => {
      const tatum = await getClient(true)

      const { data, status } = await tatum.rpc.getProgramAccounts(
        'FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T',
        {
          filters: [
            {
              dataSize: 165, // number of bytes
            },
          ],
        },
      )
      expect(status).toBe(Status.SUCCESS)
      expect(data).toBeTruthy()
    })
  })
})
