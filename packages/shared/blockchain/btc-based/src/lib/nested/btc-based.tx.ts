import { TransactionHashKMS } from '@tatumio/api-client'

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: { testnet: boolean }) => Promise<TransactionHashKMS>
  prepareSignedTransaction: (body: T, options: { testnet: boolean }) => Promise<string>
}
