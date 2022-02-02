import { BlockchainTronService } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.TRON

export const TatumTronSDK = (args: SDKArguments) => {
  const api = BlockchainTronService

  return {
    api,
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