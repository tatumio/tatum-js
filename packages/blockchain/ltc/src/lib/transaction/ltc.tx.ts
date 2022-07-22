import { ApiServices, Currency } from '@tatumio/api-client'
import {
  btcBasedTransactions,
  BtcBasedTx,
  btcBasedWalletUtils,
  LtcTransactionTypes,
} from '@tatumio/shared-blockchain-btc-based'
import { Blockchain } from '@tatumio/shared-core'
// @ts-ignore
import { Transaction, Script, PrivateKey } from 'bitcore-lib-ltc'

export const ltcTransactions = (
  apiCalls: {
    getTxByAddress: typeof ApiServices.blockchain.ltc.ltcGetTxByAddress
    broadcast: typeof ApiServices.blockchain.ltc.ltcBroadcast
    getRawTransaction: typeof ApiServices.blockchain.ltc.ltcGetRawTransaction
    getUtxo: typeof ApiServices.blockchain.ltc.ltcGetUtxo
  } = {
    getTxByAddress: ApiServices.blockchain.ltc.ltcGetTxByAddress,
    broadcast: ApiServices.blockchain.ltc.ltcBroadcast,
    getRawTransaction: ApiServices.blockchain.ltc.ltcGetRawTransaction,
    getUtxo: ApiServices.blockchain.ltc.ltcGetUtxo,
  },
): BtcBasedTx<LtcTransactionTypes> => {
  return {
    ...btcBasedTransactions(Currency.LTC, btcBasedWalletUtils(Blockchain.LTC), apiCalls, {
      createTransaction: Transaction,
      createPrivateKey: PrivateKey,
      scriptFromAddress: Script.fromAddress,
      prepareUnspentOutput: Transaction.UnspentOutput.fromObject,
    }),
  }
}
