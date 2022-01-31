import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainDogecoinService, TatumUrl } from '@tatumio/api-client'
import { dogeTransactions } from './doge.sdk.tx'

const blockchain = Blockchain.DOGE

export const TatumDogeSDK = (args: { apiKey: string; url?: TatumUrl }) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    transaction: dogeTransactions(),
    blockchain: {
      mempool: BlockchainDogecoinService.dogeGetMempool,
      info: BlockchainDogecoinService.dogeGetBlockChainInfo,
      broadcast: BlockchainDogecoinService.dogeBroadcast,
      getBlockHash: BlockchainDogecoinService.dogeGetBlockHash,
      getBlock: BlockchainDogecoinService.dogeGetBlock,
      getUTXO: BlockchainDogecoinService.dogeGetUtxo,
      getTransaction: BlockchainDogecoinService.dogeGetRawTransaction,
      sendTransaction: BlockchainDogecoinService.dogeTransferBlockchain,
    },
  }
}
