import { ApiServices, BlockchainFeesService, Currency } from '@tatumio/api-client'
import {
  btcBasedTransactions,
  BtcBasedTx,
  btcBasedWalletUtils,
  LtcTransactionTypes,
} from '@tatumio/shared-blockchain-btc-based'
import { Blockchain } from '@tatumio/shared-core'
// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-ltc'

export const ltcTransactions = (
  apiCalls: {
    getUTXOsByAddress: typeof ApiServices.data.getUtxosByAddress
    broadcast: typeof ApiServices.blockchain.ltc.ltcBroadcast
    getRawTransaction: typeof ApiServices.blockchain.ltc.ltcGetRawTransaction
    getUtxo: typeof ApiServices.blockchain.ltc.ltcGetUtxo
    estimateFee: typeof BlockchainFeesService.estimateFeeBlockchain
  } = {
    getUTXOsByAddress: ApiServices.data.getUtxosByAddress,
    broadcast: ApiServices.blockchain.ltc.ltcBroadcast,
    getRawTransaction: ApiServices.blockchain.ltc.ltcGetRawTransaction,
    getUtxo: ApiServices.blockchain.ltc.ltcGetUtxo,
    estimateFee: BlockchainFeesService.estimateFeeBlockchain,
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
