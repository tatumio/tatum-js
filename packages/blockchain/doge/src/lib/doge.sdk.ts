import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { DogecoinService, TatumUrlArg } from '@tatumio/api-client'
import { dogeTransactions } from './doge.sdk.tx'
import { dogeWallet } from './doge.sdk.wallet'
import { virtualAccountService } from './doge.virtualAccount'
import { dogeKmsService } from './doge.kms'

const blockchain = Blockchain.DOGE

export const TatumDogeSDK = (args: { apiKey: string; url?: TatumUrlArg }) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    kms: dogeKmsService({ ...args, blockchain }),
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
    },
    virtualAccount: virtualAccountService({ blockchain }),
  }
}
