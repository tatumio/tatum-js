import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainLitecoinService } from '@tatumio/api-client'
import { ltcTransactions } from './transaction/ltc.tx'
import { SDKArguments } from '@tatumio/abstract-sdk'

const blockchain = Blockchain.LTC

export const TatumLtcSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    api: BlockchainLitecoinService,
    transaction: ltcTransactions(),
    blockchain: {
      broadcast: BlockchainLitecoinService.ltcBroadcast,
      getCurrentBlock: BlockchainLitecoinService.ltcGetBlockChainInfo,
      getBlockHash: BlockchainLitecoinService.ltcGetBlockHash,
      getBlock: BlockchainLitecoinService.ltcGetBlock,
      getUTXO: BlockchainLitecoinService.ltcGetUtxo,
      getBlockchainAccountBalance: BlockchainLitecoinService.ltcGetBalanceOfAddress,
      getTxForAccount: BlockchainLitecoinService.ltcGetTxByAddress,
      getTransaction: BlockchainLitecoinService.ltcGetRawTransaction,
    },
  }
}
