import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainDogecoinService } from '@tatumio/api-client'
import { dogeTransactions } from './doge.sdk.tx'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.DOGE

export const TatumDogeSDK = (args: SDKArguments) => {
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
