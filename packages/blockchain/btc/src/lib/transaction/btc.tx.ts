import { ApiServices, BlockchainFeesService, Currency, WalletApiService } from '@tatumio/api-client'
import {
  btcBasedTransactions,
  BtcBasedTx,
  BtcTransactionTypes,
  GetUtxoBatchType,
} from '@tatumio/shared-blockchain-btc-based'
import { btcWalletUtils } from '../btc.wallet.utils'

export const btcTransactions = (
  apiCalls: {
    getUTXOsByAddress: typeof WalletApiService.getUtxosByAddress
    getUtxo: typeof ApiServices.blockchain.bitcoin.btcGetUtxo
    getUtxoBatch?: GetUtxoBatchType
    broadcast: typeof ApiServices.blockchain.bitcoin.btcBroadcast
    estimateFee: typeof BlockchainFeesService.estimateFeeBlockchain
  } = {
    getUTXOsByAddress: WalletApiService.getUtxosByAddress,
    getUtxo: ApiServices.blockchain.bitcoin.btcGetUtxo,
    broadcast: ApiServices.blockchain.bitcoin.btcBroadcast,
    estimateFee: BlockchainFeesService.estimateFeeBlockchain,
  },
): BtcBasedTx<BtcTransactionTypes> => {
  return {
    ...btcBasedTransactions(Currency.BTC, btcWalletUtils(), apiCalls),
  }
}
