import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BlockchainAlgorandAlgoService } from '@tatumio/api-client'

const blockchain = Blockchain.ALGO

export const TatumBtcSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({
      ...args,
      blockchain,
    }),
    blockchain: {
      broadcast: BlockchainAlgorandAlgoService.algoandBroadcast,
      getBlock: BlockchainAlgorandAlgoService.algorandGetBlock,
      getCurrentBlock: BlockchainAlgorandAlgoService.algorandGetCurrentBlock,
      getBlockchainAccountBalance: BlockchainAlgorandAlgoService.algorandGetBalance,
      getTransaction: BlockchainAlgorandAlgoService.algorandGetTransaction,
      getPayTransactionByFromAndTo: BlockchainAlgorandAlgoService.algorandGetPayTransactionsByFromTo,
      sendTransaction: BlockchainAlgorandAlgoService.algorandBlockchainTransfer,
    },
  }
}
