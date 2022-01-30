import { TransactionHashKMS } from '@tatumio/api-client'

export type BtcBasedTx<T> = {
  sendTransaction: (body: T) => Promise<TransactionHashKMS>
  prepareSignedTransaction: (body: T, args?: { testnet: boolean }) => Promise<string>
}
