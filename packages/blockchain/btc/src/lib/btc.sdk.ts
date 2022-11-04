import { Blockchain } from '@tatumio/shared-core'
import { BitcoinService, BlockchainFeesService } from '@tatumio/api-client'
import { btcTransactions } from './transaction/btc.tx'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { btcWallet } from './btc.sdk.wallet'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { btcVirtualAccountService } from './services/btc.sdk.virtualAccount'

const blockchain = Blockchain.BTC

export const TatumBtcSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    wallet: btcWallet(),
    transaction: btcTransactions(),
    blockchain: {
      mempool: BitcoinService.btcGetMempool,
      broadcast: BitcoinService.btcBroadcast,
      info: BitcoinService.btcGetBlockChainInfo,
      getBlockHash: BitcoinService.btcGetBlockHash,
      getBlock: BitcoinService.btcGetBlock,
      getUTXO: BitcoinService.btcGetUtxo,
      getBlockchainAccountBalance: BitcoinService.btcGetBalanceOfAddress,
      getTransaction: BitcoinService.btcGetRawTransaction,
      getTransactionsByAddress: BitcoinService.btcGetTxByAddress,
      sendTransaction: BitcoinService.btcTransferBlockchain,
      estimateFee: BlockchainFeesService.estimateFeeBlockchain,
    },
    virtualAccount: btcVirtualAccountService(),
  }
}
