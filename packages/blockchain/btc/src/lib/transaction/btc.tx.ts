import { ApiServices, Currency } from '@tatumio/api-client'
import { btcBasedTransactions, BtcBasedTx, BtcTransactionTypes } from '@tatumio/shared-blockchain-btc-based'
import { btcWalletUtils } from '../btc.wallet.utils'

export const btcTransactions = (
  apiCalls: {
    getTxByAddress: typeof ApiServices.blockchain.bitcoin.btcGetTxByAddress
    getUtxo: typeof ApiServices.blockchain.bitcoin.btcGetUtxo
    broadcast: typeof ApiServices.blockchain.bitcoin.btcBroadcast
    getBalanceOfAddress: typeof ApiServices.blockchain.bitcoin.btcGetBalanceOfAddress
  } = {
    getTxByAddress: ApiServices.blockchain.bitcoin.btcGetTxByAddress,
    getUtxo: ApiServices.blockchain.bitcoin.btcGetUtxo,
    broadcast: ApiServices.blockchain.bitcoin.btcBroadcast,
    getBalanceOfAddress: ApiServices.blockchain.bitcoin.btcGetBalanceOfAddress,
  },
): BtcBasedTx<BtcTransactionTypes> => {
  return {
    ...btcBasedTransactions(Currency.BTC, btcWalletUtils(), apiCalls),
  }
}
