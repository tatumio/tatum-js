import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BlockchainAlgorandAlgoService } from '@tatumio/api-client'
import { algoWeb } from './services/algo.web'
import { algoRecord } from './services/algo.record'
import { algoWallet } from './services/algo.wallet'

const blockchain = Blockchain.ALGO

export const TatumAlgoSDK = (args: SDKArguments) => {
  const web = algoWeb()

  return {
    ...abstractBlockchainSdk({
      ...args,
      blockchain,
    }),
    algoWeb: web,
    record: algoRecord(),
    wallet: algoWallet(),
    blockchain: {
      broadcast: BlockchainAlgorandAlgoService.algoandBroadcast,
      getBlock: BlockchainAlgorandAlgoService.algorandGetBlock,
      getCurrentBlock: BlockchainAlgorandAlgoService.algorandGetCurrentBlock,
      getBlockchainAccountBalance: BlockchainAlgorandAlgoService.algorandGetBalance,
      getTransaction: BlockchainAlgorandAlgoService.algorandGetTransaction,
      getPayTransactionByFromTo: BlockchainAlgorandAlgoService.algorandGetPayTransactionsByFromTo,
    },
  }
}
