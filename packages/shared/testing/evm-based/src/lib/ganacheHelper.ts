import * as ganache from 'ganache'
import Web3 from 'web3'
import { Blockchain, DERIVATION_PATH } from '@tatumio/shared-core'
import { TEST_DATA } from '@tatumio/shared-testing-common'

export type GanacheAccount = { address: string; privateKey: string }

export const ganacheHelper = {
  /**
   * Don't forget to call init!
   */
  inmemoryBlockchain: (
    blockchain: Blockchain,
    args?: {
      mnemonic?: string
      defaultBalance?: number
      totalAccounts?: number
    },
  ): {
    web3: Web3
    accounts: GanacheAccount[]
  } => {
    const options = {
      wallet: {
        mnemonic: args?.mnemonic ?? TEST_DATA.MNEMONIC,
        hdPath: DERIVATION_PATH[blockchain],
        defaultBalance: args?.defaultBalance ?? 10,
        totalAccounts: args?.totalAccounts ?? 10,
      },
      miner: {
        blockTime: 0,
      },
    }

    const provider = ganache.provider(options)
    const initialAccounts = provider.getInitialAccounts()

    const web3 = new Web3(provider as any)

    return {
      web3,
      accounts: Object.keys(initialAccounts).map((k) => ({
        address: k,
        privateKey: initialAccounts[k].secretKey,
      })),
    }
  },
  initWeb3: async (web3: Web3) => {
    await web3.eth.getAccounts() // Needed to init web3
  },
}
