import { ApiServices, BlockchainFeesService, Currency } from '@tatumio/api-client'
import {
  btcBasedTransactions,
  BtcBasedTx,
  BtcTransactionTypes,
  GetUtxoBatchType,
} from '@tatumio/shared-blockchain-btc-based'
import { btcWalletUtils } from '../btc.wallet.utils'

export const btcTransactions = (
  apiCalls: {
    getUTXOsByAddress: typeof ApiServices.data.getUtxosByAddress
    getUtxo: typeof ApiServices.blockchain.bitcoin.btcGetUtxo
    getUtxoBatch?: GetUtxoBatchType
    broadcast: typeof ApiServices.blockchain.bitcoin.btcBroadcast
    estimateFee: typeof BlockchainFeesService.estimateFeeBlockchain
  } = {
    getUTXOsByAddress: ApiServices.data.getUtxosByAddress,
    getUtxo: ApiServices.blockchain.bitcoin.btcGetUtxo,
    broadcast: ApiServices.blockchain.bitcoin.btcBroadcast,
    estimateFee: BlockchainFeesService.estimateFeeBlockchain,
  },
): BtcBasedTx<BtcTransactionTypes> => {
  return {
    ...btcBasedTransactions(Currency.BTC, btcWalletUtils(), apiCalls),
  }
}
