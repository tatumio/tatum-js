import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainDogecoinService, TatumUrl } from '@tatumio/api-client'
import { dogeTransactions } from './transaction/doge.tx'

const blockchain = Blockchain.DOGE

export const TatumDogeSDK = (args: { apiKey: string; url?: TatumUrl }) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    api: BlockchainDogecoinService,
    transaction: dogeTransactions(),
    blockchain: {
      broadcast: BlockchainDogecoinService.dogeBroadcast,
      getCurrentBlock: BlockchainDogecoinService.dogeGetBlockChainInfo,
      getBlockHash: BlockchainDogecoinService.dogeGetBlockHash,
      getBlock: BlockchainDogecoinService.dogeGetBlock,
      getUTXO: BlockchainDogecoinService.dogeGetUtxo,
      getTransaction: BlockchainDogecoinService.dogeGetRawTransaction,
    },
  }
}
