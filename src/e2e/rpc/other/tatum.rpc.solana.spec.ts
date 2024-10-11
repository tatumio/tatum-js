import { Commitment, Encoding } from '../../../dto'
import { Network, Solana, TatumSDK } from '../../../service'
import { ApiKey } from '../../e2e.constant'
import { e2eUtil } from '../../e2e.util'

const getClient = async (testnet?: boolean): Promise<Solana> =>
  await TatumSDK.init<Solana>({
    network: testnet ? Network.SOLANA_DEVNET : Network.SOLANA,
    retryCount: 1,
    retryDelay: 2000,
    verbose: e2eUtil.isVerbose,
    apiKey: testnet ? ApiKey.testnet : ApiKey.mainnet,
  })

const blockNumber = 203046000

// TODO: Too unstable
describe('Solana', () => {
  describe('mainnet', () => {
    describe('getSignaturesForAddress', () => {
      it('should return getSignatureForAddress', async () => {
        const tatum = await getClient()
        const r = await tatum.rpc.getSignaturesForAddress('5x4DyBUsJFYuBFBUstXVraoGG9RtzPEJqaL4F8u637vt')
        console.log(r)
        await tatum.destroy()
      })
    })

    describe('getAccountInfo', () => {
      it('should return account info', async () => {
        const tatum = await getClient()
        const publicKey = '8Ew6iQXcTRHAUNNu3X9VBn1g1bJkXEZJ9gFD2AGKtdPB'
        const { result } = await tatum.rpc.getAccountInfo(publicKey)
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result?.value?.lamports).toBeGreaterThan(0)
      })
    })
    describe('getBalance', () => {
      it('should return the balance of a public key', async () => {
        const tatum = await getClient()
        const publicKey = '8Ew6iQXcTRHAUNNu3X9VBn1g1bJkXEZJ9gFD2AGKtdPB'

        const { result } = await tatum.rpc.getBalance(publicKey)

        await tatum.destroy()
        const balance = result?.value
        expect(typeof balance).toBe('number')
        expect(balance).toBeGreaterThan(0)

        expect(result?.context.slot).toBeGreaterThan(0)
      })

      it.skip('should return error if an invalid public key is provided', async () => {
        const tatum = await getClient()
        const publicKey = 'invalid-public-key'

        const { error } = await tatum.rpc.getBalance(publicKey)
        await tatum.destroy()
        expect(error?.message).toBe('Invalid param: Invalid')
      })
    })

    describe('getBlockHeight', () => {
      it('should return the current block height', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getBlockHeight()
        await tatum.destroy()
        expect(typeof result).toBe('number')
        expect(result).toBeGreaterThan(0)
      })
    })

    describe('getBlockProduction', () => {
      it('should return block production information', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getBlockProduction()
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result).toHaveProperty('value.byIdentity')
        expect(result).toHaveProperty('value.range.firstSlot')
      })
    })

    describe('getBlockCommitment', () => {
      it('should return block commitment information', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getBlockCommitment(blockNumber)
        await tatum.destroy()
        expect(result).toHaveProperty('commitment')
        expect(result?.totalStake).toBeGreaterThan(0)
      })
    })

    describe('getBlocks', () => {
      it('should return an array of block numbers between two slots', async () => {
        const tatum = await getClient()
        const startSlot = 193167060
        const endSlot = 193167070
        const { result } = await tatum.rpc.getBlocks(endSlot, startSlot)
        await tatum.destroy()
        expect(Array.isArray(result)).toBe(true)
      })

      // Sometimes this test fails, so we skip it for now
      it.skip('should return an array of block numbers between two slots, passing only endSlot', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getBlocks(blockNumber)
        await tatum.destroy()
        expect(Array.isArray(result)).toBe(true)
      }, 9000000)

      it('should return an array of confirmed block numbers between two slots', async () => {
        const tatum = await getClient()
        const startSlot = 193167060
        const endSlot = 193167070
        const { result } = await tatum.rpc.getBlocks(endSlot, startSlot, {
          commitment: Commitment.Confirmed,
        })
        await tatum.destroy()
        expect(Array.isArray(result)).toBe(true)
      })
    })

    describe('getBlockTime', () => {
      it('should return block time ', async () => {
        const tatum = await getClient()
        const { result: slot } = await tatum.rpc.getSlot()
        const { result } = await tatum.rpc.getBlockTime(slot || 0)
        await tatum.destroy()
        expect(typeof result).toBe('number')
        expect(result).toBeGreaterThan(0)
      })
    })

    describe('getClusterNodes', () => {
      it('should return cluster nodes info ', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getClusterNodes()
        await tatum.destroy()
        expect(Array.isArray(result)).toBe(true)
      })
    })

    describe('getEpochInfo', () => {
      it('should return epoch info ', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getEpochInfo()
        await tatum.destroy()
        expect(result?.epoch).toBeGreaterThan(0)
      })
    })

    describe('getEpochSchedule', () => {
      it('should return epoch schedule ', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getEpochSchedule()
        await tatum.destroy()
        expect(result?.slotsPerEpoch).toBeGreaterThan(0)
      })
    })

    describe('getFirstAvailableBlock', () => {
      it.skip('should return first available block', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getFirstAvailableBlock()
        await tatum.destroy()
        expect(result).toBeGreaterThan(0)
      })
    })

    describe('getGenesisHash', () => {
      it('should return genesis hash', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getGenesisHash()
        await tatum.destroy()
        expect(result).toBeTruthy()
      })
    })

    describe('getHealth', () => {
      it('should return health status', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getHealth()
        await tatum.destroy()
        expect(result).toEqual('ok')
      })
    })

    describe('getHighestSnapshotSlot', () => {
      it('should return highest snapshot slot', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getHighestSnapshotSlot()
        await tatum.destroy()
        expect(result?.full).toBeGreaterThan(0)
      })
    })

    describe('getIdentity', () => {
      it('should return identity', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getIdentity()
        await tatum.destroy()
        expect(result).toBeTruthy()
      })
    })

    describe('getInflationGovernor', () => {
      it('should return inflation governor info', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getInflationGovernor()
        await tatum.destroy()
        expect(result?.terminal).toBeGreaterThan(0)
      })
    })

    describe('getInflationRate', () => {
      it('should return inflation rate', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getInflationRate()
        await tatum.destroy()
        expect(result?.total).toBeGreaterThan(0)
        expect(result?.epoch).toBeGreaterThan(0)
      })
    })

    describe('getInflationReward', () => {
      it.skip('should return inflation reward', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getInflationReward([
          'GUP3BG93X9EoDor3bDarTqv8n653u1Bkr2NbQqRqBZwF',
        ])
        const item = result![0]
        await tatum.destroy()
        expect(item.epoch).toBeGreaterThan(0)
      })
    })

    //takes long time to finish
    describe('getLargestAccounts', () => {
      it.skip('should return largest accounts', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getLargestAccounts()
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result?.value.length).toBeGreaterThan(0)
      })
    })

    describe('getLatestBlockhash', () => {
      it('should return latest blockhash', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getLatestBlockhash()
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result?.value.blockhash).toBeTruthy()
        expect(result?.value.lastValidBlockHeight).toBeGreaterThan(0)
      })
    })

    describe('getLeaderSchedule', () => {
      it('should return leader schedule', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getLeaderSchedule()
        await tatum.destroy()
        //binance validator
        expect(result?.DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy.length).toBeGreaterThan(0)
      })
    })

    describe('getMultipleAccounts', () => {
      it('should return account info', async () => {
        const tatum = await getClient()
        //binance validator
        const { result } = await tatum.rpc.getMultipleAccounts([
          'DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy',
        ])
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result?.value[0]?.lamports).toBeGreaterThan(0)
      })
    })

    describe('getSlot', () => {
      it('should return slot number', async () => {
        const tatum = await getClient()

        const { result } = await tatum.rpc.getSlot()
        await tatum.destroy()
        expect(result).toBeGreaterThan(0)
      })
    })

    describe('getSlotLeaders', () => {
      it('should return slot leader info', async () => {
        const tatum = await getClient()

        const { result } = await tatum.rpc.getSlotLeader()
        await tatum.destroy()
        expect(result).toBeTruthy()
      })
    })

    describe('getTokenAccountBalance', () => {
      it('should return token account balance', async () => {
        const tatum = await getClient()

        const { result } = await tatum.rpc.getTokenAccountBalance(
          'DhzDoryP2a4rMK2bcWwJxrE2uW6ir81ES8ZwJJPPpxDN',
        )
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result?.value.amount).toBeTruthy()
      })
    })

    describe('getTokenAccountsByOwner', () => {
      it('should return token accounts by owner', async () => {
        const tatum = await getClient()

        const { result } = await tatum.rpc.getTokenAccountsByOwner(
          'GgPpTKg78vmzgDtP1DNn72CHAYjRdKY7AV6zgszoHCSa',
          {
            mint: '1YDQ35V8g68FGvcT85haHwAXv1U7XMzuc4mZeEXfrjE',
          },
          { encoding: Encoding.JsonParsed },
        )
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result?.value.length).toBeGreaterThan(0)
      })
    })

    describe('getTransaction', () => {
      it.skip('should return transaction data', async () => {
        const tatum = await getClient()

        const { result: slot } = await tatum.rpc.getSlot()
        const { result: blockResponse } = await tatum.rpc.getBlock(slot || 0, {
          encoding: Encoding.JsonParsed,
          maxSupportedTransactionVersion: 0,
        })

        const { result } = await tatum.rpc.getTransaction(
          blockResponse?.transactions[0].transaction.signatures[0],
        )
        await tatum.destroy()
        expect(result?.slot).toBeGreaterThan(0)
        expect(result?.transaction).toBeTruthy()
      })
    })

    //takes too long to finish
    describe('getProgramAccount', () => {
      it.skip('should return account data', async () => {
        const tatum = await getClient(true)

        const { result } = await tatum.rpc.getProgramAccounts(
          'FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T',
          {
            filters: [
              {
                dataSize: 165, // number of bytes
              },
            ],
          },
        )
        await tatum.destroy()
        expect(result).toBeTruthy()
      })
    })
  })

  describe('devnet', () => {
    describe('getBlockHeight', () => {
      it('should return the current block height', async () => {
        const tatum = await getClient(true)
        const { result } = await tatum.rpc.getBlockHeight()
        await tatum.destroy()
        expect(typeof result).toBe('number')
        expect(result).toBeGreaterThan(0)
      })
    })

    describe('getBlockProduction', () => {
      it('should return block production information', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getBlockProduction()
        await tatum.destroy()
        expect(result?.context.slot).toBeGreaterThan(0)
        expect(result).toHaveProperty('value.byIdentity')
        expect(result).toHaveProperty('value.range.firstSlot')
      })
    })

    describe('getBlockCommitment', () => {
      it('should return block commitment information', async () => {
        const tatum = await getClient()
        const { result } = await tatum.rpc.getBlockCommitment(blockNumber)
        await tatum.destroy()
        expect(result).toHaveProperty('commitment')
        expect(result?.totalStake).toBeGreaterThan(0)
      })
    })

    describe('getBlock', () => {
      it('should return a recent block', async () => {
        const tatum = await getClient(true)
        const { result: slot } = await tatum.rpc.getSlot()
        const { result } = await tatum.rpc.getBlock(slot || 0, {
          encoding: Encoding.JsonParsed,
          maxSupportedTransactionVersion: 0,
        })
        await tatum.destroy()
        expect(result).toHaveProperty('blockhash')
        expect(result?.blockhash).toBeTruthy()
        expect(result?.previousBlockhash).toBeTruthy()
        expect(result?.blockHeight).toBeGreaterThan(0)
        expect(result?.parentSlot).toBeGreaterThan(0)
        expect(result?.blockTime).toBeGreaterThan(0)
        expect(Array.isArray(result?.transactions)).toBe(true)
      })
    })
  })
})
