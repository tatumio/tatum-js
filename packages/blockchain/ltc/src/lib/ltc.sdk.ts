import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainLitecoinService } from '@tatumio/api-client'
import { ltcTransactions } from './transaction/ltc.tx'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.LTC

export const TatumLtcSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    transaction: ltcTransactions(),
    blockchain: {
      info: BlockchainLitecoinService.ltcGetBlockChainInfo,
      mempool: BlockchainLitecoinService.ltcGetMempool,
      broadcast: BlockchainLitecoinService.ltcBroadcast,
      getBlockHash: BlockchainLitecoinService.ltcGetBlockHash,
      getBlock: BlockchainLitecoinService.ltcGetBlock,
      getUTXO: BlockchainLitecoinService.ltcGetUtxo,
      getBlockchainAccountBalance: BlockchainLitecoinService.ltcGetBalanceOfAddress,
      getTxForAccount: BlockchainLitecoinService.ltcGetTxByAddress,
      getTransaction: BlockchainLitecoinService.ltcGetRawTransaction,
      send: BlockchainLitecoinService.ltcTransferBlockchain,
    },
  }
}
