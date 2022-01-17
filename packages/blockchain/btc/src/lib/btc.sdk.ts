import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainBitcoinService, TatumUrl } from '@tatumio/api-client'
import { btcTransactions } from './transaction/btc.tx'

const blockchain = Blockchain.BTC

export const TatumBtcSDK = (args: { apiKey: string; url?: TatumUrl }) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    api: BlockchainBitcoinService,
    transaction: btcTransactions(),
    blockchain: {
      broadcast: BlockchainBitcoinService.btcBroadcast,
      getCurrentBlock: BlockchainBitcoinService.btcGetBlockChainInfo,
      getBlockHash: BlockchainBitcoinService.btcGetBlockHash,
      getBlock: BlockchainBitcoinService.btcGetBlock,
      getUTXO: BlockchainBitcoinService.btcGetUtxo,
      getBlockchainAccountBalance: BlockchainBitcoinService.btcGetBalanceOfAddress,
      get: BlockchainBitcoinService.btcGetRawTransaction,
      getAccountTransactions: BlockchainBitcoinService.btcGetTxByAddress,
    },
  }
}
