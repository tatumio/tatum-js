import {
  ApiServices,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  LtcTransactionAddress,
  LtcTransactionAddressKMS,
  LtcTransactionUTXO,
  LtcTransactionUTXOKMS,
  TransactionHash,
} from '@tatumio/api-client'

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: { testnet: boolean }) => Promise<TransactionHash>
  prepareSignedTransaction: (body: T, options: { testnet: boolean }) => Promise<string>
}

export type BtcTransactionTypes =
  | BtcTransactionFromAddress
  | BtcTransactionFromAddressKMS
  | BtcTransactionFromUTXO
  | BtcTransactionFromUTXOKMS

export type LtcTransactionTypes =
  | LtcTransactionAddress
  | LtcTransactionAddressKMS
  | LtcTransactionUTXO
  | LtcTransactionUTXOKMS

type BtcBasedTransactionTypes = BtcTransactionTypes | LtcTransactionTypes

type BtcFromAddressTypes = BtcTransactionFromAddress | BtcTransactionFromAddressKMS

type LtcFromAddressTypes = LtcTransactionAddress | LtcTransactionAddressKMS

type BtcFromUtxoTypes = BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS
type LtcFromUtxoTypes = LtcTransactionUTXO | LtcTransactionUTXOKMS

type GetTxByAddressType =
  | typeof ApiServices.blockchain.bitcoin.btcGetTxByAddress
  | typeof ApiServices.blockchain.ltc.ltcGetTxByAddress

type GetUtxoType =
  | typeof ApiServices.blockchain.bitcoin.btcGetUtxo
  | typeof ApiServices.blockchain.ltc.ltcGetUtxo

type BroadcastType =
  | typeof ApiServices.blockchain.bitcoin.btcBroadcast
  | typeof ApiServices.blockchain.ltc.ltcBroadcast
