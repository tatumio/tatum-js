import { BlockchainTronService } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { tronWeb } from './services/tron.web'
import { tronTx } from './services/tron.tx'
import { tronWallet } from './services/tron.wallet'
import { tronRecord } from './services/tron.record'

const blockchain = Blockchain.TRON

export const TatumTronSDK = (args: SDKArguments) => {
  const web = tronWeb()

  return {
    ...abstractBlockchainSdk({
      ...args,
      blockchain,
    }),
    transaction: tronTx({ tronWeb: web }),
    wallet: tronWallet({ tronWeb: web }),
    tronWeb: web,
    record: tronRecord(),
    blockchain: {
      broadcast: BlockchainTronService.tronBroadcast,
      getCurrentBlock: BlockchainTronService.tronGetCurrentBlock,
      getBlock: BlockchainTronService.tronGetBlock,
      getTrc10Detail: BlockchainTronService.tronTrc10Detail,
      getAccount: BlockchainTronService.tronGetAccount,
      getTransaction: BlockchainTronService.tronGetTransaction,
    },
  }
}
