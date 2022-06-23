import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { DogecoinService, TatumUrl } from '@tatumio/api-client'
import { dogeTransactions } from './doge.sdk.tx'
import { dogeWallet } from './doge.sdk.wallet'

const blockchain = Blockchain.DOGE

export const TatumDogeSDK = (args: { apiKey: string; url?: TatumUrl }) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    wallet: dogeWallet(),
    transaction: dogeTransactions(),
    blockchain: {
      mempool: DogecoinService.dogeGetMempool,
      info: DogecoinService.dogeGetBlockChainInfo,
      broadcast: DogecoinService.dogeBroadcast,
      getBlockHash: DogecoinService.dogeGetBlockHash,
      getBlock: DogecoinService.dogeGetBlock,
      getUTXO: DogecoinService.dogeGetUtxo,
      getTransaction: DogecoinService.dogeGetRawTransaction,
      sendTransaction: DogecoinService.dogeTransferBlockchain,
    },
  }
}
