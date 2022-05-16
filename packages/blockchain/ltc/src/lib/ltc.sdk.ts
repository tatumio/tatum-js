import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { LitecoinService } from '@tatumio/api-client'
import { ltcTransactions } from './transaction/ltc.tx'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.LTC

export const TatumLtcSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    transaction: ltcTransactions(),
    blockchain: {
      info: LitecoinService.ltcGetBlockChainInfo,
      mempool: LitecoinService.ltcGetMempool,
      broadcast: LitecoinService.ltcBroadcast,
      getBlockHash: LitecoinService.ltcGetBlockHash,
      getBlock: LitecoinService.ltcGetBlock,
      getUTXO: LitecoinService.ltcGetUtxo,
      getBlockchainAccountBalance: LitecoinService.ltcGetBalanceOfAddress,
      getTxForAccount: LitecoinService.ltcGetTxByAddress,
      getTransaction: LitecoinService.ltcGetRawTransaction,
      send: LitecoinService.ltcTransferBlockchain,
    },
  }
}
