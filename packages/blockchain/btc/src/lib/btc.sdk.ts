import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainBitcoinService } from '@tatumio/api-client'
import { btcTransactions } from './transaction/btc.tx'
import { SDKArguments } from '@tatumio/abstract-sdk'

const blockchain = Blockchain.BTC

export const TatumBtcSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    transaction: btcTransactions(),
    blockchain: {
      mempool: BlockchainBitcoinService.btcGetMempool,
      broadcast: BlockchainBitcoinService.btcBroadcast,
      info: BlockchainBitcoinService.btcGetBlockChainInfo,
      getBlockHash: BlockchainBitcoinService.btcGetBlockHash,
      getBlock: BlockchainBitcoinService.btcGetBlock,
      getUTXO: BlockchainBitcoinService.btcGetUtxo,
      getBlockchainAccountBalance: BlockchainBitcoinService.btcGetBalanceOfAddress,
      getTransaction: BlockchainBitcoinService.btcGetRawTransaction,
      getTransactionsByAddress: BlockchainBitcoinService.btcGetTxByAddress,
      sendTransaction: BlockchainBitcoinService.btcTransferBlockchain,
    },
  }
}
